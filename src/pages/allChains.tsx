import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const AllChainsColumn: NextPageWithLayout = () => {

  const components = useBosComponents();

  const pcBgIcon = "https://ipfs.near.social/ipfs/bafkreidvk35xz6wjpdl6ial7lsuly7zbt2yjjbvgxz5jracbfjhnralupu"

  const mobileIcon = "https://ipfs.near.social/ipfs/bafkreigkayvd24jkreolnizn25vmjvrhw2tt6fg6pxgquieuatrcgzbvhq"

  const Container = styled.div`
   color:#ffffff;
   margin: -54px -36px;
   padding: 54px 36px;
   height:100vh;
   overflow: auto;
   background-image: url(${pcBgIcon});
   background-repeat: no-repeat;
   background-position: 24% 0%;

   .top{
    padding:30px 16px 0 16px;

    .title{
      font-size:40px;
      font-weight:700;
    }
    .subTitle{
      font-size:20px;
    }
   }

   @media (max-width: 1200px) {
    .top{
      .subTitle{
        width:50%;
      }
     }
  }

  @media (max-width: 900px) {
    background-image: url(${mobileIcon});
    background-repeat: no-repeat;
    background-position: 48% 0;
    margin: -54px 0;
    padding: 54px 0;
    height: auto;
    .top{
      padding: 0;
      height: 260px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title{
        font-size: 26px;
      }
      .subTitle{
      display: none;
      }
     }
  }
  `;

  return (
    <Container>
      <div className='top'>
        <div className="title">All Chains</div>
        <p className="subTitle">All-in-one Discovery & Management Platform for Multi-chain DeFi Users</p>
      </div>
      <ComponentWrapperPage
        src={components.allChains || ''}
        meta={{ title: 'Connect with the AllChains community.', description: 'Become part of the AllChains community.' }}
      />
    </Container>
  );
};

AllChainsColumn.getLayout = useDefaultLayout;

export default AllChainsColumn;
