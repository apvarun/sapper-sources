export default function() {
  if (!config.plugin) {
    console.error('Plugin not defined');
    return;
  }
  const response = config.plugin(config.options);

  return Promise.resolve(response).then(contents => ({
    contents,
    ...config.options,
  }));
}

export { default as gatsbyPlugin } from './sources/gatsby-plugin-helper';
export { default as markdownSource } from './sources/theme-source-markdown';
