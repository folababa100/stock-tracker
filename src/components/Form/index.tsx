import React from 'react';
import Button from 'components/Button';

import TextField from './TextField';

import { FaRegBell } from 'react-icons/fa';

import './Form.scss';

interface FormProps {
  value: string;
  setValue: (value: string) => void;
  onSubscribe: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  maxLength: number;
  isConnected: boolean;
}

const Form = ({
  value,
  setValue,
  onSubscribe,
  error,
  maxLength,
  isConnected,
}: FormProps) => {
  return (
    <form role="form" onSubmit={onSubscribe} className="mt-4 mb-4 form-card">
      <div className="flex flex-align-end gap-20">
        <TextField
          placeholder="XXXXXXXXXXXX"
          id="isin_text_field"
          value={!isConnected ? '' : value}
          onChange={(e) => setValue(e.target.value)}
          maxlength={maxLength}
          label="ISIN code"
          disabled={!isConnected}
        />
        <Button
          type="submit"
          title="Subscribe"
          disabled={!!error || value.length !== maxLength || !isConnected}
        >
          <FaRegBell size={20} />
          <span className="ml-2 hidden-xs">Subscribe</span>
        </Button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
};

export default Form;
