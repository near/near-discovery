const featuredCommunities = [
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreibysr2mkwhb4j36h2t7mqwhynqdy4vzjfygfkfg65kuspd2bawauu',
    name: 'NEAR Dev',
    summary: 'An open community for developers',
    accountId: 'nearai.community.devhub.near',
    telegram: 'nearaialpha',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreihgxkxuvj67b7vwys5di2326vx7sdvw5jjswv2xqlyxhelhha52ra',
    name: 'NEAR AI',
    summary: 'A community for AI enthusiasts',
    accountId: 'nearai.community.devhub.near',
    telegram: 'nearaialpha',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreibi2p7h2jailau6fwt4zf2xdifsqhc4dabsowmngzswpzr7r4ikiq',
    name: 'Chain Abstraction',
    summary: 'Chain and Account Abstraction',
    accountId: 'chain-abstraction.community.devhub.near',
    telegram: 'chain_abstraction',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreidhehq7za5btjegq5u2rw5jmw2kygef2776d6qcpkopaa3nphg5pm',
    name: 'Tooling',
    summary: 'Supporting our tooling ecosystem',
    accountId: 'tooling.community.devhub.near',
    telegram: 'NEAR_Tools_Community_Group',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreib45plxkuy6wcefachijuq2dm4jnfs4236yhfleehqboeeljpmxje',
    name: 'Docs',
    summary: 'A space to talk about all NEAR docs',
    accountId: 'docs.community.devhub.near',
    telegram: 'neardocscg',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreicfcszhhmiw6bq5fvh7ebfqhmodplldxjve7id4mi67iykz67qehi',
    name: 'Build DAO',
    summary: 'The more you ship, the more you level up',
    accountId: 'build.community.devhub.near',
    telegram: '+bQmGfDqcAT9iYTcx',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreihdu5bsnvxoxi62j24ljd4o5gfebtgtn6gaj3n4ebq23qoprn7tou',
    name: 'Wallet Builders',
    summary: 'Building Wallet infrastructure on NEAR',
    accountId: 'wallet.community.devhub.near',
    telegram: 'wallet-builders',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreihmospumgywngdgtxpqftry3sykqyljr7xzvtqhlktg36vy4f4djq',
    name: 'Validators',
    summary: 'Ensuring a healthy & efficient ecosystem',
    accountId: 'validators.community.devhub.near',
    telegram: 'near_validators',
  },
  {
    icon: 'https://ipfs.near.social/ipfs/bafkreifydvg7r7e34j5chme633yjhk6lqyhbesmdcd2ninjx6dyl46qyey',
    name: 'Near Ukraine',
    summary: 'Community of Developers, Builders, Founders',
    accountId: 'nearukraine.community.devhub.near',
    telegram: 'nearprotocolua',
  },
];

const urls = {
  devHub: 'neardevhub.org',
  discord: 'https://near.chat',
  discourse: 'https://gov.near.org',
  docs: 'https://docs.near.org',
  getFunding: 'https://www.near.org/funding',
  github: 'https://github.com/near',
  hackenproof: 'https://hackenproof.com/near',
  helpCenter: 'https://nearhelp.zendesk.com/hc/en-us',
  nearWallet: 'https://wallet.near.org/',
  nearWeek: 'https://subscribe.nearweek.com/',
  supportRequest: 'https://nearhelp.zendesk.com/hc/en-us/requests/new',
  telegram: 'https://t.me/neardev',
  twitter: 'https://twitter.com/nearprotocol',
  wechat: 'https://pages.near.org/wechat',
  withdrawNearFunds:
    'https://nearhelp.zendesk.com/hc/en-us/articles/360060927734-Staking-Unstaking-and-Withdrawing-NEAR',
  youtube: 'https://www.youtube.com/channel/UCuKdIYVN8iE3fv8alyk1aMw',
};

const channels = [
  {
    icon: 'ph-telegram-logo',
    label: 'Telegram',
    url: urls.telegram,
  },
  {
    icon: 'ph-discord-logo',
    label: 'Discord',
    url: urls.discord,
  },
  {
    icon: 'ph-github-logo',
    label: 'GitHub',
    url: urls.github,
  },
  {
    icon: 'ph-file-text',
    label: 'Docs',
    url: urls.docs,
  },
  {
    icon: 'ph-wechat-logo',
    label: 'WeChat',
    url: urls.wechat,
  },
  {
    icon: 'ph-twitter-logo',
    label: 'X',
    url: urls.twitter,
  },
];

export function useCommunities() {
  return { featuredCommunities, urls, channels };
}
