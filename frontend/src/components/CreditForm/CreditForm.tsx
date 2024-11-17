import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import InputText from '../InputText/InputText';
import { CreditFormProps } from '../../types/components/CreditForm/CreditForm';

const CreditForm = ({ setServerResponse }: CreditFormProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm: FieldValues) => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });

      const result = await response.json();
      setServerResponse(result);
    } catch (error) {
      console.error('Error fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    reset();
    setServerResponse(undefined);
  };

  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
      <InputText
        name="totalInstallments"
        placeholder="Liczba rat wszystkich"
        errors={errors}
        register={register}
        validationSchema={{
          required: true,
        }}
      />
      <InputText
        name="remainingInstallments"
        placeholder="Liczba rat pozostałych do spłaty"
        errors={errors}
        register={register}
        validationSchema={{
          required: true,
        }}
      />
      <InputText
        name="installmentAmount"
        placeholder="Wysokość raty"
        errors={errors}
        register={register}
        validationSchema={{
          required: true,
        }}
      />
      <InputText
        name="financingAmount"
        placeholder="Wartość finansowania"
        errors={errors}
        register={register}
        validationSchema={{
          required: true,
        }}
      />
      <InputText
        name="interestRate"
        placeholder="Oprocentowanie"
        errors={errors}
        register={register}
        validationSchema={{
          required: true,
        }}
      />
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Przeliczam...' : 'Przelicz'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClear}>
          Wyczyść
        </button>
      </div>
    </form>
  );
};

export default CreditForm;
