import { memo, useEffect, useState } from 'react';
import Card from '../Card';
import ArrowIcon from '../ArrowIcon';
import CheckIcon from '../CheckIcon';
import RefreshIcon from '../RefreshButton';
import CardFlip from '../CardFlip';
import CardInput from './CardInput';
import useCheck from '../../hooks/useCheck';
import useReport from '../../hooks/useReport';
import { StyledCardHeader, StyledCardTitle, StyledCardFooter } from './styles';

const SocialCard = ({
  userInfo,
  authConfig,
  id,
  name = '',
  source,
  category,
  spins = 0,
  total_spins = 0,
  times = 0,
  onRefreshDetail,
}: any) => {
  const [finished, setFinished] = useState(false);
  const { checking, handleRefresh } = useCheck({ id, total_spins, times, spins }, (_times: number) => {
    setFinished(true);
    onRefreshDetail();
  });
  const { handleReport } = useReport();

  const onItemClick = () => {
    if (category === 'password') return;

    if (category === 'twitter_follow' && userInfo.twitter?.is_bind) {
      sessionStorage.setItem('_clicked_twitter_' + id, '1');
    }
    if (category.startsWith('twitter') && !userInfo.twitter?.is_bind) {
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${authConfig.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      sessionStorage.setItem('_auth_type', 'twitter');
      window.open(path, '_blank');
      return;
    }

    if (!source) return;
    if (source === '/network/linea') handleReport(id);
    window.open(source, '_blank');
  };

  useEffect(() => {
    const offers = spins * times;
    setFinished(offers <= total_spins);
  }, [total_spins, times, spins]);

  return (
    <Card onClick={onItemClick} disabled={finished}>
      <StyledCardHeader>
        <StyledCardTitle>{name}</StyledCardTitle>
        <ArrowIcon style={{ marginTop: '6px' }} />
      </StyledCardHeader>
      <StyledCardFooter>
        {finished ? (
          <CheckIcon />
        ) : category === 'password' ? (
          <CardInput
            onConfirm={(val: string) => {
              if (!checking) handleRefresh(val);
            }}
          />
        ) : (
          <RefreshIcon
            onClick={(ev: any) => {
              ev.stopPropagation();
              if (!checking) handleRefresh();
            }}
          />
        )}
        <CardFlip amount={spins} disabled={!finished} />
      </StyledCardFooter>
    </Card>
  );
};

export default memo(SocialCard);
