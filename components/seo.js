import Head from 'next/head';
import config from '../config.yml';

export default function SEO({ description, title }) {
  const siteTitle = config.title;

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title | siteTitle} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
