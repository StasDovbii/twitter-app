import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavigationComponent.module.scss';
import classNames from 'classnames';
import { ThemeContext } from '../../context/ThemeContext';

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
    </div>
  );
};

export default NavigationComponent;
