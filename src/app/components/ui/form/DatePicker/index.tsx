'use client';

import {
  DatePicker as DatePickerAntd,
  DatePickerProps as DatePickerAntdProps,
} from 'antd';
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

type DatePickerProps<T extends FieldValues> = DatePickerAntdProps & {
  name: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

export const DatePicker = <T extends FieldValues>({
  name,
  errors,
  control,
  rules,
  ...rest
}: DatePickerProps<T>) => {
  const errorMessage = get(errors, name);
  const hasError = !!(errors && errorMessage);

  if (control)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePickerAntd
            {...rest}
            {...field}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return <DatePickerAntd {...rest} {...(hasError && { status: 'error' })} />;
};
