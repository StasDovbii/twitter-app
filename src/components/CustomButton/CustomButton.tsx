import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './CustomButton.module.scss';
import CustomSpinner from '../CustomSpinner/CustomSpinner';

type CustomButtonProps = {
  className?: string;
  innerStyles?: Object;
  label?: string;
  disabled?: boolean;
  tooltipText?: string;
  loading?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label = '',
  innerStyles = {},
  className = '',
  disabled = false,
  tooltipText = '',
  loading = false,
  onClick,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      className={classNames(styles.wrapper, className, { [styles.disabled]: disabled || loading })}
      style={innerStyles}
    >
      {loading ? (
        <CustomSpinner />
      ) : (
        <button className={styles.button} onClick={onClick}>
          {label}
        </button>
      )}

      {isHover && disabled && tooltipText && <div className={styles.tooltip}>{tooltipText}</div>}
    </div>
  );
};

export default CustomButton;
