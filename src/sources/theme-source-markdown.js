import marked from 'marked';
import fm from 'front-matter';
import { getFilesOfType } from '../utils';

const DEFAULT_DIR = '/content/';

const transformSlug = text =>
  text
    .replace(/[^0-9A-z ]/gi, '')
    .replace(' ', '-')
    .toLowerCase();

const processFile = ({ path, content }) => {
  const ParsedMarkdown = fm(content);
  const frontmatter = ParsedMarkdown.attributes;
  const contentHtml = marked(ParsedMarkdown.body);

  return {
    path,
    frontmatter,
    contentHtml,
    slug: transformSlug(frontmatter.title),
  };
};

const getFileContent = (contentPath = DEFAULT_DIR) => {
  const files = getFilesOfType(contentPath);

  return files.map(processFile);
};

const markdownSource = options => {
  const { contentPath } = options;
  let contents = getFileContent(contentPath);

  return contents;
};

export default markdownSource;
