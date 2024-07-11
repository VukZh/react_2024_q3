import './App.css';
import Search from '../pages/search';
import ErrorBoundary from '../shared/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <Search />
    </ErrorBoundary>
  );
}

export default App;
