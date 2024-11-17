import { InputTextProps } from '../../types/components/InputText/InputText';

const InputText = (props: InputTextProps) => {
  const registrationOptions = {
    ...props.validationSchema,
    required:
      props.validationSchema?.required === true
        ? 'Wypełnij to pole'
        : props.validationSchema?.required,
  };

  return (
    <div
      className={`position-relative ${
        props.errors[props.name] ? 'mb-2' : 'mb-3'
      }`}
    >
      <input
        type="text"
        className={`form-control ${
          props.errors[props.name] ? 'is-invalid' : ''
        }`}
        placeholder={props.placeholder}
        {...props.register?.(
          props.name,
          props.validationSchema ? registrationOptions : undefined
        )}
      />
      <div className="invalid-feedback fw-medium">
        {props.errors && (props.errors[props.name]?.message as string)}
      </div>
    </div>
  );
};

export default InputText;
