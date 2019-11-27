import React from 'react';
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link';
import posed from 'react-pose';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import RecipeHeader from '../components/recipe-header';
import RecipeImages from '../components/recipe-images';
import RecipeCopy from '../components/recipe-copy';
import RecipeSteps from '../components/recipe-steps';
import NextRecipeHeading from '../components/next-recipe-heading';

const TRANSITION_LENGTH = 1.5;

const FadingContent = posed.div({
  exiting: { opacity: 0 }
});

const SlidingHeader = posed.div({
  exiting: {
    y: ({ element }) => {
      const navbar = document.querySelector('header');
      const navbarDimensions = navbar.getBoundingClientRect();
      const distanceToTop =
        element.getBoundingClientRect().top - navbarDimensions.height;
      return distanceToTop * -1;
    },
    transition: {
      ease: [0.59, 0.01, 0.28, 1],
      delay: 250,
      duration: TRANSITION_LENGTH * 1000 - 250
    }
  }
});

const FadingNextRecipeHeading = posed.div({
  exiting: { opacity: 0 }
});

const RecipeInner = ({ transitionStatus, recipe }) => {
  const nextRecipeUrl = `/recipes/${recipe.next.publishYear}/${recipe.next.publishMonth}/${recipe.next.publishDay}/${recipe.next.slug}`;
  const shouldTruncate = ['entering', 'entered'].includes(transitionStatus);

  const exitTransition = {
    length: TRANSITION_LENGTH,
    trigger: () => {
      if (document) {
        document.body.style.overflow = 'hidden';
      }
    }
  };

  const entryTransition = {
    delay: TRANSITION_LENGTH,
    trigger: () => {
      if (document && window) {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'visible';
      }
    }
  };

  return (
    <Layout transitionStatus={transitionStatus}>
      <FadingContent pose={transitionStatus}>
        <RecipeHeader recipe={recipe} />
        <RecipeSteps ingredients={recipe.ingredients} steps={recipe.steps} />
        <RecipeImages photos={recipe.photos} />
        <RecipeCopy copy={recipe.copy} />
      </FadingContent>
      <TransitionLink
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
        to={nextRecipeUrl}
        exit={exitTransition}
        entry={entryTransition}
      >
        <FadingNextRecipeHeading pose={transitionStatus}>
          <NextRecipeHeading />
        </FadingNextRecipeHeading>
        <SlidingHeader pose={transitionStatus}>
          <RecipeHeader recipe={recipe.next} truncated={shouldTruncate} />
        </SlidingHeader>
      </TransitionLink>
    </Layout>
  );
};

const Recipe = ({ pageContext: recipeShell, data }) => {
  const { recipe, next } = data;
  const aggregateRecipe = {
    ...recipeShell,
    ...recipe,
    next
  };

  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <RecipeInner
          transitionStatus={transitionStatus}
          recipe={aggregateRecipe}
        />
      )}
    </TransitionState>
  );
};

export const query = graphql`
  query($slug: String!, $nextSlug: String!) {
    recipe: contentfulRecipePost(slug: { eq: $slug }) {
      publishDate(formatString: "MMMM DD, YYYY")
      publishYear: publishDate(formatString: "YYYY")
      publishMonth: publishDate(formatString: "MMMM")
      publishDay: publishDate(formatString: "DD")
      description
      category {
        title
      }
      featuredPhoto {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      photos {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      steps {
        childMdx {
          body
          id
        }
      }
      ingredients {
        childMdx {
          body
          id
        }
      }
      copy {
        childMdx {
          body
          id
        }
      }
    }
    next: contentfulRecipePost(slug: { eq: $nextSlug }) {
      title
      slug
      publishDate(formatString: "MMMM DD, YYYY")
      publishYear: publishDate(formatString: "YYYY")
      publishMonth: publishDate(formatString: "MMMM")
      publishDay: publishDate(formatString: "DD")
      description
      category {
        title
      }
      featuredPhoto {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;

export default Recipe;
