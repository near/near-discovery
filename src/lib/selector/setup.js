import { FastAuthWallet } from "./wallet";

const fastAuth = async ({ logger, fastAuthWallet, ...rest }) => {
    console.log("config props: ", {
        logger,
        ...rest
    })

    console.log("FastAuth instance is received: ", fastAuthWallet)
    // return the wallet interface for wallet-selector
    return {
        networkId() {
            console.log("networkId: ", fastAuthWallet.networkId)
            return fastAuthWallet.networkId;
        },
        getContractId() {
            return fastAuthWallet.getContractId();
        },

        async getAccount() {
            console.log("getAccount is called")
            // return fastAuthWallet.getAccount();
        },

        showModal() {
            // fastAuthWallet.showModal(modalType);
        },

        async getAccounts() {
            logger.log("Keypom:account");
            return fastAuthWallet.getAccounts();
        },

        async switchAccount(id) {
            return await fastAuthWallet.switchAccount(id);
        },

        getAccountId() {
            logger.log("Keypom:getAccountId");
            return fastAuthWallet.getAccountId();
        },

        async isSignedIn() {
            console.log("isSignedIn is called")
            return await fastAuthWallet.isSignedIn();
        },

        async getAvailableBalance() {
            logger.log("Keypom:isSignedIn");
            return await fastAuthWallet.getAvailableBalance();
        },

        async verifyOwner() {
            throw Error("fastAuthWallet:verifyOwner is deprecated");
        },

        async signIn() {
            console.log("signIn is called")
            logger.log("Keypom:signIn");
            return await fastAuthWallet.signIn();
        },

        async signOut() {
            logger.log("Keypom:signOut");
            return await fastAuthWallet.signOut();
        },

        async signAndSendTransaction(params) {
            return await fastAuthWallet.signAndSendTransaction(params);
        },

        async signAndSendTransactions(params) {
            logger.log("Keypom:signAndSendTransactions", params);
            return await fastAuthWallet.signAndSendTransactions(params);
        },
    };
};

export function setupFastAuth({
    deprecated = false,
    networkId,
    signInContractId,
}) {
    return async () => {
        console.log('inner function is called')
        if (!signInContractId || !networkId) {
            console.warn(`fastAuthWallet: signInContractId, networkId, are required to use the fastAuthWallet.`)
            return null;
        }

        console.log("prefastAuthWallet", fastAuthWallet)

        const fastAuthWallet = new FastAuthWallet({
            signInContractId,
            networkId,
        });

        console.log("fastAuthWallet", fastAuthWallet)

        // CHECK URL / LOCAL STORAGE TO SEE IF A TRIAL ACCOUNT SHOULD BE SIGNED IN
        const shouldSignIn = !!window.localStorage.getItem('fast-auth:account-creation-pending');
        console.log('shouldSignIn: ', shouldSignIn)

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

            //         async(config) => {
            //     console.log("init is called", config)
            //     return fastAuth({ ...config, fastAuthWallet })
            //     // console.log("init is finished", config)
            // },
        };
    };
}
