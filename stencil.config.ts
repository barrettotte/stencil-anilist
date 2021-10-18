import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

const isDev = process.argv && process.argv.indexOf('--dev') > -1;

export const config: Config = {
  namespace: 'anilist-stencil',
  env: {
    apiEnv: isDev ? 'dev' : 'prod',
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      dir: 'docs',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass(),
  ],
};
