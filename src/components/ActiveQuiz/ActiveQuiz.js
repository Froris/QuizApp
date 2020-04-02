import React from 'react';
import classes from './ActiveQuiz.module.css';
import Options from './options/Options';

const ActiveQuiz = props => (
  <div className={classes['Question-wrapper']}>
    <p className={classes.Question}>
      <span>
        <strong>{props.questionNumber}. </strong>
        { props.question }
      </span>
      <small> {props.questionNumber} of {props.questionLength}</small>
    </p>
    <Options 
      answers = { props.answers } 
      onAnswerClick = { props.onAnswerClick }
      answerState = { props.answerState }
    />
  </div>
)

export default ActiveQuiz;