import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GlobalHistory } from './components/Common/GlobalNavigate';
import i18n from './locales/i18cfg';
import { I18nextProvider } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './components/Common/SnackbarMassege';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalHistory />
      <I18nextProvider i18n={i18n}>
        <SnackbarProvider maxSnack={3}>
          <SnackbarUtilsConfigurator />
          <App />
        </SnackbarProvider>
      </I18nextProvider>
    </BrowserRouter>
  </Provider>
);
