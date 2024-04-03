import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import CustomInput from '../../components/CustomInput/CustomInput';
import styles from './LoginPage.module.scss';
import { v4 as uuidv4 } from 'uuid';

const MAX_USERNAME_SYMBOLS = 20;

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const isUsernameValid: boolean = useMemo(() => Boolean(username.match(/^[a-z0-9_]{1,20}$/)), [username]);

  const tooltipText: string = useMemo(() => {
    if (username.length && !isUsernameValid) {
      return 'Enter a valid nickname';
    }

    return '';
  }, [isUsernameValid]);

  const handleChangeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.currentTarget.value.trim();
    setUsername(newUsername);
  }, []);

  const handleLogin = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (!isUsernameValid) {
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify({ username, id: uuidv4() }));
      navigate('/home');
    },
    [username],
  );

  useEffect(() => {
    const checkUser = async () => {
      // imitation api interaction with 500ms delay
      try {
        const isLoggedIn = await new Promise((resolve) =>
          setTimeout(() => {
            const isUserLoggedIn = localStorage.getItem('userInfo');
            resolve(isUserLoggedIn);
          }, 500),
        );

        if (isLoggedIn) {
          navigate('/home');
        }
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    checkUser();
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <CustomSpinner className={styles.spinner} />
      ) : (
        <>
          <span className={styles.title}>Login page</span>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <span>Enter a nickname:</span>
            <CustomInput text={username} onChange={handleChangeUsername} maxLength={MAX_USERNAME_SYMBOLS} />
            <CustomButton label="Log in" onClick={handleLogin} disabled={!isUsernameValid} tooltipText={tooltipText} />
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
