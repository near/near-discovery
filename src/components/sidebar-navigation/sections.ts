type NavigationSection = {
  title: string;
  hideTitle?: boolean;
  links: {
    title: string;
    url: string;
    icon: string;
  }[];
};

export const discoverDrawerSections: NavigationSection[] = [
  {
    title: 'Discover',
    hideTitle: true,
    links: [
      {
        title: 'Applications',
        url: '/applications',
        icon: 'ph-app-window',
      },
      {
        title: 'Components',
        url: '/components',
        icon: 'ph-git-fork',
      },
      {
        title: 'Gateways',
        url: '/gateways',
        icon: 'ph-compass',
      },
    ],
  },
];

export const marketingDrawerSections: NavigationSection[] = [
  {
    title: 'Platform',
    links: [
      {
        title: 'The Blockchain',
        url: '/blockchain',
        icon: 'ph-squares-four ph-bold',
      },
      {
        title: 'Open Web Applications',
        url: '/open-web-applications',
        icon: 'ph-globe-simple ph-bold',
      },
      {
        title: 'Onboarding',
        url: '/fast-auth-and-relayers',
        icon: 'ph-user-plus ph-bold',
      },
      {
        title: 'Data Infrastructure',
        url: '/data-infrastructure',
        icon: 'ph-tree-structure ph-bold',
      },
      {
        title: 'Data Availability',
        url: '/data-availability',
        icon: 'ph-database ph-bold',
      },
    ],
  },
  {
    title: 'Develop',
    links: [
      {
        title: 'Docs',
        url: 'https://docs.near.org',
        icon: 'ph-book-open-text ph-bold',
      },
      {
        title: 'GitHub',
        url: 'https://github.com/near',
        icon: 'ph-github-logo ph-bold',
      },
      {
        title: 'DevHub',
        url: '/devhub.near/widget/app',
        icon: 'ph-code ph-bold',
      },
      {
        title: 'Sandbox',
        url: '/sandbox',
        icon: 'ph-code-block ph-bold',
      },
      {
        title: 'QueryAPI',
        url: '/dataplatform.near/widget/QueryApi.App',
        icon: 'ph-code-block ph-bold',
      },
      {
        title: 'Learn QueryAPI',
        url: 'https://docs.near.org/build/data-infrastructure/query-api/intro',
        icon: 'ph-code-block ph-bold',
      },
      {
        title: 'Standards & Proposals',
        url: 'https://github.com/near/NEPs',
        icon: 'ph-file-text ph-bold',
      },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      {
        title: 'Overview',
        url: 'https://near.org/ecosystem',
        icon: 'ph-graph ph-bold',
      },
      {
        title: 'Founders',
        url: 'https://near.org/founders',
        icon: 'ph-lightbulb ph-bold',
      },
      {
        title: 'People',
        url: '/people',
        icon: 'ph-users-three ph-bold',
      },
      {
        title: 'News',
        url: '/nearweekapp.near/widget/nearweek.com',
        icon: 'ph-newspaper ph-bold',
      },
      {
        title: 'Events',
        url: 'https://near.org/events',
        icon: 'ph-calendar ph-bold',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        title: 'Learn',
        url: '/learn',
        icon: 'ph-info ph-bold',
      },
      {
        title: 'Blog',
        url: 'https://near.org/blog',
        icon: 'ph-chat-centered-text ph-bold',
      },
      {
        title: 'Careers',
        url: 'https://careers.near.org/jobs',
        icon: 'ph-briefcase ph-bold',
      },
    ],
  },
];
