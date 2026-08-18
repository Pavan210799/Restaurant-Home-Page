import { useState } from 'react';
import './PasswordField.css';

function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder = 'Min. 6 characters',
  autoComplete = 'current-password',
  invalid = false,
  id,
}) {
  const [visible, setVisible] = useState(false);
  const inputId = id || name;

  return (
    <label className="password-field" htmlFor={inputId}>
      <span className="password-field__label">{label}</span>
      <div className="password-field__wrap">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          className="password-field__input"
        />
        <button
          type="button"
          className="password-field__toggle"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((show) => !show)}
        >
          <i
            className={`fa-solid ${visible ? 'fa-eye-slash' : 'fa-eye'}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </label>
  );
}

export default PasswordField;
