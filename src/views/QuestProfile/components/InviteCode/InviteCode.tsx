import { memo } from 'react';

import { StyledBg, StyledContainer, StyledValue } from './styles';

const InviteCode = ({ onClick }: { onClick: VoidFunction }) => {
  return (
    <StyledContainer onClick={onClick} data-bp="4001-001">
      <StyledBg>
        <svg xmlns="http://www.w3.org/2000/svg" width="157" height="44" viewBox="0 0 182 52" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M55 0C55 2.76142 52.7614 5 50 5C47.2386 5 45 2.76142 45 0H12C5.37258 0 0 5.37258 0 12V40C0 46.6274 5.37258 52 12 52H45C45 49.2386 47.2386 47 50 47C52.7614 47 55 49.2386 55 52H170C176.627 52 182 46.6274 182 40V12C182 5.37258 176.627 0 170 0H55Z"
            fill="url(#paint0_linear_1_2)"
          />
          <line x1="50.5" y1="6.5" x2="50.5" y2="46.5" stroke="black" stroke-linecap="round" strokeDasharray="1 3" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35 26.1268C35 25.7817 34.9018 25.4437 34.7168 25.1523C34.5888 24.9507 34.4223 24.7762 34.2269 24.639C34.0315 24.5017 33.8109 24.4043 33.5778 24.3523C33.3447 24.3003 33.1037 24.2947 32.8685 24.3359C32.6332 24.3771 32.4084 24.4642 32.2068 24.5923L24.9809 29.1818L17.7955 24.6005C17.5206 24.4253 17.2037 24.3272 16.878 24.3165C16.5523 24.3057 16.2296 24.3828 15.9439 24.5395C15.6581 24.6962 15.4197 24.9269 15.2537 25.2073C15.0876 25.4878 15 25.8077 15 26.1336V32.3636C15 33.087 15.2873 33.7806 15.7988 34.2921C16.3103 34.8036 17.004 35.0909 17.7273 35.0909H32.2727C32.996 35.0909 33.6897 34.8036 34.2012 34.2921C34.7127 33.7806 35 33.087 35 32.3636V26.1268ZM31.4739 16.7988C30.9625 16.2873 30.2688 16 29.5455 16H20.4545C19.7312 16 19.0375 16.2873 18.5261 16.7988C18.0146 17.3103 17.7273 18.004 17.7273 18.7273V23.2727L25.015 27.8182L32.2727 23.2727V18.7273C32.2727 18.004 31.9854 17.3103 31.4739 16.7988ZM25 24.1821C25.2117 24.1821 25.4147 24.0985 25.565 23.9494V23.9499L27.6359 21.8908L27.6691 21.8567C28.0037 21.5073 28.1877 21.0405 28.1814 20.5567C28.1752 20.073 27.9793 19.6111 27.6359 19.2703C27.2854 18.9227 26.8117 18.7277 26.318 18.7277C25.8243 18.7277 25.3506 18.9227 25 19.2703C24.6494 18.9227 24.1757 18.7277 23.6821 18.7277C23.1884 18.7277 22.7147 18.9227 22.3641 19.2703C22.0199 19.6118 21.8238 20.075 21.8184 20.5598C21.813 21.0447 21.9985 21.5122 22.335 21.8612L22.3641 21.8903L24.435 23.9494C24.5853 24.0985 24.7884 24.1821 25 24.1821Z"
            fill="#1E2028"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_2"
              x1="2.41541e-07"
              y1="51.7524"
              x2="86.7278"
              y2="-25.1427"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#62FFF6" />
              <stop offset="0.520833" stop-color="#B479FF" />
              <stop offset="1" stop-color="#FFC289" />
            </linearGradient>
          </defs>
        </svg>
      </StyledBg>
      <StyledValue>
        <span>Invite Link</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <g clip-path="url(#clip0_7159_15410)">
          <path d="M8.55974 5.70451C8.62499 6.18751 8.62499 6.78151 8.62499 7.42876V8.54626C8.62499 8.69476 8.62499 8.76826 8.67299 8.81326C8.72099 8.85751 8.79299 8.85226 8.93699 8.84175C9.05583 8.83334 9.17438 8.82133 9.29249 8.80576C9.77249 8.74126 10.1707 8.61151 10.5067 8.33551C10.627 8.23703 10.7372 8.12701 10.836 8.00701C11.127 7.65226 11.2545 7.22776 11.316 6.71251C11.3752 6.21001 11.3752 5.57551 11.3752 4.77451V4.72576C11.3752 3.92476 11.3752 3.28951 11.3152 2.78776C11.2552 2.27176 11.127 1.84801 10.8352 1.49326C10.7377 1.37326 10.6267 1.26301 10.5067 1.16401C10.152 0.873006 9.72749 0.745506 9.21224 0.684006C8.70974 0.624756 8.07524 0.624756 7.27499 0.624756H7.22624C6.42524 0.624756 5.79074 0.624756 5.28824 0.684756C4.77299 0.744756 4.34849 0.873006 3.99374 1.16476C3.87374 1.26226 3.76349 1.37326 3.66524 1.49326C3.38924 1.82926 3.26024 2.22826 3.19499 2.70826C3.17999 2.81926 3.16799 2.93776 3.15899 3.06301C3.14849 3.20701 3.14324 3.27901 3.18749 3.32701C3.23249 3.37501 3.30599 3.37501 3.45449 3.37501H4.57199C5.21924 3.37501 5.81249 3.37501 6.29699 3.44026C6.82949 3.51151 7.39349 3.68026 7.85699 4.14376C8.32049 4.60726 8.48924 5.17126 8.56049 5.70376L8.55974 5.70451Z" fill="#1E2028"/>
          <path d="M3.97275 4.125H4.52775C5.211 4.125 5.76225 4.125 6.19575 4.1835C6.64575 4.2435 7.0245 4.37325 7.326 4.674C7.62675 4.9755 7.7565 5.35425 7.8165 5.80425C7.875 6.23775 7.875 6.789 7.875 7.47225V8.02725C7.875 8.71125 7.875 9.2625 7.8165 9.696C7.7565 10.146 7.62675 10.5248 7.326 10.8255C7.0245 11.127 6.64575 11.256 6.19575 11.3167C5.76225 11.3752 5.211 11.3752 4.52775 11.3752H3.97275C3.28875 11.3752 2.7375 11.3752 2.304 11.3167C1.854 11.2567 1.47525 11.127 1.1745 10.8255C0.873 10.5255 0.744 10.146 0.68325 9.696C0.62475 9.2625 0.62475 8.71125 0.62475 8.02725V7.47225C0.62475 6.789 0.62475 6.23775 0.68325 5.80425C0.74325 5.35425 0.873 4.9755 1.1745 4.674C1.4745 4.37325 1.854 4.2435 2.304 4.1835C2.7375 4.125 3.28875 4.125 3.97275 4.125Z" fill="#1E2028"/>
          </g>
          <defs>
          <clipPath id="clip0_7159_15410">
          <rect width="12" height="12" fill="white" transform="matrix(-1 0 0 1 12 0)"/>
          </clipPath>
          </defs>
        </svg>
      </StyledValue>
    </StyledContainer>
  );
};

export default memo(InviteCode);
