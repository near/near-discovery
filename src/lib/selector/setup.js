import { FastAuthWallet } from "./wallet";

function invokeEscKey() {
    window.dispatchEvent(
        new KeyboardEvent("keydown", {
          altKey: false,
          code: "Escape",
          ctrlKey: false,
          isComposing: false,
          key: "Escape",
          location: 0,
          metaKey: false,
          repeat: false,
          shiftKey: false,
          which: 27,
          charCode: 0,
          keyCode: 27,
        })
      );
}


const fastAuth = async ({ logger, fastAuthWallet, ...rest }) => {
    return {
        networkId() {
            return fastAuthWallet.networkId;
        },
        getContractId() {
            return fastAuthWallet.getContractId();
        },

        async getAccount() {
            logger.log("getAccount is called")
            return fastAuthWallet.getAccount();
        },

        async getAccounts() {
            logger.log("FastAuth:account");
            return fastAuthWallet.getAccounts();
        },

        async switchAccount(id) {
            return await fastAuthWallet.switchAccount(id);
        },

        getAccountId() {
            logger.log("FastAuth:getAccountId");
            return fastAuthWallet.getAccountId();
        },

        async isSignedIn() {
            logger.log("isSignedIn is called")
            return await fastAuthWallet.isSignedIn();
        },

        async getAvailableBalance() {
            logger.log("FastAuth:isSignedIn");
            return await fastAuthWallet.getAvailableBalance();
        },

        async verifyOwner() {
            throw Error("fastAuthWallet:verifyOwner is deprecated");
        },

        async signIn() {
            invokeEscKey()
            logger.log("FastAuth:signIn");
            return await fastAuthWallet.signIn();
        },

        async signOut() {
            logger.log("FastAuth:signOut");
            return await fastAuthWallet.signOut();
        },

        async signAndSendTransaction(params) {
            return await fastAuthWallet.signAndSendTransaction(params);
        },

        async signAndSendTransactions(params) {
            logger.log("FastAuth:signAndSendTransactions", params);
            return await fastAuthWallet.signAndSendTransactions(params);
        },
    };
};

export function setupFastAuth({
    deprecated = false,
    networkId,
    signInContractId,
    hideModal
}) {
    return async () => {
        if (!signInContractId || !networkId) {
            console.warn(`fastAuthWallet: signInContractId, networkId, are required to use the fastAuthWallet.`)
            return null;
        }

        const fastAuthWallet = new FastAuthWallet({
            signInContractId,
            networkId,
        });

        const accountCreationData = JSON.parse(window.localStorage.getItem('fast-auth:account-creation-data') || JSON.stringify({}));
        const shouldSignIn = !!accountCreationData.isCreated;

        return {
            id: "fast-auth",
            type: "instant-link",
            metadata: {
                name: "Fast Auth",
                description: null,
                iconUrl: "",
                deprecated,
                available: true,
                contractId: signInContractId,
                runOnStartup: shouldSignIn,
            },
            init: (options) => {
                return fastAuth({
                    ...options,
                    fastAuthWallet
                });
            }
        };
    };
}
