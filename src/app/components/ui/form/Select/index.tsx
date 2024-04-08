import { Select as SelectAntd, SelectProps as SelectAntdProps } from 'antd';
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

type SelectProps<T extends FieldValues> = SelectAntdProps & {
  name: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

export const Select = <T extends FieldValues>({
  name,
  errors,
  control,
  rules,
  ...props
}: SelectProps<T>) => {
  const errorMessage = get(errors, name);
  const hasError = !!(errors && errorMessage);

  if (control)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SelectAntd
            {...field}
            {...props}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return <SelectAntd {...props} {...(hasError && { status: 'error' })} />;
};
