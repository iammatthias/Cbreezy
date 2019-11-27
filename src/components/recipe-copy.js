import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { MDXGlobalComponents } from './mdx';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns:
    1.2rem minmax(1.2rem, 1fr) minmax(auto, 1fr) minmax(
      auto,
      calc(76.4vw - 2rem)
    )
    minmax(auto, 1fr)
    minmax(1.2rem, 1fr)
    1.2rem;
  grid-gap: 0;
  article,
  div,
  p,
  i,
  a,
  ul,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  blockquote {
    grid-column: 1 / 8;
  }

  p,
  li {
    margin: 0 0 2rem;
  }

  @media (min-width: ${props => props.theme.breakpoints[1]}) {
    article,
    div,
    p,
    i,
    a,
    ul,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    blockquote {
      grid-column: 4 / 5;
    }
  }
`;

const RecipeCopy = ({ copy }) => {
  return (
    <Box my={4}>
      <Grid>
        <MDXProvider
          components={{
            ...MDXGlobalComponents
          }}
        >
          <MDXRenderer>{copy.childMdx.body}</MDXRenderer>
        </MDXProvider>
      </Grid>
    </Box>
  );
};

export default RecipeCopy;
