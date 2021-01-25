import React from 'react';
import { graphql } from 'gatsby';
import BeerList from '../components/BeerList';
import SEO from '../components/SEO';

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} beers in stock`} />
      <h2 className="center">
        We have {data.beers.nodes.length} beers available! Dine in only!
      </h2>
      <BeerList beers={beers} />
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;
