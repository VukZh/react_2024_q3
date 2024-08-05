import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './errorBoundary.module.css';

type PropsType = {
  children: ReactNode;
};

class ErrorBoundary extends Component<PropsType, { hasError: boolean }> {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles.textMessage}>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
