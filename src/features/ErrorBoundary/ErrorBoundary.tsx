import React from 'react';
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Object) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      <div className={styles.wrapper}>
        <span>Something went wrong!</span>
        <span>Please, reload the page</span>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
