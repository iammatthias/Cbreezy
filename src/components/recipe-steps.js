import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { MDXGlobalComponents } from './mdx';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;

  @media (min-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr 2fr;
  }
`;

const RecipeSteps = ({ ingredients, steps }) => {
  return (
    <Box my={4}>
      <Grid>
        <div>
          <MDXProvider
            components={{
              ...MDXGlobalComponents
            }}
          >
            <MDXRenderer>{ingredients.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </div>

        <div>
          <MDXProvider
            components={{
              ...MDXGlobalComponents
            }}
          >
            <MDXRenderer>{steps.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </Grid>
    </Box>
  );
};

export default RecipeSteps;
