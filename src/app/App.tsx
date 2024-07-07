import './App.css';
import { Component } from 'react';
import Search from '../pages/search';
import ErrorBoundary from '../shared/error-boundary';

class App extends Component<{}, {}> {
  render() {
    return (
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    );
  }
}

export default App;
