import React from 'react';
import classes from './Options.module.css';
import OptionItem from './OptionItem';

const Options = props => (
  <ul className = {classes.Options}>
    {props.answers.map((answer, index) => {
      return (
        <OptionItem 
          key = { index }
          answer = { answer }
          onAnswerClick = { props.onAnswerClick }
          answerState = { props.answerState ? props.answerState[answer.id] : null }
        />
      ) 
    })}
  </ul>
)

export default Options;