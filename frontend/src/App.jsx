import React from 'react';
import Routing from './utils/routing';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

function App() {
  const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  return (
    <AuthProvider store={store}>
      <Routing />
    </AuthProvider>
  );
}

export default App;

