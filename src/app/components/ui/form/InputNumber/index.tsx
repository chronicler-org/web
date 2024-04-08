import {
  InputNumber as InputNumberAntd,
  InputNumberProps as InputNumberAntdProps,
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

type InputProps<T extends FieldValues> = InputNumberAntdProps & {
  name: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

export const InputNumber = <T extends FieldValues>({
  name,
  errors,
  control,
  rules,
  ...rest
}: InputProps<T>) => {
  const errorMessage = get(errors, name);
  const hasError = !!(errors && errorMessage);

  if (control)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputNumberAntd
            {...rest}
            {...field}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return <InputNumberAntd {...rest} {...(hasError && { status: 'error' })} />;
};
