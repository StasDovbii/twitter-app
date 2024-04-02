import React from 'react';
import styles from './CustomInput.module.scss';
import classNames from 'classnames';

type CustomInputProps = {
  placeholder?: string;
  text: string;
  innerStyles?: Object;
  className?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder = 'Enter text...',
  text,
  innerStyles = {},
  className = '',
  disabled = false,
  onChange,
}) => {
  return <input className={classNames(styles.textarea, { [styles.disabled]: disabled })} onChange={onChange} />;
};

export default CustomInput;
