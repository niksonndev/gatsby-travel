import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <FooterLinksWrapper>
        <FooterDesc>
          <h2>{t('a11y.footer.explorix')}</h2>
          <p>{t('a11y.footer.tagline')}</p>
        </FooterDesc>
        <FooterLinkItems>
          <FooterLinkTitle as="h3">{t('a11y.footer.contactUs')}</FooterLinkTitle>
          <FooterLink to="/contact">{t('nav.contact')}</FooterLink>
          <FooterLink to="/">Support</FooterLink>
          <FooterLink to="/">Destinations</FooterLink>
          <FooterLink to="/">Sponsorships</FooterLink>
        </FooterLinkItems>
      </FooterLinksWrapper>
      <FooterLinksWrapper>
        <FooterLinkItems>
          <FooterLinkTitle as="h3">{t('a11y.footer.videos')}</FooterLinkTitle>
          <FooterLink to="/about">Submit Video</FooterLink>
          <FooterLink to="/">Ambassadors</FooterLink>
          <FooterLink to="/">Agency</FooterLink>
          <FooterLink to="/">Influencer</FooterLink>
        </FooterLinkItems>
        <FooterLinkItems>
          <FooterLinkTitle as="h3">{t('a11y.footer.socialMedia')}</FooterLinkTitle>
          <FooterLink to="/about">Instagram</FooterLink>
          <FooterLink to="/">Facebook</FooterLink>
          <FooterLink to="/">YouTube</FooterLink>
          <FooterLink to="/">Twitter</FooterLink>
        </FooterLinkItems>
      </FooterLinksWrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  padding: 5rem calc((100vw - 1100px) / 2);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #000;
  background: #fafafb;
`;

const FooterDesc = styled.div`
  padding: 0 2rem;

  h2 {
    margin-bottom: 3rem;
    color: #f26a2e;
    font-size: inherit;
    font-weight: bold;
  }

  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

const FooterLinksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 2rem;

  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;

const FooterLinkTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 16px;
  font-weight: bold;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: #3d3d4e;

  &:hover {
    color: #f26a2e;
    transition: 0.3s ease-out;
  }
`;
