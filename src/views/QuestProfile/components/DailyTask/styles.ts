import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';
export { LoadingWrapper } from '../../styles';

export const StyledContainer = styled.div`
  width: 741px;
  height: 182px;
  border-radius: 20px;
  background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(179.88% 130.08% at 100% 9.02%, #fc5aaf 0%, #473586 49.16%, #220351 100%);
  box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  margin: 30px auto 0px;
  padding: 0px 24px 24px;
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  padding-top: 30px;
`;

export const StyledDays = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 24px;
`;

export const StyledDay = styled.div<{ $disabled: boolean }>`
  width: 63px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);

  ${({ $disabled }) => $disabled && `opacity: 0.6`}
`;

export const StyledDayHeader = styled.div`
  height: 26px;
  border-radius: 12px 12px 0px 0px;
  background-color: #ebf479;
  text-align: center;
  color: #1e2028;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 26px;
`;

export const StyledDayIcon = styled.div`
  margin: 7px auto 0px;
  width: 19px;
  height: 18px;
  line-height: 18px;
`;

export const StyledDayValue = styled.div`
  color: #ebf479;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;

export const StyledFists = styled.div`
  width: 164px;
  height: 86px;
  background-image: url(/images/quest/fists.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const StyledButton = styled.button`
  width: 159px;
  height: 51px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #1e2028;
  font-size: 18px;
  font-weight: 700;
  border: none;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
