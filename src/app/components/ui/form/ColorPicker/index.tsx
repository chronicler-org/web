import {
  ColorPicker as ColorPickerAntd,
  ColorPickerProps as ColorPickerAntdProps,
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

type ColorPickerProps<T extends FieldValues> = ColorPickerAntdProps & {
  name: Path<T>;
  control?: Control<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  rules?: RegisterOptions;
};

export const ColorPicker = <T extends FieldValues>({
  name,
  errors,
  control,
  rules,
  ...rest
}: ColorPickerProps<T>) => {
  const errorMessage = get(errors, name);
  const hasError = !!(errors && errorMessage);

  if (control)
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ColorPickerAntd
            {...rest}
            {...field}
            onChange={(value) => field.onChange(`#${value.toHex()}`)}
            {...(hasError && { status: 'error' })}
          />
        )}
      />
    );

  return <ColorPickerAntd {...rest} {...(hasError && { status: 'error' })} />;
};
