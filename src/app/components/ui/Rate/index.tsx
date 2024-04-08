import { Rate as RateAntd, RateProps as RateAntdProps } from 'antd';

import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  get,
} from 'react-hook-form';

type RateProps<T extends FieldValues> = RateAntdProps & {
  name?: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

export const Rate = <T extends FieldValues>({
  name,
  errors,
  control,
  rules,
  ...props
}: RateProps<T>) => {
  const errorMessage = get(errors, name);
  const hasError = !!(errors && errorMessage);

  if (control && name)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <RateAntd
            {...field}
            {...props}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return <RateAntd {...props} {...(hasError && { status: 'error' })} />;
};
