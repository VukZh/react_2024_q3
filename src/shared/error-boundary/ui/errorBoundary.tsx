import React, { Component, ReactElement, ReactNode, ReactPortal } from 'react';
import styles from './errorBoundary.module.css';
interface ReactNodeArray extends Array<ReactNode> {}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

type Props = {
  children: ReactNode;
};

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.log('Catch error: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles.textMessage}>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
