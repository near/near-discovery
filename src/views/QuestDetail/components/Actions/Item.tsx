import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { memo, useState, useEffect } from 'react';

import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useDappOpen from '@/hooks/useDappOpen';
import { useLayoutStore } from '@/stores/layout';
import useActionCheck from '../../hooks/useActionCheck';

import {
  StyledDapp,
  StyledDappIcon,
  StyledDapps,
  StyledDesc,
  StyledExpand,
  StyledExpandButton,
  StyledExpandButtonBox,
  StyledExpandContainer,
  StyledIconBox,
  StyledItemContainer,
  StyledItemLeft,
  StyledItemRight,
  StyledItemTop,
  StyledMore,
} from './styles';
import Loading from '@/components/Icons/Loading';

const ActionItem = ({
  action,
  completed,
  userInfo,
  config,
  onSuccess,
}: {
  action: any;
  completed: boolean;
  userInfo: any;
  config: any;
  onSuccess: VoidFunction;
}) => {
  const [open, setOpen] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(completed);
  const router = useRouter();
  const { open: dappOpen } = useDappOpen();
  const setLayout = useLayoutStore((store?: any) => store.set);
  const { checking, handleRefresh } = useActionCheck(() => {
    setActionCompleted(true);
    onSuccess();
  });

  const { loading: binding, type, handleBind } = useAuthBind({ onSuccess });

  useEffect(() => {
    setActionCompleted(completed);
  }, [completed]);
  return (
    <StyledItemContainer>
      <StyledItemTop initial={false}>
        <StyledItemLeft>
          {actionCompleted ? (
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="23" height="23" fill="#1E1E1E" />
              <circle cx="11.5" cy="11.5" r="11" fill="#EBF479" stroke="#EBF479" />
              <path
                d="M8 11.5L10.6667 14L16 9"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
              <circle cx="11.5" cy="11.5" r="11" fill="#1E2028" stroke="#EBF479" />
            </svg>
          )}
          <span>{action.name}</span>
        </StyledItemLeft>
        <StyledItemRight>
          <StyledIconBox
            className={open ? 'open' : ''}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
              <path
                d="M11.7507 7.82802C12.3448 8.2238 12.3448 9.09671 11.7507 9.49249L1.55441 16.285C0.889837 16.7277 -7.10367e-07 16.2513 -6.75462e-07 15.4528L-8.1642e-08 1.86775C-4.67367e-08 1.06921 0.889838 0.592786 1.55442 1.03551L11.7507 7.82802Z"
                fill="#979ABE"
              />
            </svg>
          </StyledIconBox>
          {!actionCompleted ? (
            <StyledIconBox
              onClick={() => {
                if (!checking) handleRefresh(action.id);
              }}
              style={{
                opacity: actionCompleted ? 0.8 : 1,
                cursor: actionCompleted ? 'not-allowed' : 'pointer',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M17.9694 2.74403C17.9583 2.30211 17.6217 2.0236 17.1395 2.03375C16.6565 2.0439 16.4077 2.33856 16.3284 2.78066C16.2872 3.00993 16.3005 3.24978 16.2981 3.48498C16.294 3.88625 16.297 4.2876 16.297 4.68895C16.2343 4.71739 16.1715 4.74585 16.1088 4.77433C15.898 4.57183 15.6909 4.36551 15.476 4.16744C13.5399 2.38251 11.2428 1.71802 8.67025 2.11296C5.03807 2.67054 2.34694 5.69455 2.03115 9.46951C1.73491 13.0107 4.01941 16.4321 7.44848 17.5831C10.9174 18.7475 14.7771 17.3923 16.7281 14.3215C16.8537 14.1238 16.9842 13.9208 17.0609 13.7023C17.2097 13.2777 17.135 12.8825 16.7156 12.6556C16.3116 12.4371 15.9286 12.5249 15.6418 12.8958C15.4983 13.0812 15.3892 13.2928 15.2553 13.4862C14.0457 15.2329 12.3841 16.1846 10.2579 16.2883C7.41089 16.4271 4.80107 14.5804 3.97136 11.8585C3.11442 9.04731 4.29969 6.01831 6.83492 4.54063C9.29931 3.10418 12.4631 3.5164 14.4574 5.54183C14.6034 5.69015 14.7018 5.8854 14.9386 6.22593C14.16 6.22593 13.5606 6.19423 12.9662 6.2352C12.4172 6.27307 12.1265 6.59973 12.131 7.05832C12.1354 7.50482 12.4465 7.87427 12.9747 7.88726C14.3534 7.92118 15.7336 7.90887 17.1129 7.89418C17.5674 7.88934 17.9436 7.6292 17.9574 7.18014C18.0027 5.70242 18.0063 4.22199 17.9694 2.74403Z"
                  fill="#979ABE"
                />
              </svg>
            </StyledIconBox>
          ) : (
            <div style={{ width: '20px' }} />
          )}
        </StyledItemRight>
      </StyledItemTop>
      {/* <StyledExpandContainer>
        <StyledDesc>Choose one dapp to swapping.</StyledDesc>
       
        <StyledMore>View all Dapps</StyledMore>
      </StyledExpandContainer> */}
      <AnimatePresence initial={false}>
        {open && (
          <StyledExpandContainer
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <StyledExpand>
              <StyledDesc>{action.description}</StyledDesc>
              <StyledDapps>
                {action.operators?.map((dapp: any) => (
                  <StyledDapp
                    key={dapp.dapp_id}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ opacity: 0.6 }}
                    onClick={() => {
                      dapp.route && dappOpen({ ...dapp, route: `/${dapp.route}` }, 'quest');
                    }}
                  >
                    <StyledDappIcon src={dapp.dapp_logo} />
                    <span>{dapp.dapp_name}</span>
                  </StyledDapp>
                ))}
              </StyledDapps>
              {(action.operators?.length === 0 || !action.operators) && (
                <StyledExpandButtonBox>
                  <StyledExpandButton
                    onClick={() => {
                      setOpen(false);
                      if (!action.source) return;
                      if (action.source === 'search') {
                        document.getElementById('nav-top-search')?.focus();
                        return;
                      }
                      if (action.source === 'wallet/bridge') {
                        setLayout({
                          showAccountSider: true,
                          defaultTab: 'bridge',
                        });
                        return;
                      }
                      if (action.source.includes('landing')) {
                        router.push('/landing');
                        return;
                      }
                      if (action.category.startsWith('twitter') && !userInfo.twitter.is_bind) {
                        const state = (Date.now() + Math.random() * 10000).toFixed(0);
                        sessionStorage.setItem('_auth_state', state);
                        const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${config.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
                        window.open(path, '_blank');
                        sessionStorage.setItem('_auth_type', 'twitter');
                        return;
                      }
                      if (action.category.startsWith('discord') && !userInfo.discord.is_bind) {
                        const path = `https://discord.com/oauth2/authorize?client_id=${config.discord_client_id}&response_type=code&redirect_uri=${window.location.href}&scope=identify`;
                        window.open(path, '_blank');
                        sessionStorage.setItem('_auth_type', 'discord');
                        return;
                      }
                      if (action.category.startsWith('telegram') && !userInfo.telegram.is_bind) {
                        if (window.Telegram) {
                          window.Telegram.Login.auth(
                            { bot_id: config.telegram_bot_id, request_access: true },
                            (data: any) => {
                              if (data) {
                                handleBind('telegram', { ...data, id: data.id.toString() });
                              }
                            },
                          );
                        }
                        return;
                      }

                      if (action.source.includes('http')) {
                        window.open(action.source, '_blank');
                        return;
                      }
                      router.push('/' + action.source);
                    }}
                  >
                    {binding && <Loading />} Got it
                  </StyledExpandButton>
                </StyledExpandButtonBox>
              )}
            </StyledExpand>
          </StyledExpandContainer>
        )}
      </AnimatePresence>
    </StyledItemContainer>
  );
};

export default memo(ActionItem);
