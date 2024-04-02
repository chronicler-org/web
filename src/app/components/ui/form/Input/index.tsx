import { Input as InputAntd, InputProps as InputAntdProps } from 'antd';
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

type InputProps<T extends FieldValues> = InputAntdProps & {
  name: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

export const Input = <T extends FieldValues>({
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
          <InputAntd
            {...rest}
            {...field}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return <InputAntd {...rest} {...(hasError && { status: 'error' })} />;
};
