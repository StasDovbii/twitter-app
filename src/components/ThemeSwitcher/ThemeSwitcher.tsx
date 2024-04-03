import React, { useContext } from 'react';
import styles from './ThemeSwitcher.module.scss';
import classNames from 'classnames';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const { isLight, toggleTheme } = useContext(ThemeContext);
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={!isLight} onChange={toggleTheme} />
      <span className={classNames(styles.slider, styles.round)} />
    </label>
  );
};

export default ThemeSwitcher;
