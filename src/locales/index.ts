import { createI18n } from 'vue-i18n';

import vi from './vi';
import en from './en';

const i18n = createI18n({
  locale: 'vi',
  messages: {
    vi,
    en,
  },
  legacy: false,
  globalInjection: true,
});

export default i18n;
