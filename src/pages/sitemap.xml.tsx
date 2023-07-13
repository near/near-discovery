function generateSiteMap() {
  //this fn serves to build a sitemap with the env specific hostname
  return `
    <xml version="1.0" encoding="UTF-8">
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/near/widget/NearOrg.HomePage</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/use</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/learn</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/ecosystem</loc>
        <lastmod>2023-05-01</lastmod>
      </url>
    </urlset>
    </xml>
   `;
}

type SiteMap = {
  props: object;
};

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export function getServerSideProps({ res }: { res: any }): SiteMap {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
