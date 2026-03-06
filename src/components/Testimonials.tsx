import React from 'react';
import { GatsbyImage, getImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaRegLightbulb } from 'react-icons/fa';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface TestimonialsQuery {
  allFile: {
    nodes: Array<{
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      } | null;
    }>;
  };
}

const query = graphql`
  query TestimonialsQuery {
    allFile(
      filter: {
        ext: { regex: "/(jpg)|(png)|(jpeg)/" }
        name: { in: ["testimonial-1", "testimonial-2"] }
      }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`;

const Testimonials = () => {
  const data = useStaticQuery<TestimonialsQuery>(query);
  const testimonials = data.allFile.nodes;
  const { t } = useTranslation();

  return (
    <TestimonialsContainer>
      <SectionTitle as="h2">{t('testimonials.title')}</SectionTitle>
      <Description as="p">{t('testimonials.subtitle')}</Description>
      <ContentWrapper>
        <ColumnOne>
          <Testimonial>
            <IoMdCheckmarkCircleOutline
              aria-hidden="true"
              css={`
                color: #3fffa8;
                font-size: 2rem;
                margin-bottom: 1rem;
              `}
            />
            <h3>Anna Becker</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus labore natus
              reprehenderit perspiciatis facilis in odit impedit, harum minima, inventore
              perferendis, corrupti dolores rerum? Accusantium rerum animi amet hic voluptas.
            </p>
          </Testimonial>
          <Testimonial>
            <FaRegLightbulb
              aria-hidden="true"
              css={`
                color: #f9b19b;
                font-size: 2rem;
                margin-bottom: 1rem;
              `}
            />
            <h3>Sarah Kin</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus labore natus
              reprehenderit perspiciatis facilis in odit impedit, harum minima, inventore
              perferendis, corrupti dolores rerum? Accusantium rerum animi amet hic voluptas.
            </p>
          </Testimonial>
        </ColumnOne>
        <ColumnTwo>
          {testimonials.map((image, index) => {
            const pathToImage = getImage(image as { childImageSharp: { gatsbyImageData: IGatsbyImageData } });
            return <Images image={pathToImage!} key={index} alt="" />;
          })}
        </ColumnTwo>
      </ContentWrapper>
    </TestimonialsContainer>
  );
};

export default Testimonials;

const TestimonialsContainer = styled.div`
  width: 100%;
  background: #fcfcfc;
  color: #000;
  padding: 5rem calc((100vw - 1300px) / 2);
  height: 100%;
`;

const SectionTitle = styled.h2`
  color: #077bf1;
  font-size: 1rem;
  padding-left: 2rem;
  margin-bottom: 0.75rem;
  font-weight: bold;
`;

const Description = styled.p`
  text-align: start;
  padding-left: 2rem;
  margin-bottom: 4rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnOne = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const Testimonial = styled.div`
  padding-top: 1rem;
  padding-right: 2rem;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-style: italic;
  }

  p {
    color: #3b3b3b;
  }
`;

const ColumnTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  grid-gap: 10px;

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Images = styled(GatsbyImage)`
  border-radius: 10px;
  height: 100%;
`;
