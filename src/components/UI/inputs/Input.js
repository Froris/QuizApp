import React from 'react';
import classes from './Input.module.scss';

function isInvalid({valid, touched, shouldValidate}){
  return !valid && touched && shouldValidate;
}

const Input = props => {
  
  const cls = [classes.Input];
  if(isInvalid(props)){
    cls.push(classes.Invalid)
  }

  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className={cls.join(' ')}>
      <label>
        {props.label}
        <input 
          type={inputType} 
          id={htmlFor} 
          value={props.value} 
          onChange={props.onChange} 
        />
      </label>
      { 
       isInvalid(props) && <span>{props.errorMessage}</span> 
      }
    </div>
  )
}

export default Input;