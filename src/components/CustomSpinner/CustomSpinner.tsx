import React from 'react';
import styles from './CustomSpinner.module.scss';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';
import classNames from 'classnames';

interface ICustomSpinnerProps {
  className?: string;
}

const CustomSpinner: React.FC<ICustomSpinnerProps> = ({ className }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Spinner />
    </div>
  );
};

export default CustomSpinner;
