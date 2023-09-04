import { PageProps, graphql } from 'gatsby';
import React from 'react';

import Profile from '~/components/Profile';
import Seo from '~/components/Seo';
import { useSeo } from '~/hooks/useSeo';
import Layout from '~/layout';

const AboutPage = ({
  data,
  location,
}: PageProps<GatsbyTypes.AboutPageQuery>) => {
  const siteMetadata = useSeo().site?.siteMetadata;

  const siteUrl = data.site?.siteMetadata?.siteUrl ?? '';
  const siteTitle = data.site?.siteMetadata?.title ?? '';
  const siteThumbnail = data.site?.siteMetadata?.thumbnail;

  const meta: Metadata[] = [];
  if (siteThumbnail) {
    const properties = ['og:image', 'twitter:image'];

    for (const property of properties) {
      meta.push({
        property,
        content: `${siteUrl}${siteThumbnail}`,
      });
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        lang='en'
        title={siteMetadata?.title ?? ''}
        description={siteMetadata?.description ?? ''}
        meta={meta}
        noSiteName
      />
      <Profile />
      <h1>I am ... </h1>
      <p>안녕하세요! 프론트엔드 개발자 박세은입니다🧤</p>
      <p>✓ 공부한 것을 오래 기억하기 위해 기록하고 있습니다.</p>
      <p>✓ 고객중심 디자인과 개선에 관심이 많습니다.</p>
      <p>✓ 두려움에 직면하고 도전하는 사람입니다.</p>
      <p>✓ 지속적으로 성장하고 협력하는 개발자가 되고 싶습니다.</p>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
        siteUrl
        thumbnail
      }
    }
  }
`;
