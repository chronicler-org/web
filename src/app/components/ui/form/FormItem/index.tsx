import { Form, FormItemProps as FormItemAntdProps } from 'antd';
import { DeepMap, FieldError, FieldValues, get } from 'react-hook-form';

const { Item: ItemAntd } = Form;

export type FormItemProps<T extends FieldValues> = FormItemAntdProps & {
  name?: string;
  errors?: Partial<DeepMap<T, FieldError>>;
};

export const FormItem = <T extends FieldValues>({
  errors,
  name,
  ...props
}: FormItemProps<T>) => {
  if (typeof errors !== 'undefined') {
    const errorMessage = get(errors, name);
    const hasError = !!(errors && errorMessage);
    return (
      <FormItem
        {...(hasError && { validateStatus: 'error' })}
        hasFeedback
        help={errorMessage?.message}
        {...props}
      />
    );
  }
  return <ItemAntd {...props} />;
};
