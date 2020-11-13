import matter from 'gray-matter';
import marked from 'marked';
import yaml from 'js-yaml';

export async function getAllContent() {
  const context = require.context('../../content', false, /\.yaml$/);
  const contents = [];
  for (const key of context.keys()) {
    const contents = key.slice(2);
    const meta = matter(content.default);
    contents.push({
      slug: contents.replace('.yaml', ''),
      title: meta.data.title,
    });
  }
  return contents;
}

export async function getConfig() {
  const config = await import(`../../config.yml`);
  return yaml.safeLoad(config.default);
}
