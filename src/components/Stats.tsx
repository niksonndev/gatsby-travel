import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { StatsData } from '../data/StatsData';

const Stats = () => {
  const { t } = useTranslation();

  return (
    <StatsContainer>
      <Heading>{t('stats.heading')}</Heading>
      <Wrapper>
        {StatsData.map((item, index) => (
          <StatsBox key={index}>
            <Icon>{item.icon}</Icon>
            <Title>{t(item.titleKey)}</Title>
            <p>{t(item.descKey)}</p>
          </StatsBox>
        ))}
      </Wrapper>
    </StatsContainer>
  );
};

export default Stats;

const StatsContainer = styled.div`
  max-width: 1280px;
  background: #fff;
  color: #000;
  margin: 0 auto;
  padding: 0 32px;
`;

const Heading = styled.h1`
  text-align: start;
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: 3rem;
  padding: 0 2rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatsBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin-bottom: 0.5rem;
`;
