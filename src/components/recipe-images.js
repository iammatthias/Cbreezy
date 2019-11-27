import React, { useEffect } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import Img from 'gatsby-image';

import AspectRatioBox from './aspect-ratio-box';

import mediumZoom from 'medium-zoom';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${props => props.theme.space[4]}px;
`;

const RecipeContent = ({ photos }) => {
  useEffect(() => {
    (async function() {
      try {
        mediumZoom('picture img', {
          margin: 64,
          background: 'var(--400)',
          zIndex: '10'
        });
      } catch (e) {
        console.error(e);
      }
    })();
  });
  return (
    <Box my={4}>
      <Grid>
        {photos.length ? (
          photos.map((photo, index) => {
            const withFixedAspectRatio = {
              ...photo.fluid,
              aspectRatio: 8 / 5
            };
            return (
              <AspectRatioBox key={index} ratio={8 / 5}>
                <Img fluid={withFixedAspectRatio} />
              </AspectRatioBox>
            );
          })
        ) : (
          <>
            <AspectRatioBox ratio={8 / 5} />
            <AspectRatioBox ratio={8 / 5} />
            <AspectRatioBox ratio={8 / 5} />
            <AspectRatioBox ratio={8 / 5} />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default RecipeContent;
