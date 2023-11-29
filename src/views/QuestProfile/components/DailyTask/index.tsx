import {
  StyledContainer,
  StyledTitle,
  StyledDays,
  StyledDay,
  StyledDayHeader,
  StyledDayIcon,
  StyledDayValue,
  StyledFists,
  StyledButton,
  StyledCoin,
} from './styles';

import { memo } from 'react';

const DAYS = [1, 2, 3, 4, 5, 6, 7];

const DailyTask = () => {
  return (
    <StyledContainer>
      <div>
        <StyledTitle>Come back every day for more PTS.</StyledTitle>
        <StyledDays>
          {DAYS.map((day) => (
            <StyledDay key={day} $disabled={day > 3}>
              <StyledDayHeader>Day{day}</StyledDayHeader>
              <StyledDayIcon>
                {day === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.8537 1.35367C16.2442 1.74419 16.2442 2.37736 15.8537 2.76788L6.70722 11.9143C6.3167 12.3049 5.68353 12.3049 5.29301 11.9143L0.64656 7.26788C0.256036 6.87736 0.256036 6.24419 0.64656 5.85367L1.35367 5.14656C1.74419 4.75604 2.37735 4.75603 2.76788 5.14656L5.29301 7.67169C5.68353 8.06221 6.3167 8.06221 6.70722 7.67169L13.7323 0.64656C14.1229 0.256036 14.756 0.256036 15.1466 0.64656L15.8537 1.35367Z"
                      fill="#EBF479"
                    />
                  </svg>
                )}
                {day !== 1 && <StyledCoin $size={19} />}
              </StyledDayIcon>
              <StyledDayValue>+1 PTS</StyledDayValue>
            </StyledDay>
          ))}
        </StyledDays>
      </div>
      <div>
        <StyledFists />
        <StyledButton>Dap me up!</StyledButton>
      </div>
    </StyledContainer>
  );
};

export default memo(DailyTask);
