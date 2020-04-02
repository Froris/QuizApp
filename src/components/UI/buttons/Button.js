import React from 'react';
import classes from './Button.module.scss';

const Button = props => {

  const cls = [
    classes.Button
  ]

  switch(props.type){
    case 'submit':
      cls.push(classes.Submit);
      break;
    case 'cancel':
      cls.push(classes.Cancel);
      break;
    case 'reg':
      cls.push(classes.Reg);
      break;
    default:
      return;
  }

  return (
    <button 
      className={cls.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default Button;