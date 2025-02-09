import { useState } from "react";
import { hasMinLength, isEmail, isEqualsToOtherValue } from "../util/validation";
import { useActionState } from "react";

export default function Signup() {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  let errors = [];



  function handleSignup(e){
    e.preventDefault();
    // const data = new FormData(e.target);
    // const objData = Object.fromEntries(data.entries());
    // const acquistionData = data.getAll('acquisition');
    // objData.acquisition = acquistionData;
    if (e.target['password'].value!== e.target['confirm-password'].value) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true); 
    }
  }

  function signupAction(prevFormState, formData) {
    console.log(formData);
    
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const role = formData.get('role');
    const acquisition = formData.getAll('acquisition');
    const termsAndConditions = formData.get('terms');

    

    if (!isEmail(email)) {
      errors.push('Please enter a valid email');
    }
    if (!password) {
      errors.push('Please enter password');
    }
    if (!confirmPassword) {
      errors.push('Please enter confirm password');
    }
    if (!isEqualsToOtherValue(password, confirmPassword)){
      errors.push('Please enter matching passwords');
    }
    if (hasMinLength(password, 6)) {
      errors.push('Password must be at least 6 characters long');
    }
    if (!firstName) {
      errors.push('Please enter first name');
    }
    if (!lastName) {
      errors.push('Please enter last name');
    }
    if (acquisition && acquisition.length === 0) {
      errors.push('Please select at least one option');
    }
    if (!termsAndConditions) {
      errors.push('Please agree to terms and conditions');
    }

    console.log(errors);
    if (errors.length > 0) {
      return { errors, enteredValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisition,
        termsAndConditions,
      } };
    }
     return {errors : null};
    // return data;
  }

  const [formState, formAction]= useActionState(signupAction, {errors : null});

  function resetAction(){
    setIsPasswordMatch(true);
    return {errors : null};
  }


  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password} />
          {!isPasswordMatch ? <p className="error">Passwords don't match</p> : null}
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.lastName} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisition.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisition.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" 
          defaultChecked={formState.enteredValues?.acquisition.includes('other')}/>
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultValue={formState.enteredValues?.termsAndConditions} />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && formState.errors.length > 0 && 
        <ul className="errors">
        {
          formState.errors.map((error) =>{
            return <li key={error}>{error}</li>
          })
        }
        </ul>
      }

      <p className="form-actions">
        <button type="reset" className="button button-flat" onClick={resetAction}>
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
