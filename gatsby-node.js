const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const recipeTemplate = path.resolve(`./src/templates/recipe.js`);

  const query = `{
    recipes:allContentfulRecipePost {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          publishYear: publishDate(formatString: "YYYY")
          publishMonth: publishDate(formatString: "MMMM")
          publishDay: publishDate(formatString: "DD")
        }
        next {
          slug
        }
      }
    }
  }`;

  const result = await graphql(query);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const recipes = result.data.recipes.edges;

  const createRecipePage = recipe => {
    const next = recipe.next || recipes[0].node;
    createPage({
      path: `/recipes/${recipe.node.publishYear}/${recipe.node.publishMonth}/${recipe.node.publishDay}/${recipe.node.slug}`,
      component: recipeTemplate,
      context: {
        nextSlug: next.slug,
        ...recipe.node
      }
    });
  };

  recipes.forEach(createRecipePage);
};
