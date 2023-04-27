/* eslint-disable camelcase */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en.json';
// import pt_BR from './pt_BR.json';
// import es from './es.json';

const deviceLanguage = Localization.locale;
// en, es, pt-BR

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: deviceLanguage,
  fallbackLng: 'en',
  resources: {
    en,
    // es,
    // pt_BR
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;
