import React from 'react';
import styles from './CustomInput.module.scss';
import classNames from 'classnames';

interface CustomInputProps {
  placeholder?: string;
  text: string;
  innerStyles?: Object;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder = 'Enter text...',
  text,
  innerStyles = {},
  className = '',
  disabled = false,
  maxLength = 200,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      value={text}
      style={innerStyles}
      maxLength={maxLength}
      className={classNames(styles.input, className, { [styles.disabled]: disabled })}
      onChange={onChange}
    />
  );
};

export default CustomInput;
