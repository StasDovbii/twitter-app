import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import CustomInput from '../../components/CustomInput/CustomInput';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      // imitation api interaction with 500ms delay
      try {
        const isLoggedIn = await new Promise((resolve) =>
          setTimeout(() => {
            const isLoggedIn = localStorage.getItem('username');
            resolve(isLoggedIn);
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

  const isUsernameValid = useMemo(() => {
    return username;
  }, [username]);

  const handleChangeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.currentTarget.value;
    setUsername(newUsername);
  }, []);

  const handleLogin = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();

      localStorage.setItem('username', username);
      navigate('/home');
    },
    [username],
  );

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <div>
      <span>Enter a username</span>
      <form onSubmit={handleLogin}>
        <CustomInput text={username} onChange={handleChangeUsername} />
        <CustomButton label="Log in" onClick={handleLogin} disabled={!isUsernameValid} />
      </form>
    </div>
  );
};

export default LoginPage;
