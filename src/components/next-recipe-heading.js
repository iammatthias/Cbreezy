import React from 'react';
import { Box, Text } from 'rebass';
import styled from 'styled-components';

const Heading = styled(Text)`
  color: var(--secondary);
  font-size: ${props => props.theme.fontSizes[3]}px;
  font-weight: normal;
`;

const Rule = styled.hr`
  border: 1px solid var(--base400);
`;

const NextRecipeHeading = () => (
  <Box mb={5}>
    <Rule />
    <Heading pt={3}>Next Recipe</Heading>
  </Box>
);

export default NextRecipeHeading;
