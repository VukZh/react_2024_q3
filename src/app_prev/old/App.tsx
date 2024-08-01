import './App.css';
import Search from '../../pages/search';
import ErrorBoundary from '../../shared/error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../../shared/not-found';
import { ContextProvider } from '../../shared/context/contextProvider.tsx';
import CharacterDetails from '../../pages/search/entities/characterDetails';
import { store } from '../../shared/store/store.ts';
import { Provider } from 'react-redux';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Search />}>
                <Route path="/" element={<CharacterDetails />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
