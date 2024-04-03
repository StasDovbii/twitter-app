import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavigationComponent.module.scss';
import classNames from 'classnames';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const NavigationComponent = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleHomeClick = (): void => {
    navigate('/home');
  };

  const handleSettingsClick = (): void => {
    navigate('/settings');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onClick={handleHomeClick}>
        <div className={styles.buttonInfo}>
          <span>Home</span>
          <div className={classNames(styles.buttonLine, { [styles.buttonLineSelected]: pathname.includes('home') })} />
        </div>
      </div>
      <div className={styles.button} onClick={handleSettingsClick}>
        <div className={styles.buttonInfo}>
          <span>Settings</span>
          <div className={classNames(styles.buttonLine, { [styles.buttonLineSelected]: pathname.includes('settings') })} />
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default NavigationComponent;
