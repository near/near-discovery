import { memo } from 'react';
import { useRouter } from 'next/router';
import {
  StyledMenu,
  StyledMenuItem,
  StyledMenuTitle,
  StyledMenuIconWrapper,
  StyledExploreTitle,
  StyledExploreDesc,
  StyledMenuLock,
} from './styles';

const MenuItem = ({ title, desc, icon, extra, disabled, onClick }: any) => {
  return (
    <StyledMenuItem onClick={onClick} style={{ opacity: disabled ? 0.5 : 1 }} data-bp="30011-001">
      <StyledMenuIconWrapper>{icon}</StyledMenuIconWrapper>
      <StyledMenuTitle>
        <StyledExploreTitle>{title}</StyledExploreTitle>
        {extra}
      </StyledMenuTitle>

      {/* <StyledExploreDesc>{desc}</StyledExploreDesc> */}
    </StyledMenuItem>
  );
};

const Menu = ({ setShow }: any) => {
  const router = useRouter();
  return (
    <StyledMenu className="menu-content-deep">
      <MenuItem
        title="Quick Onboarding"
        desc="DeepDive the hotest L2 Blockcchain to get more intension of reward."
        icon={<DeepDiveIcon />}
        onClick={() => {
          router.push('/onboarding/linea');
          setShow(false);
        }}
      />
      <MenuItem
        title="Seamless Navigation"
        desc="Shortcuts integrate common functions and the most popular dapps."
        icon={<ShotcutsIcon />}
        onClick={() => {
          router.push('/all-in-one');
          setShow(false);
        }}
      />
      <MenuItem
        link=""
        title="Portfolio"
        desc="Access your assets and positions directly from your portfolio after Lv.3."
        icon={<PortfolioIcon />}
        // extra={
        //   <StyledMenuLock>
        //     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        //       <g clip-path="url(#clip0_3598_39871)">
        //         <path
        //           d="M4.51351 4.51948H3.00302V2.75724C3.00302 2.37363 3.07894 2.01598 3.23079 1.68432C3.38264 1.35265 3.59243 1.06094 3.86016 0.809191C4.12789 0.557443 4.44358 0.35964 4.80721 0.215784C5.17085 0.0719281 5.56845 -7.8125e-09 6.00002 0C6.38364 0 6.75327 0.0719281 7.10891 0.215784C7.46456 0.35964 7.78024 0.557443 8.05597 0.809191C8.33169 1.06094 8.55147 1.35265 8.71531 1.68432C8.87914 2.01598 8.96106 2.37363 8.96106 2.75724V4.51948H7.51051V3.09291C7.51051 2.58941 7.37065 2.1998 7.09093 1.92408C6.81121 1.64835 6.43159 1.51049 5.95207 1.51049C5.5205 1.51049 5.17285 1.64835 4.90911 1.92408C4.64538 2.1998 4.51351 2.58941 4.51351 3.09291V4.51948ZM9.68034 5.23876C9.89612 5.23876 10.0819 5.31668 10.2378 5.47253C10.3936 5.62837 10.4715 5.81419 10.4715 6.02997V9.74625C10.4715 9.96204 10.4336 10.1638 10.3577 10.3516C10.2817 10.5395 10.1778 10.7033 10.046 10.8432C9.91411 10.983 9.75826 11.0929 9.57844 11.1728C9.39862 11.2527 9.20082 11.2927 8.98504 11.2927H2.93109C2.71531 11.2927 2.5195 11.2527 2.34368 11.1728C2.16785 11.0929 2.018 10.987 1.89413 10.8551C1.77025 10.7233 1.67435 10.5694 1.60641 10.3936C1.53848 10.2178 1.50452 10.03 1.50452 9.83017V6.02997C1.50452 5.81419 1.58044 5.62837 1.73229 5.47253C1.88414 5.31668 2.06795 5.23876 2.28374 5.23876H3.00302H4.51351H7.51051H8.96106H9.68034Z"
        //           fill="#EBF479"
        //         />
        //       </g>
        //       <defs>
        //         <clipPath id="clip0_3598_39871">
        //           <rect width="12" height="12" fill="white" />
        //         </clipPath>
        //       </defs>
        //     </svg>
        //     <span>Lv.3</span>
        //   </StyledMenuLock>
        // }
        onClick={() => {
          router.push('/profile');
          setShow(false);
        }}
      />
    </StyledMenu>
  );
};

const DeepDiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32" fill="none">
    <path
      d="M7.35829 18.7283H1.15683C0.34717 18.7283 -0.211347 17.9072 0.0767706 17.1412L6.23895 0.753955C6.32231 0.532249 6.47019 0.341436 6.663 0.206794C6.85581 0.0721522 7.08444 3.62079e-05 7.31862 0H17.717C18.5375 0 19.0968 0.842151 18.7871 1.61211L15.1991 10.5347H21.9537C22.9471 10.5347 23.4771 11.721 22.8219 12.4773L6.26129 31.5955C5.45625 32.525 3.96366 31.7196 4.27605 30.5243L7.35829 18.7283Z"
      fill="#EBF479"
    />
  </svg>
);

const ShotcutsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path
      d="M7.23184 5.39735C-2.41061 8.62315 -2.41061 13.8829 7.23184 17.0928L11.4891 18.5071L12.9029 22.7658C16.1118 32.4114 21.3858 32.4114 24.5946 22.7658L29.3761 8.43246C31.5048 1.99676 28.01 -1.51506 21.5764 0.630168L7.23184 5.39735ZM16.0482 15.2495C15.81 15.4879 15.5081 15.5991 15.2063 15.5991C14.9045 15.5991 14.6027 15.4879 14.3644 15.2495C14.1428 15.0253 14.0186 14.7227 14.0186 14.4073C14.0186 14.092 14.1428 13.7894 14.3644 13.5651L20.4009 7.49491C20.8615 7.03409 21.624 7.03409 22.0847 7.49491C22.5454 7.95574 22.5454 8.71849 22.0847 9.17932L16.0482 15.2495Z"
      fill="#EBF479"
    />
  </svg>
);

const PortfolioIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
    <path
      d="M3.19995 6.4C3.19995 7.24046 3.36549 8.07269 3.68712 8.84917C4.00875 9.62566 4.48017 10.3312 5.07447 10.9255C5.66876 11.5198 6.37429 11.9912 7.15078 12.3128C7.92726 12.6345 8.75949 12.8 9.59995 12.8C10.4404 12.8 11.2726 12.6345 12.0491 12.3128C12.8256 11.9912 13.5311 11.5198 14.1254 10.9255C14.7197 10.3312 15.1911 9.62566 15.5128 8.84917C15.8344 8.07269 16 7.24046 16 6.4C16 4.70261 15.3257 3.07475 14.1254 1.87452C12.9252 0.674284 11.2973 0 9.59995 0C7.90257 0 6.2747 0.674284 5.07447 1.87452C3.87423 3.07475 3.19995 4.70261 3.19995 6.4Z"
      fill="#A7AD54"
    />
    <path
      d="M19.2 20.0001C19.2 20.4715 19.12 20.9278 18.752 21.3537C17.408 22.8898 13.824 24.0001 9.6 24.0001C5.392 24.0001 1.792 22.905 0.448 21.3537C0.0799999 20.9278 0 20.4715 0 20.0001C0 19.5286 0.0799999 19.0723 0.448 18.6464C1.792 17.1103 5.376 16.0001 9.6 16.0001C13.808 16.0001 17.408 17.0951 18.752 18.6464C19.12 19.0571 19.2 19.5134 19.2 20.0001Z"
      fill="#EBF479"
    />
  </svg>
);

export default memo(Menu);
