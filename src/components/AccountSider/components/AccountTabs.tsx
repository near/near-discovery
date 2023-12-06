import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 7px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 60px;
  border-bottom: 1px solid #343838;
  margin: 0px 16px;
`;
const StyledTab = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? '#fff' : '#979ABE')};
  cursor: pointer;
`;

const TABS = ['Tokens', 'Activties'];

export default function AccountTabs({ active, onTabClick }: { active: string; onTabClick: (tab: string) => void }) {
  return (
    <StyledContainer>
      {TABS.map((tab) => (
        <StyledTab
          key={tab}
          active={tab === active}
          onClick={() => {
            onTabClick(tab);
          }}
        >
          {tab}
        </StyledTab>
      ))}
    </StyledContainer>
  );
}
