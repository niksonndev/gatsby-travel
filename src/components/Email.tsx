import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Button } from './Button';
import { StaticImage } from 'gatsby-plugin-image';
import LiveRegion from './LiveRegion';

const Email = () => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const errorId = 'email-error';
  const inputId = 'email';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('email') as HTMLInputElement;
    const value = input?.value?.trim();
    if (!value) {
      setErrorMessage(t('a11y.newsletterError'));
      setStatus('error');
      return;
    }
    setErrorMessage('');
    setStatus('success');
  };

  return (
    <EmailContainer>
      <StaticImage
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        src="../assets/images/email2.jpg"
        alt=""
      />
      <EmailContent>
        <h2>{t('email.title')}</h2>
        <p>{t('email.description')}</p>
        <form action="#" onSubmit={handleSubmit} noValidate>
          <EmailFormWrap>
            <label htmlFor={inputId}>{t('email.placeholder')}</label>
            <input
              type="email"
              id={inputId}
              name="email"
              placeholder={t('email.placeholder')}
              aria-describedby={status === 'error' ? errorId : undefined}
              aria-invalid={status === 'error'}
              autoComplete="email"
            />
            {status === 'error' && (
              <span id={errorId} className="sr-only" role="alert">
                {errorMessage}
              </span>
            )}
            {status !== 'idle' && (
              <LiveRegion
                message={status === 'success' ? t('a11y.newsletterSuccess') : errorMessage}
                politeness={status === 'error' ? 'assertive' : 'polite'}
              />
            )}
            <SubmitButton as="button" type="submit" round primary>
              {t('email.cta')}
            </SubmitButton>
          </EmailFormWrap>
        </form>
      </EmailContent>
    </EmailContainer>
  );
};

export default Email;

const EmailContainer = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.5) 35%,
    rgba(0, 0, 0, 0.1) 100%
  );
  height: 450px;
  width: 100%;
  padding: 5rem calc((100vw - 1300px) / 2);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const EmailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: clamp(1rem, 5vw, 3rem);
    padding: 0 1rem;
  }

  p {
    text-align: center;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    padding: 0 1rem;
    margin-bottom: 2rem;
  }
`;

const EmailFormWrap = styled.div`
  input {
    padding: 1rem 1.5rem;
    width: 350px;
    height: 48px;
    border-radius: 50px;
    border: none;
    margin-right: 1rem;
  }

  input:focus-visible {
    outline: 2px solid #077bf1;
    outline-offset: 2px;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;

    input {
      margin-bottom: 1rem;
      width: 100%;
      margin-right: 0;
    }
  }
`;

const SubmitButton = styled(Button)`
  height: 48px;

  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 350px;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
    min-width: 250px;
  }
`;
