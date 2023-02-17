import React from 'react';
import NearLogo from '../../media/near-logo.svg';
import styled from 'styled-components';
import EmailForm from './EmailForm.js';
import Motion from '../../media/motion-compressed.mp4';

const StyledMainContent = styled.div`
    margin-top: 100px;
    margin-bottom: 100px;
    
    h1 {
        margin: 40px 0 0 0;
        background: linear-gradient(#A463B0 0%, #5F8AFA 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 76px;
        font-weight: 400;
        margin-left: -5px;
    }

    h2 {
        max-width: 300px;
        margin: 0;
        font-weight: 600;
    }

    > p {
        font-size: 18px;
        margin: 30px 0;
        max-width: 415px;
    }

    @media (max-width: 620px) {
        margin-top: 70px;
        margin-bottom: 150px;
    }

    > img {
        pointer-events: none;
        height: 30px;
    }
`;

const StyledVideo = styled.video`
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

const StyledFrostedGlass = styled.div`
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 110px 20px 110px;
    overflow: auto;

    @media (max-width: 620px) {
        padding: 20px;
    }
`;

export default function DiscoveryLanding() {
    return (
        <>
            <StyledVideo playsInline autoPlay muted loop id="bgvid">
                <source src={Motion} type="video/mp4" />
            </StyledVideo>
            <StyledFrostedGlass>
                <StyledMainContent>
                    <img src={NearLogo} alt="NEAR" />
                    <h1>Discovery</h1>
                    <h2>Becoming the Blockchain Operating System</h2>
                    <p>
                        Discovery allows you to connect, create, and contribute — all in one place. Find people, apps, components, and opportunities to build the web of tomorrow, today.
                    </p>
                    <p>
                        Sign up and join the journey.
                    </p>
                    <EmailForm />
                    <p>
                        Learn more at <a href='https://near.org/blog'>NEAR.org/blog</a>
                    </p>
                </StyledMainContent>
            </StyledFrostedGlass>
        </>
    );
};