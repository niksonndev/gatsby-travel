import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import { Button } from './Button';
import { ImLocation } from 'react-icons/im';

interface TripsNode {
  alt: string;
  button: string;
  name: string;
  img: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    } | null;
  };
}

interface TripsQuery {
  allTripsJson: {
    nodes: TripsNode[];
  };
}

const query = graphql`
  query TripsQuery {
    allTripsJson {
      nodes {
        alt
        button
        name
        img {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`;

const Trips = ({ heading }: { heading: string }) => {
  const data = useStaticQuery<TripsQuery>(query);
  const trips = data.allTripsJson.nodes;

  return (
    <ProductsContainer>
      <ProductsHeading as="h2">{heading}</ProductsHeading>
      <ProductsWrapper>
        {trips.map((trip, index) => {
          const { alt, button, name, img } = trip;
          const pathToImage = getImage(img as { childImageSharp: { gatsbyImageData: IGatsbyImageData } });
          return (
            <ProductCard key={index}>
              <ProductImg image={pathToImage!} alt={alt || name} />
              <ProductInfo>
                <TextWrap>
                  <ImLocation aria-hidden="true" />
                  <ProductTitle>{name}</ProductTitle>
                </TextWrap>
                <Button
                  to="/trips"
                  primary
                  round
                  css={`
                    position: absolute;
                    top: 420px;
                    font-size: 14px;
                  `}
                >
                  {button}
                </Button>
              </ProductInfo>
            </ProductCard>
          );
        })}
      </ProductsWrapper>
    </ProductsContainer>
  );
};

export default Trips;

const ProductsContainer = styled.div`
  min-height: 100vh;
  padding: 5rem calc((100vw - 1300px) / 2);
  color: #fff;
`;

const ProductsHeading = styled.h2`
  font-size: clamp(1.2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 5rem;
  color: #000;
  font-weight: bold;
`;

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  justify-items: center;
  padding: 0 2rem;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  line-height: 2;
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 10px;
  transition: 0.2s ease;
`;

const ProductImg = styled(GatsbyImage)`
  height: 100%;
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  filter: brightness(70%);
  transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    filter: brightness(100%);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem;

  @media screen and (max-width: 280px) {
    padding: 0 1rem;
  }
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 375px;
`;

const ProductTitle = styled.div`
  font-weight: 400;
  font-size: 1rem;
  margin-left: 0.5rem;
`;
