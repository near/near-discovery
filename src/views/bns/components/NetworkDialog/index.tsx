import bnsAvatar from '@/assets/images/bns_avatar.svg';
// import iconPlus from '@/assets/images/icon_plus.svg';
import useAccount from '@/hooks/useAccount';
import { formatsByName } from "@ensdomains/address-encoder";
import namehash from "@ensdomains/eth-ens-namehash";
import { ethers } from 'ethers';
import _ from 'lodash';
import Image from 'next/image';
import { memo, useMemo, useState } from 'react';
import { COIN_TYLE_LIST, COIN_TYLE_MAP } from '../../constants';
import useBnsContract from '../../hooks/useBnsContract';
import type { SaveNetworkStatusType } from '../../types';
import {
  StyledAddressInput,
  StyledAddressInputWrapper,
  StyledButton,
  StyledCheckedStatus,
  StyledDialog,
  StyledDialogBody,
  StyledDialogContainer,
  StyledDialogHead,
  StyledFlex,
  StyledPlusButton,
  StyledSvg,
  StyledText,
  StyledWrapper
} from './styles';
const iconClose = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
  </svg>
)
const iconDelete = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#303142" />
    <path d="M13.444 12L16.7799 8.66415C17.0307 8.41332 17.0735 8.0494 16.8756 7.85157L16.1482 7.12424C15.9503 6.92632 15.5869 6.96974 15.3356 7.22041L12.0001 10.5561L8.66433 7.22049C8.41349 6.96941 8.04957 6.92632 7.85165 7.12449L7.12431 7.8519C6.92648 8.04949 6.96931 8.4134 7.22048 8.66423L10.5563 12L7.22048 15.336C6.96973 15.5866 6.92631 15.9503 7.12431 16.1482L7.85165 16.8756C8.04957 17.0735 8.41349 17.0306 8.66433 16.7799L12.0003 13.4439L15.3357 16.7794C15.587 17.0307 15.9504 17.0735 16.1483 16.8756L16.8757 16.1482C17.0735 15.9503 17.0307 15.5866 16.78 15.3356L13.444 12Z" fill="#979ABE" />
  </svg>
)
const iconBack = (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
    <path d="M7.5 1L2 6.5L7.5 12" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const iconChecked = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" fill="#EBF479" stroke="#EBF479" />
    <path d="M5.56543 8.00085L7.4205 9.73998L11.1306 6.26172" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)
const iconUnChecked = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" fill="#1E2028" stroke="#979ABE" />
  </svg>
)

const iconWarning = (
  <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
  </svg>
)

