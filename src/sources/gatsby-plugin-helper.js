import { createNodeId } from '../utils';

async function gatsbyPluginHelper(plugin, options) {
  const pluginPath = require.resolve(plugin);
  const controller = await import(pluginPath);

  const contents = [];
  const createNode = data => contents.push(data);

  await controller.sourceNodes(
    {
      actions: { createNode },
      createNodeId,
    },
    options,
  );

  return contents;
}

export default function gatsbyPlugin(plugin) {
  if (!plugin) {
    return null;
  }

  return async options => {
    return await gatsbyPluginHelper(plugin, options);
  };
}
