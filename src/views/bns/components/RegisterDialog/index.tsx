import bnsAvatar from '@/assets/images/bns_avatar.svg';
import iconCain from '@/assets/images/icon_coin.svg';
import useAccount from '@/hooks/useAccount';
import { balanceFormated } from '@/utils/balance';
import * as http from '@/utils/http';
import namehash from "@ensdomains/eth-ens-namehash";
import { ethers } from 'ethers';
import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import useBnsContract from '../../hooks/useBnsContract';
import type { RegisterStatusType } from '../../types';
import { encodeFunctionData } from 'viem';
import {
  StyledButton,
  StyledDialog,
  StyledDialogBody,
  StyledDialogContainer,
  StyledDialogHead,
  StyledFlex,
  StyledInputNumber,
  StyledInputNumberButton,
  StyledLoadingButton,
  StyledSvg,
  StyledText,
  StyledUserName,
  StyledUserNameButton,
  StyledUserNameButtonWrapper
} from './styles';
import { useRouter } from 'next/router';
const iconClose = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
  </svg>
)
const iconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
    <path d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464465C9.97631 0.269203 9.65973 0.269203 9.46447 0.464465C9.2692 0.659728 9.2692 0.97631 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5L13 4.5L13 3.5L1 3.5L1 4.5Z" fill="white" />
  </svg>
)
const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path opacity="0.5" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)
const RegisterDialog = ({ priceLabel, onClose }: any) => {

  const router = useRouter()
  const { account } = useAccount()
  const contract = useBnsContract()

  const [registerStatus, setRegisterStatus] = useState<RegisterStatusType>(0)

  const discount = false
  const [year, setYear] = useState(1)
  const totalPrice = useMemo(() => year * priceLabel.price, [priceLabel.price, year])
  const discountPrice = useMemo(() => 0.4 * year * priceLabel.price, [priceLabel.price, year])

  const handlePlus = function () {
    setYear(prev => prev += 1)
  }
  const handleMinus = function () {
    year > 1 && setYear(prev => prev -= 1)
  }

  const handleRegister = async function () {
    const response = await http.post('https://api.basename.app/v1/registration/register-request-with-signature', {
      toAddress: account,
      label: priceLabel.label,
      years: year,
      isPrimaryName: false,
      promoCode: '25DISCOUNT'
    })
    const signedRegisterRequest = response.signedRegisterRequest
    const iface = new ethers.utils.Interface([
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "node",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "a",
            "type": "address"
          }
        ],
        "name": "setAddr",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "node",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "key",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "value",
            "type": "string"
          }
        ],
        "name": "setText",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]);
    const address = account
    const hashedName = namehash.hash(`${priceLabel.label}.base`);
    const encodedDataAddress = iface.encodeFunctionData('setAddr', [hashedName, address])

    const avatar = `files.basename.app/avatars/${hashedName}.svg`;
    const encodedDataAvatar = iface.encodeFunctionData('setText', [hashedName, "avatar", avatar]);
    const callData = [encodedDataAddress, encodedDataAvatar];
    try {
      setRegisterStatus(1)
      await contract.write({
        address: '0x4079d84889e0E1AC22beec60dc8e5E7b621bf55D',
        functionName: 'registerWithSignature',
        args: [
          signedRegisterRequest,
          callData,
          {
            value: signedRegisterRequest[7]
          }
        ]
      })
      setRegisterStatus(2)
    } catch (error) {
      setRegisterStatus(2)
      console.log('error', error)
    }
  }

  useEffect(() => {
    setRegisterStatus(0)
  }, [])
  return (
    <StyledDialog>
      <StyledDialogContainer>
        <StyledDialogHead>
          <StyledSvg style={{ cursor: 'pointer' }} onClick={() => onClose()}>
            {iconClose}
          </StyledSvg>
        </StyledDialogHead>
        {registerStatus === 0 || registerStatus === 1 ? (
          <StyledDialogBody>
            <StyledFlex $direction='column' $gap='14px' style={{ marginBottom: 27 }}>
              <Image src={bnsAvatar} width={48} alt="bnsAvatar" />
              <StyledText $size='26px' $weight='500'>{priceLabel.label}.base</StyledText>
            </StyledFlex>
            <StyledInputNumber>
              <StyledInputNumberButton disabled={year === 1} onClick={() => handleMinus()}>-</StyledInputNumberButton>
              <StyledText $size='16px' $line='120%' style={{ flex: 1, textAlign: 'center' }}>{year} Year</StyledText>
              <StyledInputNumberButton onClick={() => handlePlus()}>+</StyledInputNumberButton>
            </StyledInputNumber>
            <StyledFlex $direction='column' $gap='20px' style={{ marginTop: 19, marginBottom: 15 }}>
              <StyledFlex $justify='space-between' style={{ width: '100%' }}>
                <StyledText $size='16px' $line='120%'>Type of Payment</StyledText>
                <StyledText $size='16px' $line='120%'>ETH</StyledText>
              </StyledFlex>
              <StyledFlex $justify='space-between' style={{ width: '100%' }}>
                <StyledText $size='16px' $line='120%'>{year} year registration</StyledText>
                <StyledText $size='16px' $line='120%'>${balanceFormated(totalPrice, 2)}</StyledText>
              </StyledFlex>
              {
                discount ? (
                  <StyledFlex $justify='space-between' style={{ width: '100%' }}>
                    <StyledFlex $gap='9px'>
                      <StyledText $size='16px' $line='120%'>DapDap Discount</StyledText>
                      <StyledButton
                        $width='65px'
                        $height='26px'
                        $borderRadius='6px'
                        $background='linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)'
                        $borderWidth='0px'
                      >
                        <StyledText $size='16px' $line='120%'>DapDap Discount</StyledText>
                      </StyledButton>
                    </StyledFlex>
                    <StyledText $size='16px' $line='120%'>-${balanceFormated(discountPrice, 2)}</StyledText>
                  </StyledFlex>
                ) : (
                  <StyledFlex $justify='space-between' style={{ width: '100%', opacity: 0.5 }}>
                    <StyledText $color='#979ABE' $size='16px' $line='120%'>DapDap Discount</StyledText>
                    <StyledText $color='#979ABE' $size='16px' $line='120%'>-${balanceFormated(discountPrice, 2)}</StyledText>
                  </StyledFlex>
                )
              }
              <StyledFlex $justify='space-between' $align='flex-start' style={{ width: '100%' }}>
                <StyledText $size='16px' $line='120%'>Total</StyledText>
                <StyledFlex $direction='column' $align='flex-end' $gap='5px'>
                  <StyledText $size='16px' $line='120%'>${balanceFormated(totalPrice - discountPrice, 2)}</StyledText>
                  <StyledText $color='#979ABE' $size='14px' $line='120%'>(~0.0025 ETH)</StyledText>
                </StyledFlex>
              </StyledFlex>
            </StyledFlex>
            <StyledFlex $direction='column' $gap='15px'>
              {
                discount ? (
                  <StyledButton
                    $background='#373A53'
                    $borderRadius='12px'
                  >
                    <StyledText $size='16px' $weight='500' $line='12px'>You’ve got price on 60% off</StyledText>
                  </StyledButton>
                ) : (
                  <StyledButton
                    $background='linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)'
                    $borderRadius='12px'
                    $borderWidth='0'
                  >
                    <StyledText $size='16px' $weight='500' $line='12px'>Get price on 60% off {iconRight}</StyledText>
                  </StyledButton>
                )
              }
              {
                registerStatus === 0 ? (
                  <StyledButton
                    $background={discount ? 'linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)' : '#373A53'}
                    $borderWidth={discount ? '0' : '1px'}
                    $borderRadius='12px'
                    onClick={handleRegister}
                  >
                    <StyledText $size='16px' $weight='500' $line='12px'>Register with ETH</StyledText>
                  </StyledButton>
                ) : (
                  <StyledLoadingButton>
                    <StyledSvg className='circle'>{iconCircle}</StyledSvg>
                  </StyledLoadingButton>
                )
              }

            </StyledFlex>

          </StyledDialogBody>
        ) : (
          <StyledDialogBody>
            <StyledUserNameButtonWrapper>
              <StyledUserNameButton>
                <StyledUserName>3210.base</StyledUserName>
              </StyledUserNameButton>
            </StyledUserNameButtonWrapper>
            <StyledFlex $direction='column' $gap='20px' style={{ marginTop: 35, marginBottom: 45 }}>
              <StyledText $size='40px' $weight='700' $line='100%'>Congratulations!</StyledText>
              <StyledText $size='16px' $line='120%'>You’ve just got your own .base name</StyledText>
            </StyledFlex>
            <StyledFlex $direction='column' $gap='20px'>
              <StyledButton $borderRadius='12px' onClick={() => router.push('https://www.basename.app/names')}>
                <StyledText $size='16px' $weight='500' $line='120%'>Check on Basescan</StyledText>
              </StyledButton>
              <StyledButton
                $borderRadius='12px'
                $borderWidth='0'
                $background='#EBF479'
              >
                <StyledText $color='#1E2028' $size='16px' $weight='700'>Claim <Image src={iconCain} alt='iconCain' /> 200 PTS</StyledText>
              </StyledButton>
            </StyledFlex>
          </StyledDialogBody>
        )}

      </StyledDialogContainer>
    </StyledDialog>
  );
};

export default memo(RegisterDialog);
