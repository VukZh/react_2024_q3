import './App.css';
import Search from '../pages/search';
import ErrorBoundary from '../shared/error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../shared/not-found';
import { ContextProvider } from '../shared/context/contextProvider.tsx';

function App() {
  return (
    <ErrorBoundary>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ErrorBoundary>
  );
}

export default App;
