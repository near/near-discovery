import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

import React from 'react';
import { firebaseAuth } from '../utils/firebase';
import { useHistory } from 'react-router-dom';

const AuthCallbackHandler = () => {
    const history = useHistory();
    const [statusMessage, setStatusMessage] = React.useState('Loading...');

    React.useEffect(() => {
        const locationUrl = window.location.href;

        if (isSignInWithEmailLink(firebaseAuth, locationUrl)) {

            const url = new URL(locationUrl);
            const searchParams = new URLSearchParams(url.search);
            const accountId = searchParams.get("accountId");
            const publicKey = searchParams.get("publicKey");

            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                history.push('/signup')
            }

            setStatusMessage('Verifying email...');
            signInWithEmailLink(firebaseAuth, email, window.location.href)
                .then(async (result) => {
                    window.localStorage.removeItem('emailForSignIn');

                    const user = result.user;
                    if (!!user.emailVerified) {
                        setStatusMessage('Creating account...');

                        // TODO: Call MPC Service with accountId, publicKey,  and oauthToken to create account
                        const data = {
                            near_account_id: accountId,
                            public_key: publicKey,
                            oidc_token: user.accessToken
                        };

                        const headers = new Headers();
                        headers.append("Content-Type", "application/json");

                        const options = {
                            method: 'POST',
                            mode: "cors",
                            body: JSON.stringify(data),
                            headers
                        };

                        await fetch('https://mpc-recovery-7tk2cmmtcq-ue.a.run.app/new_account', options)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                setStatusMessage('Account created successfully!');
                                const accountCreationData = JSON.parse(window.localStorage.getItem('fast-auth:account-creation-data') || JSON.stringify({}));

                                // TODO: Check if account ID matches the one from email
                                if (!accountCreationData.privateKey || !accountCreationData.accountId) throw ('Could not find account creation data');

                                window.localStorage.setItem('fast-auth:account-creation-data', JSON.stringify({
                                    ...accountCreationData,
                                    isCreated: true
                                }));

                                setStatusMessage('Redirecting to app...');

                                window.location.href = '/';
                            }).catch(error => {
                                console.log('Error:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert('Error: ' + error.message);
                });
        }
    }, [])

    return (
        <div>{statusMessage}</div>
    )
}

export default AuthCallbackHandler