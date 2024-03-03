import React from 'react';
import Button from 'components/Buttons/Button';
import TextField from './TextField';
import { FaRegBell } from 'react-icons/fa';

import './Form.scss';

interface FormProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  maxLength: number;
  isConnected: boolean;
}

const Form = ({
  value,
  setValue,
  onSubmit,
  error,
  maxLength,
  isConnected,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 mb-4 form-card"
      data-testid="form"
    >
      <div className="flex flex-align-end gap-10">
        <TextField
          placeholder="Enter ISIN"
          id="isin"
          value={!isConnected ? '' : value}
          onChange={(e) => setValue(e.target.value)}
          maxlength={maxLength}
          label="ISIN"
          disabled={!isConnected}
        />
        <Button
          type="submit"
          title="Subscribe"
          icon={<FaRegBell size={20} />}
          disabled={!!error || value.length !== maxLength || !isConnected}
        >
          <span className="ml-2 hidden-xs">Subscribe</span>
        </Button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
};

export default Form;
