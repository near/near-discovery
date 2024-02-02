import { memo } from 'react';
import SelectDapps from './SelectDapps';
import {
  StyledContent,
  StyledPanel,
  StyledItem,
  StyledLabel,
  StyledValue,
  StyledInputWrapper,
  StyledInput,
  StyledButton,
} from './styles';

const BridgePanel = ({ chainId, onLoad }: any) => {
  return (
    <StyledContent>
      <StyledPanel>
        <StyledItem>
          <StyledLabel>dApp</StyledLabel>
          <SelectDapps
            currentDapp={{}}
            dapps={[]}
            onSelect={(dapp: any) => {
              // setCurrentDapp(dapp);
            }}
          />
        </StyledItem>
        <StyledItem>
          <StyledLabel>Bridge from</StyledLabel>
          <StyledValue>Ethereum</StyledValue>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Bridge to</StyledLabel>
          <StyledValue>Linea</StyledValue>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Suggest amount</StyledLabel>
          <StyledInputWrapper>
            <StyledInput />
            <StyledValue>ETH</StyledValue>
          </StyledInputWrapper>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Your balance</StyledLabel>
          <StyledValue>
            <span className="balance">1.3556</span> ETH
          </StyledValue>
        </StyledItem>
      </StyledPanel>
      <StyledItem>
        <StyledValue>
          <span className="label">Est. Output:</span> ~
        </StyledValue>
        <StyledValue>
          <span className="label">Gas Fees:</span> ${0}
        </StyledValue>
      </StyledItem>
      <StyledButton>Bridge</StyledButton>
    </StyledContent>
  );
};

export default memo(BridgePanel);
