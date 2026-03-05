import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { menuData } from '../data/MenuData';
import { Button } from './Button';

const Header = () => {
  const { t } = useTranslation();
  const { languages, language, changeLanguage } = useI18next();

  const orderedLangs = ['pt', 'es', 'en'].filter((lng) => languages.includes(lng));

  return (
    <Nav>
      <NavLink to="/">{t('nav.brand')}</NavLink>
      <Bars />
      <NavMenu>
        {menuData.map((item, index) => (
          <NavLink to={item.link} key={index}>
            {t(`nav.${item.translationKey}`)}
          </NavLink>
        ))}
      </NavMenu>
      <RightSide>
        <LangSwitcher>
          {orderedLangs.map((lng) => (
            <LangButton
              key={lng}
              type="button"
              aria-label={`Switch language to ${lng}`}
              $active={lng === language}
              onClick={() => changeLanguage(lng)}
            >
              {lng.toUpperCase()}
            </LangButton>
          ))}
        </LangSwitcher>
        <NavBtn>
          <Button primary round to="/trips">
            {t('hero.cta')}
          </Button>
        </NavBtn>
      </RightSide>
    </Nav>
  );
};

const Nav = styled.nav`
  background: transparent;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1300px) / 2);
  z-index: 100;
  position: relative;
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LangSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LangButton = styled.button<{ $active: boolean }>`
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? '#f26a2e' : '#fff')};
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;

  &:hover {
    color: #f26a2e;
  }
`;

export default Header;
