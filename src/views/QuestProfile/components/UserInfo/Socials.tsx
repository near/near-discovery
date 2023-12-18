import { memo } from 'react';
import Loading from '@/components/Icons/Loading';
import useAuthConfig from '../../hooks/useAuthConfig';
import useAuthBind from '../../hooks/useAuthBind';
import { StyledSocialsWrapper, StyledSocialItem } from './styles';

const AUTHS = {
  twitter: {
    key: 'twitter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
        <path
          d="M10.1173 7.62177L16.4459 0H14.9463L9.45111 6.61788L5.06215 0H0L6.63697 10.0074L0 18H1.49977L7.30279 11.0113L11.9379 18H17L10.1169 7.62177H10.1173ZM8.06317 10.0956L7.39071 9.09906L2.04016 1.16971H4.34371L8.66167 7.56895L9.33413 8.56546L14.947 16.8835H12.6434L8.06317 10.096V10.0956Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  telegram: {
    key: 'telegram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="17" viewBox="0 0 23 17" fill="none">
        <path
          d="M8.6526 15.9715L9.00991 11.2168L18.8104 3.43849C19.2443 3.09004 18.7211 2.92143 18.1468 3.22492L6.04935 9.95791L0.817309 8.49666C-0.305664 8.21565 -0.318425 7.52999 1.07253 7.03541L21.4519 0.111336C22.3835 -0.259597 23.2768 0.313663 22.9195 1.57259L19.4485 15.9715C19.206 16.9944 18.5041 17.2417 17.5343 16.7696L12.2512 13.33L9.71177 15.4994C9.41827 15.758 9.17581 15.9715 8.6526 15.9715Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  discord: {
    key: 'discord',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" viewBox="0 0 25 17" fill="none">
        <path
          d="M12.5 0.834722C7.52333 0.834722 4.03224 2.87713 4.03224 2.87713C5.94491 1.2432 9.28745 0.301922 9.28745 0.301922L8.97176 0C5.83349 0.0532801 2.99234 2.13121 2.99234 2.13121C-0.20164 8.50706 0.00262689 14.0127 0.00262689 14.0127C2.60238 17.2272 6.46486 16.9964 6.46486 16.9964L7.78331 15.398C5.4621 14.9184 3.9951 12.9471 3.9951 12.9471C3.9951 12.9471 7.48619 15.2204 12.5 15.2204C17.5138 15.2204 21.0049 12.9471 21.0049 12.9471C21.0049 12.9471 19.5379 14.9184 17.2167 15.398L18.5351 16.9964C18.5351 16.9964 22.3976 17.2272 24.9974 14.0127C24.9974 14.0127 25.2016 8.50706 22.0077 2.13121C22.0077 2.13121 19.1665 0.0532801 16.0282 0L15.7125 0.301922C15.7125 0.301922 19.0551 1.2432 20.9678 2.87713C20.9678 2.87713 17.4767 0.834722 12.5 0.834722ZM8.65608 7.56578C9.86311 7.56578 10.8473 8.5781 10.8287 9.8213C10.8287 11.0467 9.86311 12.0768 8.65608 12.0768C7.46762 12.0768 6.502 11.0467 6.502 9.8213C6.502 8.5781 7.44905 7.56578 8.65608 7.56578ZM16.3996 7.56578C17.6067 7.56578 18.5723 8.5781 18.5723 9.8213C18.5723 11.0467 17.6067 12.0768 16.3996 12.0768C15.2112 12.0768 14.2455 11.0467 14.2455 9.8213C14.2455 8.5781 15.1926 7.56578 16.3996 7.56578Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

const Socials = ({ info, onSuccess }: any) => {
  const config = useAuthConfig();
  const { loading, type, handleBind } = useAuthBind({ onSuccess });
  return (
    <StyledSocialsWrapper>
      {Object.values(AUTHS).map((item) => (
        <StyledSocialItem
          key={item.key}
          whileHover={{ opacity: 0.8 }}
          whileTap={{ opacity: 0.6 }}
          onClick={() => {
            let path = '';
            if (item.key === 'twitter') {
              path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${config.twitter_client_id}&redirect_uri=${config.twitter_redirect_url}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
              window.open(path, '_self');
              sessionStorage.setItem('_auth_type', 'twitter');
              return;
            }
            if (item.key === 'discord') {
              path = `https://discord.com/oauth2/authorize?client_id=${config.discord_client_id}&response_type=code&redirect_uri=${config.discord_redirect_url}&scope=identify`;
              window.open(path, '_self');
              sessionStorage.setItem('_auth_type', 'discord');
              return;
            }
            if (item.key === 'telegram') {
              if (window.Telegram) {
                window.Telegram.Login.auth({ bot_id: config.telegram_bot_id, request_access: true }, (data: any) => {
                  if (data) {
                    handleBind('telegram', { ...data, id: data.id.toString(), auth_date: data.auth_date.toString() });
                  }
                });
              }
            }
          }}
        >
          <span style={{ color: info[item.key]?.is_bind ? '#979ABE' : '#373A53' }}>{item.icon}</span>
          {info[item.key]?.is_bind ? (
            <div>{info.twitter?.twitter_username}</div>
          ) : loading && type === item.key ? (
            <Loading />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#373A53" />
              <path
                d="M8 11.5C7.72386 11.5 7.5 11.7239 7.5 12C7.5 12.2761 7.72386 12.5 8 12.5L8 11.5ZM17.3536 12.3536C17.5488 12.1583 17.5488 11.8417 17.3536 11.6464L14.1716 8.46447C13.9763 8.2692 13.6597 8.2692 13.4645 8.46447C13.2692 8.65973 13.2692 8.97631 13.4645 9.17157L16.2929 12L13.4645 14.8284C13.2692 15.0237 13.2692 15.3403 13.4645 15.5355C13.6597 15.7308 13.9763 15.7308 14.1716 15.5355L17.3536 12.3536ZM8 12.5L17 12.5L17 11.5L8 11.5L8 12.5Z"
                fill="#1C1D29"
              />
            </svg>
          )}
        </StyledSocialItem>
      ))}
    </StyledSocialsWrapper>
  );
};

export default memo(Socials);
