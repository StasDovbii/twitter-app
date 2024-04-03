import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './SettingsPage.module.scss';

interface IUserInfo {
  username: string;
  id: string;
}

const SettingsPage = () => {
  const userInfo: IUserInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo') || ''), []);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Settings</span>
      <div className={styles.settings}>
        <div className={styles.settingsInfo}>
          <span className={styles.settingName}>Nickname:</span>
          <span className={styles.settingInfo}>{userInfo.username}</span>
        </div>
        <div className={styles.settingsInfo}>
          <span className={styles.settingName}>User ID:</span>
          <span className={styles.settingInfo}>{userInfo.id}</span>
        </div>
      </div>
      <CustomButton label="Log out" onClick={handleLogout} />
    </div>
  );
};

export default SettingsPage;
