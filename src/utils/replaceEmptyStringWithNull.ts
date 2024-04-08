export const replaceEmptyStringWithNull = <T>(obj: Record<string, any>): T => {
  const object = JSON.parse(JSON.stringify(obj));

  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim() === '') {
      // Replace empty string with null
      object[key] = null;
    } else if (typeof value === 'object' && value !== null) {
      replaceEmptyStringWithNull(object[key]);
    }
  });

  return object;
};
