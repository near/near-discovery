import Link from 'next/link';
import styled from 'styled-components';

const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  padding: 30px 24px 20px 24px;
  border-bottom: 1px #292c42 solid;
  display: flex;
  .icon {
    line-height: 56px;
  }
  img {
    width: 52px;
    height: 52px;
    margin: 0 14px 0 30px;
  }
  .container-text {
    h3 {
      font-size: 20px;
      font-weight: 700;
    }
    img {
      width: 16px;
      height: 16px;
      margin: 0 6px 0 0;
    }
    p {
      display: inline-block;
      margin: 0;
      font-size: 16px;
    }
  }
`;

const Banner = styled.a`
  img {
    width: 100%;
  }
  .replaceImg {
    width: 100%;
  }
`;

const GoBackIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z"
      fill="#979ABE"
    />
  </svg>
);

const GoBackNav = () => {
  return (
    <AbsoluteContainer>
      <Link href={'/near'} className="icon">
        {GoBackIcon}
      </Link>

      <img src={'https://ipfs.near.social/ipfs/bafkreia75l4donjlz36m7lmdu3ymfeunk2bisfk73rvtqe55uqw7a5rhzq'} alt="" />

      <div className="container-text">
        <h3>NEAR-Ethereum Bridge </h3>
        <img src="https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm" />
        <p>@bluebiu.near</p>
      </div>
    </AbsoluteContainer>
  );
};

const GoBackNavSourceAllInOne = () => {
  return (
    <AbsoluteContainer>
      <Link href={'/near'} className="icon">
        {GoBackIcon}
      </Link>

      <img src={'https://ipfs.near.social/ipfs/bafkreigq5clxrflxne3bwmtxhwmji774eye5hm6nlrbospjaljuocesyuy'} alt="" />

      <div className="container-text">
        <h3>NEAR All-in-one</h3>
        <img src="https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm" />
        <p>@juaner.near</p>
      </div>
    </AbsoluteContainer>
  );
};

export { GoBackNav, GoBackNavSourceAllInOne };
