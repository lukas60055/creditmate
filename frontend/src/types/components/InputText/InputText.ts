import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type InputTextProps = {
  name: string;
  placeholder: string;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  validationSchema?: RegisterOptions<FieldValues>;
};
