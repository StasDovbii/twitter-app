import { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './SettingsPage.module.scss';
import classNames from 'classnames';

interface IUserInfo {
  username: string;
  id: string;
}

const SettingsPage = () => {
  const userInfo: IUserInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo') || ''), []);

  const { isLight } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={classNames(styles.title, { [styles.darkTheme]: !isLight })}>Settings</span>
      <div className={styles.settings}>
        <div className={classNames(styles.settingsInfo, { [styles.darkTheme]: !isLight })}>
          <span className={styles.settingName}>Nickname:</span>
          <span className={styles.settingInfo}>{userInfo.username}</span>
        </div>
        <div className={classNames(styles.settingsInfo, { [styles.darkTheme]: !isLight })}>
          <span className={styles.settingName}>User ID:</span>
          <span className={styles.settingInfo}>{userInfo.id}</span>
        </div>
      </div>
      <CustomButton label="Log out" onClick={handleLogout} />
    </div>
  );
};

export default SettingsPage;
