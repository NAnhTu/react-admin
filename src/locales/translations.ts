import { ConvertedToObjectType, TranslationJsonType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translations: ConvertedToObjectType<TranslationJsonType> = {} as any;

export const convertLanguageJsonToObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any,
  objToConvertTo = translations,
  current?: string,
) => {
  Object.keys(json).forEach((key) => {
    const currentLookupKey = current ? `${current}.${key}` : key;

    if (typeof json[key] === 'object') {
      // @ts-ignore
      objToConvertTo[key] = {};

      // @ts-ignore
      convertLanguageJsonToObject(json[key], objToConvertTo[key], currentLookupKey);
    } else {
      // @ts-ignore
      objToConvertTo[key] = currentLookupKey;
    }
  });
};
