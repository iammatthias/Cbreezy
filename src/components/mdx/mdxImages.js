import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

const Wrapper = styled(Box)`
  grid-column: 1 / 8 !important;
  margin: 0 0 2rem;
`;
const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${props => props.theme.space[4]}px;
  img {
    width: 100%;
  }
`;

const MdxImages = ({ children }) => {
  return (
    <Wrapper my={0}>
      <Grid>{children}</Grid>
    </Wrapper>
  );
};

export default MdxImages;
