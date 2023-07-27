import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  position:relative;
  z-index:50;
  width:260px;
  min-height:100vh;
  background: rgba(24, 26, 39, 1);
  padding:10px;
  flex-shrink:0;
  .logo{
    padding:24px 0 18px 32px;
  }
  .item{
    position:relative;
    display:flex;
    align-items:center;
    height:60px;
    border-radius:16px;
    cursor:pointer;
    padding-left:32px;
    font-size: 18px;
    font-weight: 500;
    margin:6px 0;
    color:rgba(151, 154, 190, 1);
    text-decoration:none;
    .icon{
      display:flex;
      align-items:center;
      width:32px;
    }
  }
  .child-item {
    padding-left:64px;
  }
  .item.active{
    background: rgba(55, 58, 83, 1);
    color:#EBF479;
    .bag{
      position:absolute;
      right:-10px;
      top:-12px;
    }
  }
  .small .menu {
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .small .logo{
    padding:24px 0 18px 30px;
  }
  .small .item{
    padding-left:0;
  }
  .small .item.active{
    background: transparent;
  }
  .small .item .icon{
    width:auto;
  }
  .small .hasChildBox {
    display:flex;
    justify-content:center;
    position:relative;
    width:100%;
  }
  .small .active .bag{
    right: -16px;
    top: 5px;
  }
  .small .childBox{
    position:absolute;
    left:80px;
    top:0;
    width:180px;
    background-color:#373A53;
    border-radius:16px;
    padding:10px 10px 4px 10px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    .child-item{
      white-space: nowrap;
      height:50px;
      padding:0 16px;
      margin:0 0 6px 0;
    }
    .active, .child-item:hover{
      background-color:rgba(24, 26, 39, 0.3);
    }
  }
  .putButton{
    position:absolute;
    right:0;
    top:31px;
    cursor:pointer;
  }
`;
export const DesktopNavigationLeft = () => {
  const [putMenu, setPutMenu] = useState(false);
  const [showChildBox, setShowChildBox] = useState(false);
  const router = useRouter();
  function isActive(name:string) {
    let paths:string[] = [];
    if (name == 'nearcolumn') {
      paths = ['ref-home', 'xBox', 'nearcolumn'];
      
    } else if (name == 'zkevmcolumn') {
      paths = ['ZKEVMSwap.zkevm-swap', 'ZKEVMSwap.zkevm-bridge', 'ZKEVM.GAMMA', 'ZKEVM.AAVE', 'zkevmcolumn'];

    } else if (name == 'warmup') {
      paths = ['ZKEVM.ExecuteRecords', 'ZKEVM.QuestionList', 'warmup'];
    }
    const r = router.asPath.split('/').pop() || '';
    return paths.includes(r);
  }
  const visible_bag = <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5.23218" y="9.56238" width="7" height="3" rx="1.5" transform="rotate(-30 5.23218 9.56238)" fill="url(#paint0_linear_1_257)"/>
  <rect x="0.905762" y="6.06897" width="7" height="3" rx="1.5" transform="rotate(-45 0.905762 6.06897)" fill="url(#paint1_linear_1_257)"/>
  <rect width="7" height="3" rx="1.5" transform="matrix(-0.965926 0.258819 0.258819 0.965926 13.4338 12.6924)" fill="url(#paint2_linear_1_257)"/>
  <defs>
  <linearGradient id="paint0_linear_1_257" x1="8.73218" y1="9.56238" x2="8.73218" y2="12.5624" gradientUnits="userSpaceOnUse">
  <stop stop-color="#EEF3BF"/>
  <stop offset="1" stop-color="#E9F456"/>
  </linearGradient>
  <linearGradient id="paint1_linear_1_257" x1="4.40576" y1="6.06897" x2="4.40576" y2="9.06897" gradientUnits="userSpaceOnUse">
  <stop stop-color="#EEF3BF"/>
  <stop offset="1" stop-color="#E9F456"/>
  </linearGradient>
  <linearGradient id="paint2_linear_1_257" x1="3.5" y1="0" x2="3.5" y2="3" gradientUnits="userSpaceOnUse">
  <stop stop-color="#EEF3BF"/>
  <stop offset="1" stop-color="#E9F456"/>
  </linearGradient>
  </defs>
  </svg>
  
  return (
      <Container style={{width: putMenu? '80px': '260px', padding: putMenu? '10px 0': '10px'}}>
          <div className='putButton' style={{transform: putMenu ? 'rotateY(180deg)': '', right:putMenu ? '-21px': '0px'}} onClick={() => {
            setPutMenu(!putMenu)
          }}>{putIcon}</div>
          {
            putMenu ? <div className="small">
            <div className="logo">{shanshanPutLogo}</div>
            <div className="menu">
              <Link className={`item ${router.asPath == '/' ? 'active': ''}`} href="/"><div className="icon">{homeIcon}</div><span className='bag'>{router.asPath == '/' ? visible_bag: null}</span></Link>
              <div className='hasChildBox' onMouseEnter={() => {
                setShowChildBox(true)
              }} onMouseLeave={() => {
                setShowChildBox(false)
              }}>
                <div className='item'><div className="icon">{templatesIcon}</div></div>
                <div className="childBox" style={{display: showChildBox ? 'block': 'none'}}>
                  <Link className={`item child-item ${isActive('nearcolumn') ? 'active': ''}`}  href="/nearcolumn">NEAR</Link>
                  <Link className={`item child-item ${isActive('zkevmcolumn') ? 'active': ''}`}  href="/zkevmcolumn">Polygon zkEVM</Link>
                </div>
              </div>
              <Link className={`item ${isActive('warmup') ? 'active': ''}`}  href="/warmup">
                <div className="icon">{zkevmIcon}</div>
                {
                  isActive('warmup') ? <span className='bag'>{visible_bag}</span>:null
                }
              </Link>
            </div>
          </div>:<div>
            <div className="logo">{shanshanLogo}</div>
            <div className="menu">
              <Link className={`item ${router.asPath == '/' ? 'active': ''}`} href="/"><div className="icon">{homeIcon}</div>Home<span className='bag'>{router.asPath == '/' ? visible_bag: null}</span></Link>
              <div>
              <div className='item' style={{cursor: 'default'}}><div className="icon">{templatesIcon}</div>Chains</div>
                <div className="">
                  <Link className={`item child-item ${isActive('nearcolumn') ? 'active': ''}`}  href="/nearcolumn">NEAR<span className='bag'>{isActive('nearcolumn') ? visible_bag: null}</span></Link>
                  <Link className={`item child-item ${isActive('zkevmcolumn') ? 'active': ''}`}  href="/zkevmcolumn">Polygon zkEVM<span className='bag'>{isActive('zkevmcolumn') ? visible_bag: null}</span></Link>
                </div>
              </div>
              <Link className={`item ${isActive('warmup') ? 'active': ''}`}  href="/warmup">
                <div className="icon">{zkevmIcon}</div>
                ZkEvm Warm up
                {
                  isActive('warmup') ? <span className='bag'>{visible_bag}</span>:null
                }
                
              </Link>
            </div>
          </div>
          }
          
          
      </Container>
  );
};


const homeIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6488 7.28424L10.3259 0.646165C9.95621 0.235971 9.42099 0 8.85402 0C8.29613 0 7.76091 0.233766 7.40712 0.621906L0.356321 7.28204C0.00480133 7.63269 -0.0972526 8.13992 0.0977841 8.59201C0.292821 9.04411 0.744127 9.32639 1.24759 9.32639H1.8826V16.0968C1.8826 17.1465 2.74665 18 3.82616 18H6.85376C7.24611 18 7.59536 17.6913 7.59536 17.3097V12.8042C7.59536 12.6123 7.72463 12.4425 7.92193 12.4425H10.0583C10.2556 12.4425 10.4052 12.6146 10.4052 12.8042V17.3075C10.4052 17.6913 10.7341 17.9978 11.1264 17.9978H14.154C15.2335 17.9978 16.118 17.1465 16.118 16.0946V9.32419H16.7507C17.2519 9.32419 17.7032 9.0419 17.8983 8.59201C18.0979 8.14433 17.9981 7.63489 17.6488 7.28424Z" fill="currentColor"/>
</svg>

const templatesIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.998 4.51323C17.998 4.49288 17.9898 4.47252 17.9878 4.45216C17.9837 4.38295 17.9756 4.31373 17.9573 4.24655C17.9451 4.20787 17.9268 4.17326 17.9105 4.13662C17.8902 4.0898 17.8739 4.04298 17.8475 4.00023C17.8231 3.96155 17.7925 3.92694 17.7641 3.89233C17.7356 3.85773 17.7092 3.82108 17.6746 3.79055C17.638 3.75594 17.5973 3.72947 17.5566 3.70097C17.5322 3.68265 17.5098 3.66026 17.4834 3.64397C17.4712 3.63787 17.457 3.63379 17.4447 3.62769C17.4285 3.61954 17.4163 3.60529 17.398 3.59715L10.2977 0.242253C9.8746 0.0427505 9.4007 0 9.07732 0C8.59325 0 8.13359 0.0956797 7.78376 0.266682L0.587848 3.77426C0.225815 3.95137 -0.00401466 4.30966 5.31251e-05 4.70052C5.31251e-05 4.70866 0.004121 4.71477 0.004121 4.72495C0.004121 4.73309 5.31251e-05 4.74124 5.31251e-05 4.74938V13.3361C5.31251e-05 13.9346 0.528865 14.6329 1.20208 14.9484L8.19461 17.8819C8.35122 17.9613 8.52206 18 8.69494 18C8.82511 18 8.95325 17.9695 9.07732 17.9226C9.19121 17.9084 9.30511 17.884 9.41087 17.8351L16.7675 14.7367C17.4692 14.4069 18 13.7066 18 13.1102V4.52341V4.51934C17.998 4.5173 17.998 4.51527 17.998 4.51323ZM9.2502 7.10269C9.12206 7.15359 8.7641 7.15969 8.64816 7.12101L3.47598 4.67813L8.75393 2.10699C8.78037 2.09477 8.8963 2.0622 9.07732 2.0622C9.22782 2.0622 9.32545 2.0846 9.35392 2.09478L14.52 4.53563L9.2502 7.10269ZM15.8481 12.8679C15.84 12.874 15.8319 12.8781 15.8258 12.8822L9.96816 15.5856L9.7668 9.21782C9.77901 9.20968 9.79121 9.20154 9.80545 9.19543L15.8502 6.21307V12.8679H15.8481Z" fill="currentColor"/>
</svg>

const zkevmIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_303)">
<path d="M19.0929 11.5086C18.9929 11.5084 18.8938 11.528 18.8014 11.566C18.7089 11.6041 18.6249 11.6601 18.554 11.7306C18.4832 11.8012 18.4269 11.885 18.3885 11.9774C18.3501 12.0697 18.3302 12.1686 18.33 12.2686C18.33 12.471 18.4104 12.665 18.5534 12.8081C18.6965 12.9511 18.8905 13.0315 19.0929 13.0315C19.2952 13.0315 19.4892 12.9511 19.6323 12.8081C19.7753 12.665 19.8557 12.471 19.8557 12.2686C19.8555 12.1686 19.8356 12.0697 19.7972 11.9774C19.7588 11.885 19.7025 11.8012 19.6317 11.7306C19.5609 11.6601 19.4768 11.6041 19.3844 11.566C19.2919 11.528 19.1928 11.5084 19.0929 11.5086ZM18.4743 8.45149C18.4743 8.65381 18.5547 8.84785 18.6977 8.99091C18.8408 9.13397 19.0348 9.21435 19.2371 9.21435C19.4395 9.21435 19.6335 9.13397 19.7766 8.99091C19.9196 8.84785 20 8.65381 20 8.45149C20 8.24917 19.9196 8.05513 19.7766 7.91207C19.6335 7.769 19.4395 7.68863 19.2371 7.68863C19.0348 7.68863 18.8408 7.769 18.6977 7.91207C18.5547 8.05513 18.4743 8.24917 18.4743 8.45149ZM12.2814 18.2943C12.0759 18.2928 11.8782 18.3729 11.7317 18.517C11.5852 18.6611 11.5019 18.8574 11.5 19.0629C11.5 19.4872 11.85 19.8315 12.2814 19.8315C12.3833 19.8324 12.4844 19.8133 12.5788 19.7752C12.6733 19.7371 12.7593 19.6807 12.832 19.6093C12.9047 19.538 12.9627 19.453 13.0025 19.3592C13.0424 19.2655 13.0634 19.1648 13.0643 19.0629C13.0634 18.961 13.0424 18.8604 13.0025 18.7666C12.9627 18.6728 12.9047 18.5879 12.832 18.5165C12.7593 18.4451 12.6733 18.3888 12.5788 18.3507C12.4844 18.3125 12.3833 18.2934 12.2814 18.2943ZM17.71 14.6058C17.5068 14.6069 17.3123 14.6886 17.1693 14.833C17.0263 14.9773 16.9464 15.1726 16.9471 15.3758C16.9471 15.8001 17.2886 16.1443 17.71 16.1443C17.913 16.1432 18.1072 16.0617 18.2502 15.9176C18.3932 15.7736 18.4732 15.5787 18.4729 15.3758C18.4734 15.2751 18.4541 15.1753 18.4161 15.0821C18.378 14.9889 18.322 14.9041 18.2511 14.8326C18.1803 14.7611 18.096 14.7042 18.0031 14.6653C17.9103 14.6264 17.8107 14.6061 17.71 14.6058ZM15.3914 16.9043C15.1871 16.9066 14.992 16.9899 14.849 17.1358C14.7059 17.2818 14.6267 17.4786 14.6286 17.6829C14.6286 18.1129 14.97 18.4615 15.3914 18.4615C15.5958 18.4592 15.7909 18.376 15.9339 18.23C16.0769 18.084 16.1562 17.8873 16.1543 17.6829C16.1562 17.4786 16.0769 17.2818 15.9339 17.1358C15.7909 16.9899 15.5958 16.9066 15.3914 16.9043ZM10 18.5715C8.87389 18.5746 7.75835 18.3544 6.71792 17.9235C5.67748 17.4927 4.73281 16.8598 3.93857 16.0615C3.14141 15.2664 2.50927 14.3216 2.07851 13.2813C1.64776 12.2411 1.42688 11.126 1.42857 10.0001C1.42546 8.87395 1.6457 7.75841 2.07653 6.71798C2.50737 5.67754 3.14026 4.73287 3.93857 3.93863C4.73371 3.14153 5.67855 2.50944 6.71878 2.07868C7.75901 1.64793 8.87411 1.42702 10 1.42863C11.1261 1.42552 12.2416 1.64576 13.2821 2.0766C14.3225 2.50743 15.2672 3.14032 16.0614 3.93863C16.8445 4.71974 17.4684 5.64543 17.8986 6.66435L17.9271 6.73435L19.2486 6.19006C18.3652 4.05073 16.7674 2.28392 14.7272 1.19076C12.6871 0.0975995 10.3311 -0.254259 8.0606 0.195151C5.79013 0.644562 3.74576 1.86743 2.27592 3.65533C0.806088 5.44324 0.00175235 7.68554 0 10.0001C0 12.6522 1.05357 15.1958 2.92893 17.0711C4.8043 18.9465 7.34784 20.0001 10 20.0001V18.5715Z" fill="currentColor"/>
<path d="M13.6144 8.66574H12.143C11.8244 8.66574 10.943 8.82431 10.633 8.63717C10.5744 8.42288 10.7701 8.03145 10.8215 7.84574L11.2758 6.22145L11.9387 3.85717C12.0244 3.54859 11.6201 3.41717 11.4501 3.65002C9.68868 6.07717 7.92297 8.50288 6.15726 10.9286C6.0344 11.0986 6.20011 11.3315 6.38868 11.3315H8.53583C8.68726 11.3315 9.25297 11.2429 9.34726 11.3757C9.43297 11.4943 9.26726 11.8386 9.23011 11.9715L8.06154 16.1429C7.9744 16.45 8.38011 16.5815 8.54868 16.3486L13.843 9.07145C13.9673 8.90002 13.8001 8.66574 13.6144 8.66574Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_1_303">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
const shanshanLogo = <svg width="59" height="23" viewBox="0 0 59 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.390781 22.04V2.24H5.81078V4.44H2.89078V19.84H5.81078V22.04H0.390781ZM15.3275 0.559999H17.8675V16.22H15.3275V0.559999ZM8.5275 4.88H10.9875V18.58H8.5275V4.88ZM22.4075 4.84H24.8875V18.5H22.4075V4.84ZM9.7275 14.76H23.5075V17.24H9.7275V14.76ZM28.7475 20.22L27.3075 19.52C27.6008 19.0133 27.8342 18.4667 28.0075 17.88C28.1808 17.3067 28.2675 16.76 28.2675 16.24V14.46H30.7275V16.24C30.7275 17.1733 30.5675 17.9467 30.2475 18.56C29.9275 19.1867 29.4275 19.74 28.7475 20.22ZM40.9525 0.559999H43.4925V16.22H40.9525V0.559999ZM34.1525 4.88H36.6125V18.58H34.1525V4.88ZM48.0325 4.84H50.5125V18.5H48.0325V4.84ZM35.3525 14.76H49.1325V17.24H35.3525V14.76ZM53.1725 22.04V19.84H56.0925V4.44H53.1725V2.24H58.5925V22.04H53.1725Z" fill="#EBF479"/>
</svg>;

const shanshanPutLogo = <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.593906 20.04V0.239999H6.01391V2.44H3.09391V17.84H6.01391V20.04H0.593906ZM16.9694 20.04V17.84H19.8894V2.44H16.9694V0.239999H22.3894V20.04H16.9694Z" fill="#EBF479"/>
</svg>


const putIcon = <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 0H8C3.58172 0 0 3.58172 0 8V18C0 22.4183 3.58172 26 8 26H21V0Z" fill="#373A53"/>
<path d="M12 8L8 13L12 18" stroke="#E9F456" stroke-width="2" stroke-linecap="round"/>
</svg>


