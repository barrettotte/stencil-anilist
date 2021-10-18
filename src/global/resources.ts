import { Env } from '@stencil/core';

const resources = {
  dev: {
    base: 'http://127.0.0.1:3000',
  },
  prod: {
    base: 'https://graphql.anilist.co',
  },
};

export const ANILIST_API = resources[Env.apiEnv]['base'];
export const ANILIST_LOGO = 'https://anilist.co/img/icons/icon.svg';
