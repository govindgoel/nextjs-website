import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TitleBar from '../components/theme/titleBar';
import BlogCard from '../components/blog/blogCard';
import dataFetch from '../utils/dataFetch';
import ReactLoading from 'react-loading';

const blogsQuery = ` {
  blogs{
    title
    slug
    author{
      firstName
    }
    date
    cover
    tags{
      name
    }
    featured 
    description
  }
}`;
const News = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const fetchData = async () => await dataFetch({ query: blogsQuery });
  useEffect(() => {
    !isLoading &&
      fetchData().then((r) => {
        setData(r.data.blogs);
        setLoading(true);
      });
  }, [data]);

  const filter = data.filter((blog) => {
    let queryFlag = 1;
    let filterFlag = 1;

    if (query !== '') {
      queryFlag = 0;
      if (
        blog.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        blog.description.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
        queryFlag = 1;
    }
    if (filterType !== 'all') {
      filterFlag = 0;
      if (blog.category.name === filterType) filterFlag = 1;
    }
    if (queryFlag && filterFlag) return 1;
  });

  const Articles = [];
  const Featured = [];
  filter.map((blog) => {
    blog.featured
      ? Featured.push(
          <div key={blog.title} className="col-sm-12 col-md-6 p-3">
            <BlogCard article={blog} featured={blog.featured} />
          </div>
        )
      : Articles.push(
          <div key={blog.title} className="col-sm-12 col-md-6 p-3">
            <BlogCard article={blog} featured={blog.featured} />
          </div>
        );
  });
  return (
    <Layout>
      <SEO title="Blog" />
      <TitleBar title="Blog" />
      <div className="row m-0 p-1">
        <div className="col-md-8 col-lg-9 p-2 order-2 order-md-1">
          <div className="row m-0">
            {isLoading ? (
              <React.Fragment>
                {Featured}
                {Articles}
              </React.Fragment>
            ) : (
              <ReactLoading type="spinningBubbles" color="#000" />
            )}
          </div>
        </div>
        <div className="col-md-4 col-lg-3 order-md-2 order-1 px-2 py-4">
          <div
            className="card-no-hover p-4 position-sticky"
            style={{ top: '1rem' }}
            id="filter-card"
          >
            <h5 className="my-3">Search</h5>
            <div className="mx-2">
              <div>Search by Name</div>
              <input
                id="search-box"
                type="text"
                className="form w-100 p-2 mt-2"
                placeholder="Search Here"
                onChange={(e) => setQuery(e.target.value)}
              />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
