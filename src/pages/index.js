import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Box } from 'rebass';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import { Description } from '../components/recipe-header';
import Layout from '../components/layout';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.space[3]}px;
  border-top: 2px solid var(--accent);
  padding-top: 16px;
  a {
    padding-right: 16px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      right: 0;
      z-index: 100;
      top: 0;
      width: 2px;
      height: 88.5%;
      background: var(--accent);
    }
  }
`;

const RecipeGridItem = ({ recipe }) => {
  return (
    <AniLink
      style={{
        textDecoration: 'none'
      }}
      fade
      to={`/recipes/${recipe.publishYear}/${recipe.publishMonth}/${recipe.publishDay}/${recipe.slug}`}
      duration={0.2}
    >
      <Box>
        <Img fluid={{ ...recipe.featuredPhoto.fluid, aspectRatio: 4 / 3 }} />

        <Box mt={3}>
          <Description>{recipe.title}</Description>
        </Box>
      </Box>
    </AniLink>
  );
};

const Home = ({ data }) => {
  const recipes = data.recipes.edges;
  return (
    <Layout>
      <Grid>
        {recipes.map(recipe => (
          <RecipeGridItem key={recipe.node.title} recipe={recipe.node} />
        ))}
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  {
    recipes: allContentfulRecipePost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          publishYear: publishDate(formatString: "YYYY")
          publishMonth: publishDate(formatString: "MMMM")
          publishDay: publishDate(formatString: "DD")
          title
          featuredPhoto {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

export default Home;
