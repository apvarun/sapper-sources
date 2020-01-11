import pkg from './package.json';

export default [
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: 'src/main.js',
    external: [
      'front-matter',
      'marked',
      'reading-time',
      'uuid/v5',
      'fs',
      'path',
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
