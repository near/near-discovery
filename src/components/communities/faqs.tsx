import { Accordion } from '@near-pagoda/ui';
import styled from 'styled-components';

import { useCommunities } from '@/hooks/useCommunities';

const Link = styled.a`
  color: var(--violet8);
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

function FAQS() {
  const { urls } = useCommunities();

  const faqs = [
    {
      question: 'What is the expectation for a support resolution?',
      answer: `Upon submitting a support ticket, you can expect to receive an initial response from our team within 72 hours
          during our business hours. Our business hours are on weekdays in the PST timezone, excluding US holidays.`,
    },
    {
      question: 'Where can I find help to troubleshoot a development issue?',
      answer: (
        <>
          Social channels such as <Link href={urls.telegram}>Telegram</Link> and{' '}
          <Link href={urls.discord}>Discord</Link> are a great resource to tap into for community support on development
          issues. If you can&apos;t find a solution, please submit a{' '}
          <Link href={urls.supportRequest}>support request</Link> to our Customer Care team.
        </>
      ),
    },
    {
      question: 'Where can I find funding for my project?',
      answer: (
        <>
          You can find information on grants and funding opportunities on the{' '}
          <Link href={'https://www.near.org/funding'}> main NEAR portal </Link>.
        </>
      ),
    },
    {
      question: 'How can I find out about the latest product developments?',
      answer: (
        <>
          Follow <Link href={urls.twitter}>NEAR on X</Link> for our latest product announcements or subscribe to{' '}
          <Link href={urls.nearWeek}>NEAR Week</Link> to receive their weekly newsletter on ecosystem announcements.
        </>
      ),
    },
    {
      question: 'I found a bug — where can I flag this?',
      answer: (
        <>
          For any issues or concerns you&apos;ve encountered, please feel free to provide us with detailed information
          through our{' '}
          <Link href={urls.hackenproof} target="_blank">
            Bug Bounty Program
          </Link>
          . Your cooperation and additional details will assist us in addressing and resolving any potential
          vulnerabilities effectively. We appreciate your proactive approach in helping us maintain the security and
          integrity of the NEAR ecosystem. If you have any further questions or need assistance, don&apos;t hesitate to
          reach out to us.
        </>
      ),
    },
    {
      question: 'What happened to Near Wallet?',
      answer: (
        <>
          As we embrace a more decentralized future, wallet.near.org will be discontinued. This change invites you to
          discover a variety of new and secure wallet options within our ecosystem. Your funds are safe! Accounts exist
          on the blockchain, not in a wallet. Wallets are just an interface into using the blockchain with your account.{' '}
          <Link href={urls.nearWallet} target="_blank">
            Learn more
          </Link>{' '}
        </>
      ),
    },
    {
      question: 'Question about Transfer Exchange?',
      answer:
        "For issues relating to a third-party exchange, such as Binance or Coinbase we're unable to investigate issues on external platforms like these. To address your concern effectively, we recommend contacting the customer support team of the specific exchange where you're experiencing issues. They are most equipped to assist you in resolving the matter.",
    },
    {
      question: 'How do I withdraw NEAR funds?',
      answer: (
        <>
          Your NEAR funds are managed within your chosen wallet. To best address your question we suggest you visit the
          support site for your wallet that holds your NEAR funds. For generalized steps see{' '}
          <Link href={urls.withdrawNearFunds}>this article</Link>.
        </>
      ),
    },
  ];
  return (
    <Accordion.Root type="multiple">
      {faqs.map((item, index) => (
        <Accordion.Item value={item.question} key={index}>
          <Accordion.Trigger>{item.question}</Accordion.Trigger>
          <Accordion.Content>
            <div>{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export default FAQS;
