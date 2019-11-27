import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Box, Heading, Image } from 'rebass';
import posed from 'react-pose';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import '../style/reset.css';

import Logo from './logo.png';

const theme = {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    sans: 'system-ui, sans-serif'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 46],
  colors: {
    grey: '#999',
    black: '#1a1a1a',
    red: '#e61428'
  }
};

export const Title = styled(Heading)`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.sans};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes[5]}px;
  margin: 0;
  @media (min-width: ${props => props.theme.breakpoints[1]}) {
    font-size: ${props => props.theme.fontSizes[6]}px;
  }
`;

const FadingHeader = posed.header({
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  entering: { opacity: 1 },
  entered: { opacity: 1 }
});

const Layout = ({ children, transitionStatus }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <FadingHeader pose={transitionStatus}>
        <Box px={[3, 5]} py={4}>
          <AniLink
            style={{ textDecoration: 'none' }}
            fade
            to={`/`}
            duration={0.2}
          >
            <Image src={Logo} alt="C Breezy" height={48} />
          </AniLink>
        </Box>
      </FadingHeader>
      <Box as="main" px={[3, 5]}>
        {children}
      </Box>
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;
