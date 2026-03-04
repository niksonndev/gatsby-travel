import path from 'path';
import type { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/using-dsg',
    component: path.resolve(__dirname, './src/templates/using-dsg.tsx'),
    context: {},
    defer: true,
  });
};
