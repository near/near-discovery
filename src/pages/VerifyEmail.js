import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

import React from 'react';
import { firebaseAuth } from '../utils/firebase';
import { handleCompleteSignIn } from '../utils/biometricsAuthUtils';
import { useHistory } from 'react-router-dom';

const VerifyEmail = ({ handleCreateAccount }) => {
    const history = useHistory();
    React.useEffect(() => {
        const locationUrl = window.location.href;
        if (isSignInWithEmailLink(firebaseAuth, locationUrl)) {

            const url = new URL(locationUrl);
            const searchParams = new URLSearchParams(url.search);
            const accountId = searchParams.get("accountId");
            const publicKey = searchParams.get("publicKey");



            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            signInWithEmailLink(firebaseAuth, email, window.location.href)
                .then(async (result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    const user = result.user;
                    if (!!user.emailVerified) {
                        const oauthToken = user.accessToken;

                        // TODO: Call MPC Service with accountId, publicKey,  and oauthToken to create account

                        const data = {
                            account_id: accountId,
                            public_key: publicKey,
                            id_token: oauthToken
                        };

                        const options = {
                            method: 'POST',
                            mode: "cors",
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };

                        await fetch('https://mpc-recovery-7tk2cmmtcq-ue.a.run.app/new_account', options)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('Response:', data);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });


                        // await handleCreateAccount(accountId, publicKey);
                        await handleCompleteSignIn(accountId, publicKey);
                    }
                })
                .catch((error) => {
                    console.log(error)
                    history.push('/signup')
                });
        }
    }, [])

    return (
        <div>loading...</div>
    )
}

export default VerifyEmail