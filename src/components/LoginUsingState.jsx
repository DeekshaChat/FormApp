import InputComponent from "./InputComponent";
import { useInput } from "../hooks/useInput";

export default function Login() {

  const {value: emailValue, isEdit: isEmailEdit, onChange: onEmailChange, handleBlur: onEmailBlur} = useInput('');
  const {value: passwordValue, isEdit: isPasswordEdit, onChange: onPasswordChange} = useInput('');

  const isValidEmail = isEmailEdit && !emailValue.includes('@');
  const isPasswordValid = passwordValue && passwordValue.length >= 6;
  console.log('isEdit', isEmailEdit);
  
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <InputComponent
          label={'Email'}
          id={'email'}
          type="email"
          name="email"
          value={emailValue}
          onBlur={onEmailBlur}
          onChange={e => onEmailChange(e.target.value)}
          error={isValidEmail ? 'Please enter a valid email' : ''}
        />

        <InputComponent
          label={'Password'}
          id={'password'}
          type="password"
          name="password"
          value={passwordValue}
          onChange={e => onPasswordChange(e.target.value)}
          error={isPasswordValid ? '' : 'Please enter a valid password'}
          />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
  