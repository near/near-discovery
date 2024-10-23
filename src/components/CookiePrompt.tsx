import { Button, Dialog } from '@near-pagoda/ui';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import { useCookieStore } from '@/stores/cookieData';
import { cookiePreferences, optOut } from '@/utils/analytics';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Cookies = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.15);
  background-color: white;
  border-radius: 4px;
  margin: 8px auto;
  max-width: 100%;
  width: 714px;
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;

  p {
    margin-bottom: 0;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    border-radius: 0;
    width: 100%;
  }
`;

const CustomizeDialogContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;

  .info {
    display: flex;
    flex-direction: column;
    gap: 20px;

    h2 {
      font-size: 16px;
    }
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
  justify-content: center;
`;
export const CookiePrompt = () => {
  const cookieData = useCookieStore((state) => state.cookieData);
  const [cookieAcceptance, setCookieAcceptance] = useState(false);

  const [open, setOpen] = useState(false);
  if (cookieData || cookieAcceptance) return null;

  const onAccept = ({ all, onlyRequired = false }: { all?: boolean; onlyRequired?: boolean }) => {
    setCookieAcceptance(true);
    localStorage.setItem('cookiesAcknowledged', all ? cookiePreferences.all : cookiePreferences.onlyRequired);
    optOut(onlyRequired);
  };
  return (
    <Wrapper>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content title="Customize Cookies">
          <CustomizeDialogContent>
            <div className="info">
              <div>
                <h2>Necessary Cookies</h2>
                <p>
                  These cookies are required for website functionality such as storing your settings and preferences, as
                  detailed <Link href="/cookies/details">here</Link>.
                </p>
              </div>
              <div>
                <h2>Marketing & Analytics Cookies</h2>
                <p>
                  We recommend accepting these cookies, which include third-party cookies, for the improvement of user
                  experience and discoverability on the B.O.S. These cookies contribute to anonymized statistics which
                  are analyzed in aggregate.
                </p>
              </div>
              <ActionWrapper>
                <Button type="button" label="Accept All" size="small" onClick={() => onAccept({ all: true })} />
                <Button
                  type="button"
                  label="Required Only"
                  fill="outline"
                  size="small"
                  onClick={() => onAccept({ onlyRequired: true })}
                />
              </ActionWrapper>
            </div>
          </CustomizeDialogContent>
        </Dialog.Content>
      </Dialog.Root>
      <Cookies>
        <p>
          We use our own and third-party cookies on our website to enhance your experience, analyze traffic, and for
          marketing. For more information see our{' '}
          <Link href="/cookies" target="_blank">
            Cookie Policy
          </Link>
          .{' '}
        </p>
        <div className="buttons">
          <Button type="button" label="Customize" fill="outline" size="small" onClick={() => setOpen(true)} />
          <Button type="button" label="Accept" size="small" onClick={() => onAccept({ all: true })} />
        </div>
      </Cookies>
    </Wrapper>
  );
};
