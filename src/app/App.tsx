import './App.css';
import { Component, ReactNode } from 'react';
import Search from '../pages/search';

class App extends Component<ReactNode, object> {
  render() {
    return <Search />;
  }
}

export default App;
