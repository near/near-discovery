import styled from 'styled-components';
import DiscoveryLanding from './components/discovery/DiscoveryLanding';

const StyledApp = styled.div`
    @media (max-width: 620px) {
        h1 {
            font-size: 50px;
            margin-left: -3px;
        }

        h2 {
            font-size: 22px;
        }
    }
`;

function App() {
    return (
        <StyledApp>
            <DiscoveryLanding/>
        </StyledApp>
    );
}

export default App;
