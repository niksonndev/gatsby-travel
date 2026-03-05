import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import Layout from '../components/layout';
import Seo from '../components/seo';

const ContactPage = () => (
  <Layout>
    <ContactWrapper>
      <ContactHeader>
        <Title>Contact Us</Title>
        <Subtitle>We&apos;d love to hear from you. Get in touch with our team.</Subtitle>
      </ContactHeader>

      <ContactGrid>
        <ContactCard>
          <IconWrap>
            <MdEmail size={32} />
          </IconWrap>
          <CardTitle>Email</CardTitle>
          <CardText>Have a question? Send us an email.</CardText>
          <ContactLink href="mailto:contact@explorix.com">contact@explorix.com</ContactLink>
        </ContactCard>

        <ContactCard>
          <IconWrap>
            <MdPhone size={32} />
          </IconWrap>
          <CardTitle>Phone</CardTitle>
          <CardText>Mon–Fri, 9am–6pm (local time)</CardText>
          <ContactLink href="tel:+5511999999999">+55 11 99999-9999</ContactLink>
        </ContactCard>

        <ContactCard>
          <IconWrap>
            <MdLocationOn size={32} />
          </IconWrap>
          <CardTitle>Office</CardTitle>
          <CardText>Visit us or send mail.</CardText>
          <Address>
            Av. Paulista, 1000<br />
            São Paulo, SP 01310-100<br />
            Brazil
          </Address>
        </ContactCard>
      </ContactGrid>

      <BackLink to="/">← Back to home</BackLink>
    </ContactWrapper>
  </Layout>
);

export const Head = () => <Seo title="Contact" />;

export default ContactPage;

const ContactWrapper = styled.main`
  min-height: calc(100vh - 80px);
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactHeader = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #0c0c0c;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #3d3d4e;
  max-width: 500px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ContactCard = styled.div`
  background: #fafafb;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
`;

const IconWrap = styled.div`
  color: #f26a2e;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: #0c0c0c;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.9375rem;
  color: #3d3d4e;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ContactLink = styled.a`
  color: #077bf1;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Address = styled.p`
  font-size: 0.9375rem;
  color: #3d3d4e;
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: #077bf1;
  text-decoration: none;
  font-weight: 500;
  margin-top: 2rem;

  &:hover {
    text-decoration: underline;
  }
`;
