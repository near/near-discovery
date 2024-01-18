import DapXBNS from '@/assets/images/DapXBNS.svg';
import desktop from '@/assets/images/desktop.png';
import discountMark from '@/assets/images/discount_mark.svg';
import iconAchieved from '@/assets/images/icon_achieved.svg';
import Breadcrumb from '@/components/Breadcrumb';
import { DesktopNavigationTop } from '@/components/navigation/desktop/DesktopNavigationTop';
import useAccount from '@/hooks/useAccount';
import useAuth from '@/hooks/useAuth';
import * as http from '@/utils/http';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';
import InputWithEmoji from './components/InputWithEmoji';
import QA from './components/QA';
import QueryResult from './components/QueryResult';
import RelatedQuests from './components/RelatedQuests';
import YourBnsNames from './components/YourBnsNames';
import useBnsContract from './hooks/useBnsContract';
import useQuestList from './hooks/useQuestList';
import {
  StyledAchieved,
  StyledContainer,
  StyledFlex,
  StyledImage,
  StyledSvg,
  StyledText,
  StyledUserName,
  StyledWrapper
} from './styles';
import type { QueryNameStatusType } from './types';

import namehash from "@ensdomains/eth-ens-namehash";
import NetworkDialog from './components/NetworkDialog';
import RegisterDialog from './components/RegisterDialog';
const CampaignView = () => {
  const router = useRouter()
  const contract = useBnsContract()
  const { account } = useAccount();
  const { connect, connecting } = useAuth();
  const [value, setValue] = useState('')
  const [queryNameStatus, setQueryNameStatus] = useState<QueryNameStatusType>(0)
  const [bnsNames, setBnsNames] = useState<any>([])
  const [currentBnsName, setCurrentBnsName] = useState<any>({

  })
  const [showRegisterDialg, setShowRegisterDialg] = useState(false)
  const [priceLabel, setPriceLabel] = useState({

  })
  const [showNetworkDialog, setShowNetworkDialog] = useState<boolean>(false)
  const { loading, questList } = useQuestList(router.query.id as string)

  const timerRef = useRef<any>(null)

  const getBnsAddress = async function (name: string) {
    return await http.get('https://api.basename.app/records/base/' + name)
  }
  const getBnsNames = async function () {
    try {
      const firstResponse = await http.get('https://api.basename.app/v1/names?address=' + ethers.utils.getAddress(account as string))
      const promiseArray: any = []
      firstResponse.map((bnsName: any) => {
        promiseArray.push(getBnsAddress(bnsName.name))
      })
      const node = await contract.read({
        address: '0x0363696B6D369859f5fb4994a5Ade574CD91D220',
        functionName: 'node',
        args: [ethers.utils.getAddress(account as string)]
      })
      const primaryName = await contract.read({
        address: '0xa92659104Eb42309Ae9482F1D1AE934B9Ee51dc3',
        functionName: 'name',
        args: [node]
      })
      const secondResponse = await Promise.all(promiseArray)
      secondResponse.forEach((response, index) => {
        firstResponse[index]['isPrimaryName'] = firstResponse[index]['name'] == primaryName
        firstResponse[index]['addresses'] = response.data.addresses
      })
      setBnsNames(firstResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetQueryNameStatus = async function (event: any) {
    const normalizedName = namehash.normalize(event).split('.').join('')
    try {
      setQueryNameStatus(1)
      const firstResponse = await contract.read({
        address: '0x4079d84889e0E1AC22beec60dc8e5E7b621bf55D',
        functionName: 'available',
        args: [normalizedName]
      })
      const secondResponse = await http.get('https://api.basename.app/v1/registration/' + normalizedName + '/is-name-available')
      if (firstResponse && secondResponse) {
        setQueryNameStatus(2)
      } else {
        setQueryNameStatus(3)
      }
    } catch (error) {
      console.log(error)
    }
    try {
      const thirdResponse = await http.get('https://api.basename.app/v1/prices/labels/' + normalizedName)
      setPriceLabel(thirdResponse)
    } catch (error) {
      console.log(error)
    }
  }
  const handleInputChange = function (event: any) {
    setQueryNameStatus(0)
    setValue(event)
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      handleGetQueryNameStatus(event)
    }, 1000)
  }
  const handleClickBnsName = function (value: any) {
    setCurrentBnsName(value)
    setShowNetworkDialog(true)
  }
  const handleClaim = function () {
    setShowRegisterDialg(true)
  }
  useEffect(() => {
    account && getBnsNames()
  }, [])
  return (
    <StyledWrapper>
      <DesktopNavigationTop />
      <StyledContainer style={{ paddingTop: 30, paddingBottom: 19 }}>
        <Breadcrumb navs={[
          { name: 'Home', path: '/' },
          { name: 'Quest', path: '/bns/leaderboard' },
          { name: 'DapDap X BNS', path: '/bns/campaign' },
        ]} />
      </StyledContainer>
      <StyledFlex $gap='20px' style={{
        background: 'linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%)',
        height: 254
      }}>
        <StyledWrapper >
          <StyledSvg>
            <Image src={DapXBNS} alt='DapXBNS' />
          </StyledSvg>
          <StyledFlex>
            <StyledFlex $direction='column' $gap='6px' style={{ width: 496 }}>
              <StyledText $size='36px' $weight='700' $line='120%'>One quest for the best price!</StyledText>
              <StyledText $size='20px' $line='120%'>Follow the quest on the right, you will get the best price for register BNS, and get 100 DapDap PTS.</StyledText>
            </StyledFlex>
            <StyledSvg>
              <Image src={discountMark} alt='discountMark' />
            </StyledSvg>
          </StyledFlex>
        </StyledWrapper>
        <StyledWrapper style={{ position: 'relative' }}>
          {/* <QuestItem /> */}
          <StyledAchieved>
            <Image src={iconAchieved} alt='iconAchieved' />
          </StyledAchieved>
        </StyledWrapper>
      </StyledFlex>
      <StyledImage>
        <Image src={desktop} width={678} height={419} alt='desktop' />
      </StyledImage>
      <StyledFlex $direction='column' $gap='16px' style={{ position: 'relative', top: '-44px' }}>
        <StyledUserName>Web3 Username</StyledUserName>
        <StyledText $size='20px' $weight='600'>Web3 naming (.base) for the next billion+ users on Base</StyledText>
      </StyledFlex>
      <StyledFlex $direction='column' $gap='20px'>
        <InputWithEmoji queryStatus={queryNameStatus} value={value} setValue={setValue} onChange={(event: any) => handleInputChange(event)} />
        {queryNameStatus > 1 && <QueryResult label={value} status={queryNameStatus} onClaim={handleClaim} />}
      </StyledFlex>
      {bnsNames.length > 0 && <YourBnsNames bnsNames={bnsNames} onClick={handleClickBnsName} />}
      <StyledFlex style={{ marginTop: 80 }} $direction='column' $gap='100px'>
        <RelatedQuests loading={loading} questList={questList} />
        <QA />
      </StyledFlex>
      {showRegisterDialg && <RegisterDialog priceLabel={priceLabel} onClose={() => setShowRegisterDialg(false)} />}
      {showNetworkDialog && <NetworkDialog bnsName={currentBnsName} setBnsName={setCurrentBnsName} onClose={() => setShowNetworkDialog(false)} />}
    </StyledWrapper >
  );
};

export default memo(CampaignView);
