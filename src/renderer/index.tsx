/* eslint-disable import/no-duplicates */
import { render } from 'react-dom';
import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './ContextProvider/configureStore';

import OnBoardingPage from './pages/OnBoarding.page';
import LoginPage from './pages/Login.page';
import PostAuthPage from './pages/PostAuth.page';
import Bar from './components/Bar.component';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

const persistor = persistStore(store);
function App() {
  return (
    <div>
      <MemoryRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Auth0ProviderWithHistory>
              <Routes>
                <Route path="/" element={<OnBoardingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/post-auth" element={<PostAuthPage />} />
              </Routes>
            </Auth0ProviderWithHistory>
          </PersistGate>
        </Provider>
      </MemoryRouter>
    </div>
  );
}
render(<App />, document.getElementById('root'));
