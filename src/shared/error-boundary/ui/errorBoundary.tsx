import React, {Component, ReactElement, ReactNode, ReactPortal} from 'react';

interface ReactNodeArray extends Array<ReactNode> {
}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type Props = {
  children: ReactNode
}

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;