import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  title: string;
  children?: ReactNode;
  onClose: () => void;
}

const Wrapper = styled.div`
  .mask {
    background: rgba(22, 24, 29, 1);
    opacity: 0.8;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  .base-modal {
    width: 450px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 32px;
    background: linear-gradient(0deg, #262836, #262836), linear-gradient(0deg, #373a53, #373a53);
    padding: 20px 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    .base-modal-close {
      cursor: pointer;
      svg {
        width: 14px;
        height: 14px;
      }
    }
    .base-modal-head {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-modal-title {
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
`;

const CloseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
      fill="#979ABE"
    />
  </svg>
);

const BaseModal: FC<IProps> = ({ title, children, onClose }) => {
  return (
    <Wrapper>
      <div className="mask"></div>
      <section className="base-modal">
        <div className="base-modal-head">
          <span className="base-modal-title">{title}</span>
          <b className="base-modal-close" onClick={() => onClose()}>
            {CloseIcon}
          </b>
        </div>
        <div className="base-modal-body">{children}</div>
      </section>
    </Wrapper>
  );
};

export default BaseModal;
