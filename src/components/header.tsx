import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { menuData } from '../data/MenuData';
import { Button } from './Button';
import LiveRegion from './LiveRegion';

const langNames: Record<string, string> = { pt: 'langPt', es: 'langEs', en: 'langEn' };
const langSelectKeys: Record<string, string> = {
  pt: 'selectLangPt',
  es: 'selectLangEs',
  en: 'selectLangEn',
};

const Header = () => {
  const { t } = useTranslation();
  const { languages, language, changeLanguage } = useI18next();
  const [liveMessage, setLiveMessage] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navMenuRef = React.useRef<HTMLDivElement>(null);

  const orderedLangs = ['pt', 'es', 'en'].filter((lng) => languages.includes(lng));

  React.useEffect(() => {
    if (menuOpen) {
      const firstLink = navMenuRef.current?.querySelector<HTMLAnchorElement>('a');
      firstLink?.focus();
    }
  }, [menuOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    const langLabel = t(`a11y.${langNames[lng]}`);
    setLiveMessage(t('a11y.languageChanged', { lng: langLabel }));
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <Nav aria-label='Main navigation'>
      <NavLink to='/' onClick={closeMenu}>
        {t('nav.brand')}
      </NavLink>
      <MenuButton
        type='button'
        aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
        aria-expanded={menuOpen}
        aria-controls='nav-menu'
        onClick={() => setMenuOpen((prev) => !prev)}>
        <Bars aria-hidden='true' />
      </MenuButton>
      <NavMenu id='nav-menu' ref={navMenuRef} $isOpen={menuOpen} role='menu'>
        {menuData.map((item, index) => (
          <NavLink to={item.link} key={index} role='menuitem' onClick={closeMenu}>
            {t(`nav.${item.translationKey}`)}
          </NavLink>
        ))}
      </NavMenu>
      <RightSide>
        <LangSwitcher role='group' aria-label='Language selector'>
          {orderedLangs.map((lng) => (
            <LangButton
              key={lng}
              type='button'
              aria-label={t(`a11y.${langSelectKeys[lng]}`)}
              aria-pressed={lng === language}
              $active={lng === language}
              onClick={() => handleLanguageChange(lng)}>
              {lng.toUpperCase()}
            </LangButton>
          ))}
        </LangSwitcher>
        <LiveRegion message={liveMessage} politeness='polite' />
        <NavBtn>
          <Button primary round to='/trips'>
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
  pointer-events: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 75%);

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavMenu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.95);
    padding: 1rem;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
