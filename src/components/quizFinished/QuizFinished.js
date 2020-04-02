import React from 'react';
import classes from './QuizFinished.module.css';
import {NavLink} from 'react-router-dom';
import Button from '../UI/buttons/Button';

const QuizFinished = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success'){
      total++
    }
    return total;
  }, 0)

  return (
    <div className={ classes.QuizFinished }>
      <h1>Quiz is finished!</h1>
      <ul>
        { 
          props.quiz.map((quizItem, index) => {
            const cls = [
              'fa',
              props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
              classes[props.results[quizItem.id]]
            ]
            return (
              <li key={index}>
                <strong>{index + 1}</strong>
                { quizItem.question }
                <i className={cls.join(' ')} />
              </li>
            )
          }) 
        }
      </ul>
      <p>Right answers {successCount} of {props.quiz.length}</p>
      <div>
        <Button 
          onClick={props.onRetry} 
          text='Retry' 
          type='submit'
        />
        <NavLink to='/'>
          <Button 
            text='Go to quizs list' 
            type='cancel'
          />
        </NavLink>
      </div>
    </div>
  )
}

export default QuizFinished;