import { useI18n } from 'vue-i18n';

/**
 *
 * @param fieldName
 * @param trigger
 * @param type
 * @param whitespace
 * @param required
 */
export const requiredRule = (
  fieldName: string = '',
  trigger: string | string[] = 'blur',
  type: string = 'string',
  whitespace: boolean = true,
  required: boolean = true,
) => {
  const { t: $t } = useI18n();

  return {
    required,
    message: $t('validator.required', { name: fieldName }),
    trigger,
    whitespace,
    type,
  };
};

export const maxLengthRule = (
  fieldName: string = '',
  maxNumber: number = 256,
  trigger: string = 'blur',
) => {
  const { t: $t } = useI18n();

  return {
    max: maxNumber,
    message: $t('validator.max', { name: fieldName, number: maxNumber }),
    trigger,
  };
};

export const minLengthRule = (
  fieldName: string = '',
  minNumber: number = 1,
  trigger: string = 'blur',
) => {
  const { t: $t } = useI18n();

  return {
    min: minNumber,
    message: $t('validator.min', { name: fieldName, number: minNumber }),
    trigger,
  };
};

export const phoneNumberRules = (trigger: string = 'blur', isRequired = false) => {
  const { t: $t } = useI18n();
  const name = $t('common.phone_number');
  const message = $t('validator.phone');

  const rulesValidates = [
    maxLengthRule(name, 15, trigger),
    {
      min: 10,
      message: $t('validator.minPhoneNumber', { number: 10 }),
      trigger,
    },
    whiteSpaceRule(name, trigger),
    patternRegexRule(message, new RegExp('^\\+?[0-9\\s]+$'), trigger),
  ];


  if (!isRequired) {
    return rulesValidates;
  }

  return [requiredRule(name, trigger),...rulesValidates];
};

// Validate field do not exist whitespace between value
export const whiteSpaceRule = (fieldName: string, trigger: string = 'blur') => {
  const { t: $t } = useI18n();

  const validator = (rule: any, value: any) => {
    const trimValue = value?.trim();
    if (trimValue && /\s+/.test(trimValue)) {
      return Promise.reject($t('validator.noWhiteSpace', { name: fieldName }));
    }

    return Promise.resolve();
  };

  return { validator, trigger };
};

export const patternRegexRule = (
  message: string = '',
  pattern: RegExp,
  trigger: string = 'blur',
) => {
  return {
    pattern,
    message,
    trigger,
  };
};

export const emailRules = (trigger: string = 'blur') => {
  const { t: $t } = useI18n();
  const name = $t('common.email');
  const message = $t('validator.email');

  return [
    requiredRule(name, trigger),
    maxLengthRule(name, 256, trigger),
    patternRegexRule(
      message,
      new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      trigger,
    ),
  ];
};
