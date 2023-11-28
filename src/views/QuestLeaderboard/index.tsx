import Yours from '../Quest/components/Yours';
import Swiper from './components/swiper';
import Tabs from './components/tabs';
import Leaderboard from './components/leaderboard';
import { StyledContainer } from './styles';

import { memo, useState } from 'react';

import type { Tab } from './types';

const QuestLeaderboardView = () => {
  const [tab, setTab] = useState<Tab>('leaderboard');
  return (
    <StyledContainer>
      <Yours />
      <Swiper
        images={[
          'https://imgxz.bizhi3.com/cont/20220713/hdthybr0cae.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ofz74u-VoxLCpW53Uafafmoq55am5lek7-_217fK9lKMzVzm2uyQZSH2oKKC0yQw7Vs&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNqw_NLhj5t9hkmL_0qwhUV11FB3GrwpfQTiDDPKwpyceU5d2R0tUsMg6CK3Qx1d4M6tI&usqp=CAU',
        ]}
      />
      <Tabs
        current={tab}
        onChange={(_tab) => {
          setTab(_tab);
        }}
      />

      {tab === 'leaderboard' && <Leaderboard />}
    </StyledContainer>
  );
};

export default memo(QuestLeaderboardView);
