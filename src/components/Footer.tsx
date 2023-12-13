import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  display: flex;
  color: rgba(151, 154, 190, 1);
  font-size: 14px;
  font-weight: 400;
  padding: 0 2%;
  .footer-item {
    flex: 1;
    text-align: center;
  }
  .footer-left {
    text-align: left;
  }
  .footer-right {
    text-align: right;
  }
`;
const StyledSocials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
const StyledSocialButton = styled(motion.div)`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SocialButton = ({ src, alt, url }: { src: string; alt: string; url?: string }) => {
  return url ? (
    <StyledSocialButton
      whileHover={{ opacity: 0.6 }}
      whileTap={{ opacity: 0.4 }}
      onClick={() => {
        window.open(url, '_blank');
      }}
    >
      <img src={src} alt={alt} />
    </StyledSocialButton>
  ) : (
    <img src={src} alt={alt} />
  );
};
const Footer = () => {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <StyledContainer>
      <div className="footer-item">
        <div>Made with ❤️ by DapDap team.</div>
        <div>Bulit on BOS & NEAR Protocol</div>
      </div>
      <div className="footer-item footer-center">
        <StyledSocials>
          <SocialButton
            src="https://assets.dapdap.net/images/bafkreic2ou5l3zhdefbhswd6jomuhzmvyu5oqpbom3d3vo3djoeywxmyay.svg"
            alt="X"
            url="https://twitter.com/DapDapMeUp"
          />
          <SocialButton
            src="https://assets.dapdap.net/images/bafkreibaof45e2fwgaphbengfh5molv6dwjkcp4zrwkixyqm3mrc3x7jhm.svg"
            alt="X"
            url="Telegram"
          />
          <SocialButton
            src="https://assets.dapdap.net/images/bafkreif3gh6hszingmncy6kg3en6xoumceepw4ys3dq3dbjd7rkn7zfb74.svg"
            alt="X"
            url="Discord"
          />
          <SocialButton
            src="https://assets.dapdap.net/images/bafkreifyzh5mqbh6z6utj7z4dp2eelhaa654mnt6mut4oxml3mw56fqoxm.svg"
            alt="Medium"
            url=""
          />
        </StyledSocials>
      </div>
      <div className="footer-item">Copyright 2023 DapDap</div>
    </StyledContainer>
  );
};

export default Footer;