const iconPlus = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="10.5" stroke="#979ABE" />
    <path d="M10.464 14.876V11.69H7.35V10.286H10.464V7.1H12.012V10.286H15.126V11.69H12.012V14.876H10.464Z" fill="#979ABE" />
  </svg>
)
const iconWhitePlus = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="10.5" stroke="#FFFFFF" />
    <path d="M10.464 14.876V11.69H7.35V10.286H10.464V7.1H12.012V10.286H15.126V11.69H12.012V14.876H10.464Z" fill="#FFFFFF" />
  </svg>
)
const NetworkDialog = ({
  bnsName,
  setBnsName,
  onClose,
  currentChain,
  setChain,
  setShowSwitchNetworkDialog
}: any) => {
  const { account } = useAccount()
  const contract = useBnsContract()
  const [saveStatus, setSaveStatus] = useState<SaveNetworkStatusType>(0)
  const [addAddresses, setAddAddresses] = useState<any>({

  })
  const addresses = useMemo(() => {
    const object: any = {

    }
    Object.keys(bnsName.addresses).forEach(key => {
      const address = bnsName.addresses[key]
      object[key] = typeof address === 'string' ? [address, false] : address
    })
    return object
  }, [bnsName.addresses])
  const filterCoinTypeList = useMemo(() => COIN_TYLE_LIST.filter(coinType => typeof addresses[coinType] === 'object'), [bnsName, addresses])

  const addValues = useMemo(() => {
    const object: any = {}
    Object.keys(addresses).forEach(coinType => {
      if (typeof addAddresses[coinType] === 'object' && addresses[coinType] && addresses[coinType][0] && !addresses[coinType][1]) {
        object[coinType] = addresses[coinType][0]
      }
    })
    return object
  }, [addresses, addAddresses])
  const saveDisabled = useMemo(() => Object.keys(addValues).length === 0, [addValues])
  const handleSave = function () {
    setSaveStatus(2)
  }
  const handleClickCoinType = function (coinType: string) {
    const curr = _.cloneDeep(addAddresses)
    if (typeof curr[coinType] === 'object') {
      delete curr[coinType]
    } else {
      curr[coinType] = ['', false]
    }
    setAddAddresses(curr)
  }
  const handleAdd = function () {
    const curr = _.cloneDeep(bnsName)
    curr.addresses = Object.assign(curr.addresses, addAddresses)
    setBnsName(curr)
    setSaveStatus(0)
  }
  const handleDelete = function (coinType: string) {
    if (typeof addAddresses[coinType] === 'object') {
      setAddAddresses((prev: any) => {
        const curr = _.cloneDeep(addAddresses)
        delete curr[coinType]
        return curr
      })
      setBnsName((prev: any) => {
        const curr = _.cloneDeep(prev)
        delete curr.addresses[coinType]
        return curr
      })
    }
  }
  const handleInputChange = function (event: any, coinType: string) {
    const value = event.target.value
    let invalidAddress = false
    if (value.length > 0) {
      try {
        const coin = COIN_TYLE_MAP[coinType]
        const decodedAddress = formatsByName[coin.label].decoder(value)
      } catch (error) {
        invalidAddress = true
      }
    }
    const currBnsName = _.cloneDeep(bnsName)
    const currAddAddresses = _.cloneDeep(addAddresses)
    currBnsName.addresses[coinType] = [value, invalidAddress]
    currAddAddresses[coinType] = [value, invalidAddress]
    setBnsName(currBnsName)
    setAddAddresses(currAddAddresses)
  }
  const handleSetPrimary = async function () {
    if (currentChain && currentChain.chainName !== 'Base') {
      setShowSwitchNetworkDialog(true)
      return
    }
    const nameHash = namehash.hash(bnsName.name)
    try {
      const response = await contract.write({
        address: '0x0363696B6D369859f5fb4994a5Ade574CD91D220',
        functionName: 'setName',
        args: [nameHash]
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleConfirm = async function () {
    const args: any = []
    const iface = new ethers.utils.Interface([{
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "node",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "coinType",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "a",
          "type": "bytes"
        }
      ],
      "name": "setAddr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }]);
    const nameHash = namehash.hash(bnsName.name)
    Object.keys(addValues).forEach(coinType => {
      const length = (addValues[coinType] + '').length
      const value = length % 2 === 0 ? addValues[coinType] : addValues[coinType].slice(0, -1)
      args.push(
        iface.encodeFunctionData('setAddr', [nameHash, coinType, value])
      )
    })
    const response = await contract.multicall({
      address: '0xa92659104Eb42309Ae9482F1D1AE934B9Ee51dc3',
      args
    })
  }
  return (
    <StyledDialog>
      <StyledDialogContainer>
        <StyledDialogHead>
          {
            saveStatus === 1 ? (
              <StyledFlex $gap='15px'>
                <StyledSvg style={{ cursor: 'pointer' }} onClick={() => setSaveStatus(0)}>{iconBack}</StyledSvg>
                <StyledText $size='16px' $weight='700'>Add Network</StyledText>
              </StyledFlex>
            ) : saveStatus === 2 ? (
              <StyledText $size='20px' $weight='700'>Save Chages</StyledText>
            ) : <StyledWrapper></StyledWrapper>
          }
          <StyledSvg style={{ cursor: 'pointer' }} onClick={() => onClose && onClose()}>{iconClose}</StyledSvg>
        </StyledDialogHead>
        {
          saveStatus === 0 && <StyledDialogBody style={{ width: 536 }}>
            <StyledFlex $direction='column' $gap='10px'>
              <Image src={bnsAvatar} width={62} alt="bnsAvatar" />
              <StyledText $size='18px' $weight='700'>{bnsName.name}</StyledText>
              <StyledButton
                $width='102px'
                $height='26px'
                $background='#2E3142'
                $borderRadius='6px'
                onClick={handleSetPrimary}
              >
                <StyledText $color='#979ABE' $size='12px'>Set as Primary</StyledText>
              </StyledButton>
            </StyledFlex>
            <StyledPlusButton onClick={() => setSaveStatus(1)} style={{ marginTop: 23, marginBottom: 30 }}>
              <StyledSvg className='gray'>
                {iconPlus}
              </StyledSvg>
              <StyledSvg className='white'>
                {iconWhitePlus}
              </StyledSvg>
            </StyledPlusButton>
            <StyledWrapper style={{ marginBottom: 30, height: 300, overflow: 'auto' }}>
              <StyledFlex $direction='column' $gap='30px'>
                {
                  filterCoinTypeList.map((coinType: any) => {
                    const coin = COIN_TYLE_MAP[coinType]
                    return (
                      <StyledFlex key={coinType} $direction='column' $gap='10px' style={{ width: '100%' }}>
                        <StyledFlex $justify='flex-start' $gap='6px' style={{ width: '100%' }}>
                          <Image src={coin.icon} width={18} height={18} alt='iconCoin' />
                          <StyledText $size='14px' $weight='500' $line='120%'>{coin.label}</StyledText>
                        </StyledFlex>
                        <StyledAddressInputWrapper>
                          <StyledAddressInput value={addresses[coinType][0]} onChange={(event) => handleInputChange(event, coinType)} />
                          <StyledSvg style={{ cursor: 'pointer' }} onClick={() => handleDelete(coinType)}>{iconDelete}</StyledSvg>
                        </StyledAddressInputWrapper>
                        {addresses[coinType][1] && <StyledFlex $justify='flex-start' $gap='6px' style={{ width: '100%', color: 'rgb(247, 187, 67)' }}>
                          <StyledSvg>
                            {iconWarning}
                          </StyledSvg>
                          <StyledText $color='rgb(247, 187, 67)' $size='12px' $weight='700'>Invalid address</StyledText>
                        </StyledFlex>}
                      </StyledFlex>
                    )
                  })
                }
              </StyledFlex>
            </StyledWrapper>
            <StyledButton $background='#2E3142' disabled={saveDisabled} onClick={handleSave}>
              <StyledText $size='16px' $weight='700'>Save</StyledText>
            </StyledButton>
          </StyledDialogBody>
        }
        {
          saveStatus === 1 && <StyledDialogBody style={{ width: 536, paddingTop: 20 }}>
            <StyledFlex $wrap='wrap' $gap='10px'>
              {
                COIN_TYLE_LIST.map((coinType: any) => {
                  const coin = COIN_TYLE_MAP[coinType]
                  return (
                    <StyledButton
                      key={coinType}
                      $width='116px'
                      $height='120px'
                      $background='#2E3142'
                      style={{ flexDirection: 'column', gap: 17, position: 'relative' }}
                      disabled={addresses[coinType]}
                      onClick={() => handleClickCoinType(coinType)}
                    >
                      <StyledCheckedStatus>
                        {addresses[coinType] ? 'added' : (typeof addAddresses[coinType] === 'object' ? iconChecked : iconUnChecked)}
                      </StyledCheckedStatus>
                      <Image src={coin.icon} width={40} height={40} alt="coinType" />
                      <StyledText $size='16px' $weight='700'>{coin.label}</StyledText>
                    </StyledButton>
                  )
                })
              }
            </StyledFlex>
            {
              Object.keys(addAddresses).length > 0 ? (
                <StyledButton onClick={handleAdd} $background='#2E3142' style={{ marginTop: 20 }}>
                  <StyledText $size='16px' $weight='700'>Add ({Object.keys(addAddresses).length})</StyledText>
                </StyledButton>
              ) : (
                <StyledButton $background='#2E3142' disabled style={{ marginTop: 20 }}>
                  <StyledText $size='16px' $weight='700'>Add</StyledText>
                </StyledButton>
              )
            }

          </StyledDialogBody>
        }
        {
          saveStatus === 2 && <StyledDialogBody style={{ width: 408, paddingTop: 30 }}>
            <StyledFlex $direction='column' $gap='28px'>
              <StyledFlex $justify='space-between' style={{ width: '100%' }}>
                <StyledText $color='#979ABE' $size='16px'>Name</StyledText>
                <StyledText $size='16px'>{bnsName.name}</StyledText>
              </StyledFlex>
              <StyledFlex $justify='space-between' style={{ width: '100%' }}>
                <StyledText $color='#979ABE' $size='16px'>Action</StyledText>
                <StyledText $size='16px'>Profile Update</StyledText>
              </StyledFlex>
              <StyledFlex $justify='space-between' $align='flex-start' style={{ width: '100%' }}>
                <StyledText $color='#979ABE' $size='16px'>Update</StyledText>
                <StyledFlex $direction='column' $align='flex-end' $gap='16px'>
                  {Object.keys(addValues).map(coinType => {
                    const coin = COIN_TYLE_MAP[coinType]
                    return (
                      <StyledText $size='16px' key={coinType}>{coin.label}: {_.truncate(addValues[coinType], { length: 10 })}</StyledText>
                    )
                  })}
                </StyledFlex>
              </StyledFlex>
            </StyledFlex>
            <StyledButton $height='48px' $background='#2E3142' style={{ marginTop: 30 }} onClick={handleConfirm}>
              <StyledText $size='16px' $weight='700'>Confirm</StyledText>
            </StyledButton>
          </StyledDialogBody>
        }

      </StyledDialogContainer>
    </StyledDialog >
  );
};

export default memo(NetworkDialog);
