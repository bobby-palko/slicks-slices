import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // Get a template for this page (JSX)
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // Query allPizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // Loop over each pizza and creat a page for each pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // the URL of the new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // get the template
  // since the page will look like our pizzas.js page, we'll use that to render out the "subgroup" of pizzas when the topping is selected
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // query al the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // create pages for the toppings
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO regex for topping
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // loop over each one
  for (const beer of beers) {
    // create some metadata
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      chidren: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  await Promise.all([
    // fetch a list of beers and source them into our gatsby api
    fetchBeersAndTurnIntoNodes(params),
  ]);
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `slicemaster/${slicemaster.slug.current}`,
      component: slicemasterTemplate,
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });
  // figure out how many pages there are based on the number of slicemasters and number per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // loop from 1 to n and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        skip: i * pageSize, // how many people to skip when creating the page - 0 for the first (0*4), 4 for the second page (1*4), etc..
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    // Pizzas
    turnPizzasIntoPages(params),
    // Toppings
    turnToppingsIntoPages(params),
    // slicemasters
    turnSlicemastersIntoPages(params),
  ]);
}
