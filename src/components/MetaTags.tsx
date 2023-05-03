import Head from 'next/head';

type Props = {
  title: string;
  description: string;
};

export function MetaTags(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
    </Head>
  );
}
