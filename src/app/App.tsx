import './App.css';
import Search from '../pages/search';
import ErrorBoundary from '../shared/error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../shared/not-found';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route index element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
