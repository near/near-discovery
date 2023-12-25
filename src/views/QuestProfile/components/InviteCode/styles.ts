import styled from 'styled-components';
export { StyledButton } from '../../styles';

export const StyledContainer = styled.div`
  position: relative;
  width: 182px;
  height: 52px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const StyledValue = styled.div`
  color: #1e2028;
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  right: 30px;
  top: 15px;
  z-index: 10;
  gap: 5px;
  display: flex;
  align-items: center;
  .num {
    font-weight: 700;
  }
`;

export const StyledPanel = styled.div`
  border-radius: 20px;
  border: 1px solid #21232a;
  background: rgba(22, 24, 29, 0.5);
  backdrop-filter: blur(3px);
  padding: 20px;
  width: 50%;
  height: 200px;
  box-sizing: border-box;
`;

export const StyledPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  .num {
    color: #ebf479;
    font-size: 32px;
    font-weight: 700;
  }
`;

export const StyledPanelContent = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 30px;
`;
export const StyledPanelFriends = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

export const StyledPanelFriendsTitle = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const JoinedAccounts = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  .more {
    margin-right: -10px;
  }
`;

export const JoinedAccount = styled.img`
  border-radius: 36px;
  border: 2px solid #2c2e3e;
  width: 30px;
  height: 30px;
  margin-right: -10px;
`;
