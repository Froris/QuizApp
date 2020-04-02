import React from 'react';
import classes from './OptionItem.module.css';

const OptionItem = props => {
  const cls = [classes.Option];

  if(props.answerState) {
    cls.push(classes[props.answerState]);
  }

  return (
    <li 
      className={cls.join(' ')} 
      onClick={() => props.onAnswerClick(props.answer.id) }
    >
      { props.answer.text }
    </li>
  )
}

export default OptionItem;