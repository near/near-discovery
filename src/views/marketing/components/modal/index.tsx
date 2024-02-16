import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import * as Styles from './styles';

interface IProps {
  open: boolean;
  type: 'success' | 'fail';
  onClose: () => void;
  reward?: number;
}

const Modal: FC<IProps> = ({ open, type, onClose, reward }) => {
  const [state, setState] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {}, []);
  if (!open) return null;
  const goProfile = () => {
    router.push('/profile?active=pts');
  };
  const goHome = () => {
    router.push('/');
  };

  const mask = <Styles.Mask onClick={onClose}></Styles.Mask>;
  const close = <Styles.Close onClick={onClose} src="/images/marketing/close.svg"></Styles.Close>;
  const params = {
    initial: { bottom: -352 },
    animate: { bottom: 0 },
  };

  return type === 'success' ? (
    <>
      {mask}
      <Styles.Wrap {...params}>
        {close}
        <Styles.WinIcon src="/images/marketing/congrats.gif"></Styles.WinIcon>

        <Styles.Title>Congrats!</Styles.Title>
        <Styles.SucTxt>
          You’ve got {reward}
          <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin>
          PTS
        </Styles.SucTxt>
        <Styles.SucFoot onClick={goProfile}>Go to DapDap Profile to check your PTS</Styles.SucFoot>
      </Styles.Wrap>
    </>
  ) : (
    <>
      {mask}
      <Styles.Wrap {...params}>
        {close}
        <Styles.FailIcon src="/images/marketing/sorry.svg"></Styles.FailIcon>
        <Styles.Title>Oops</Styles.Title>
        <Styles.FailTxt>
          You are not a new user and do not <br /> meet the conditions for participation
        </Styles.FailTxt>

        <Styles.FailFoot onClick={goHome}>
          More activities are waiting for you… <br />
          Go to DapDap,
        </Styles.FailFoot>
      </Styles.Wrap>
    </>
  );
};

export default Modal;
