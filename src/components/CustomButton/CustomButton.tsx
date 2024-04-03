import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './CustomButton.module.scss';
import CustomSpinner from '../CustomSpinner/CustomSpinner';

interface CustomButtonProps {
  className?: string;
  innerStyles?: Object;
  label?: string;
  disabled?: boolean;
  tooltipText?: string;
  loading?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label = '',
  innerStyles = {},
  className = '',
  disabled = false,
  tooltipText = '',
  loading = false,
  onClick,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleClick = (event: React.SyntheticEvent) => {
    if (!disabled && !loading) {
      onClick(event);
    }
  };

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      className={classNames(styles.wrapper, className)}
      style={innerStyles}
    >
      {loading ? (
        <CustomSpinner />
      ) : (
        <button className={classNames(styles.button, { [styles.disabled]: disabled || loading })} onClick={handleClick}>
          {label}
        </button>
      )}

      {isHover && disabled && tooltipText && <div className={styles.tooltip}>{tooltipText}</div>}
    </div>
  );
};

export default CustomButton;
