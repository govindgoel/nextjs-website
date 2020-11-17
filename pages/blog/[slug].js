import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { DiscussionEmbed } from 'disqus-react';
import dataFetch from '../../utils/dataFetch';
import TitleBar from '../../components/theme/titleBar';
import dateFormat from 'dateformat';
import Loading from '../../components/theme/loading';

import { useRouter } from 'next/router';

const query = `query ($slug: String!){
  blog(slug: $slug){
    title
    slug
    date
    cover
    author{
      fullName
    }
    tags{
      name
    }
    featured
    description
  }
}`;

export default function BlogTemplate(props) {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(false);
  const variables = { slug: slug };
  const fetchData = async (variables) => await dataFetch({ query, variables });

  useEffect(() => {
    !isLoading &&
      fetchData(variables).then((r) => {
        setData(r.data.blog);
        setLoading(true);
      });
  }, [data, isLoading]);

  const disqusConfig = {
    url: "{'https://amfoss.in/blog/' + props.slug}",
    identifier: data.slug,
    title: data.title,
  };

  return isLoading ? (
    <Layout>
      <SEO
        title={data.title}
        slug={data.slug}
        keywords={data.tags ? data.tags.join(', ') : null}
        image={`https://amfoss.in/blog/${data.slug}/seo.jpg`}
      />
      <TitleBar title={data.title} type="h3" />
      <div className="row mx-2 my-4">
        <div className="post-header col-md-9 order-2 order-md-1">
          <img
            className="w-100 post-cover mb-2"
            src={`https://api.amfoss.in/${data.cover}`}
            alt={data.slug + `'s image`}
          />
        </div>
        <div className="col-md-3 order-1 mb-4 order-md-2">
          <div className="card-no-hover p-2">
            <div>
              <i className="fa fa-calendar-alt ml-4" />{' '}
              {dateFormat(new Date(data.date), 'dS mmmm, yyyy')}
            </div>
            <div className="mx-4 mb-3">
              <div>
                <h6 className="mt-2">Tags</h6>
                {data.tags.map((cat) => (
                  <li key={cat}>{cat.name}</li>
                ))}
              </div>
            </div>
            <div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {'Author: ' + data.author.fullName}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div
          className="card-no-hover blog-content p-4 content-text-size"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
      <div className="p-2">
        <DiscussionEmbed config={disqusConfig} />
      </div>
    </Layout>
  ) : (
    <Loading />
  );
}
