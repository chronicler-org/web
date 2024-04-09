import { Input as InputAntd } from 'antd';
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

import { TextAreaProps as TextAreaAntdProps } from 'antd/lib/input';

type TextAreaProps<T extends FieldValues> = TextAreaAntdProps & {
  name: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

const { TextArea: TextAreaAntd } = InputAntd;

export const TextArea = <T extends FieldValues>({
  name,
  errors,
  control,
  rules,
  ...props
}: TextAreaProps<T>) => {
  const errorMessage = get(errors, name);
  const hasError = !!(errors && errorMessage);

  if (control)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextAreaAntd
            {...field}
            allowClear
            showCount
            {...props}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return (
    <TextAreaAntd
      allowClear
      showCount
      {...props}
      {...(hasError && { status: 'error' })}
    />
  );
};
