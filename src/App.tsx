import SettingsProvider from './contexts/SettingsProvider';
import AppRoutes from './components/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store';
function App() {
  return (
    <Provider store={store}>
      <SettingsProvider>
        <AppRoutes />
      </SettingsProvider>
    </Provider>
  );
}

export default App;
