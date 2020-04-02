import React, { Component } from 'react';
import classes from './QuizCreator.module.scss';
import Input from '../../components/UI/inputs/Input';
import Button from '../../components/UI/buttons/Button';
import Select from '../../components/UI/select/Select';
import {createFormControls, validateControl, validateForm} from '../../form/formFramework';
import { createQuizQuestion, finishCreateQuiz } from '../../redux/actions/actions/create';
import { connect } from 'react-redux';

class QuizCreator extends Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
  }

  // Добавление вопроса
  addQuestionHandler = (event) => {
    event.preventDefault();

    const {question, option1, option2, option3, option4} = this.state.formControls;

    // Создаем новый вопрос с вариантами
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    this.props.createQuizQuestion(questionItem)
    
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }
  
  // Создание опроса
  createQuizHandler = (event) => {
    event.preventDefault()
    this.props.finishCreateQuiz()
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    });
  }

  // Добавление вопроса/варианта + валидация
  onChangeHandler = (event, controlItem) => {
    // Создаем копию стейта и конкретного объекта для избежания мутации
    const formControls = this.state.formControls;
    const controlObj = {...formControls[controlItem]};

    controlObj.touched = true;
    controlObj.value = event.target.value;
    controlObj.valid = validateControl(controlObj.value, controlObj.validation)

    // Присваиваем копии стейта измененную копию объекта
    formControls[controlItem] = controlObj;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  render(){
    const select = <Select 
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

    return (
      <div className={classes['QuizCreator-wrapper']}>
        <div>
          <h2>Quiz Creator</h2>
          <form onSubmit={this.onSubmitHandler}>
            { 
              Object.keys(this.state.formControls).map((controlItem, index) => {
                const controlObj = this.state.formControls[controlItem];
                return (
                  <Input
                    key={index}
                    label={controlObj.label}
                    value={controlObj.value}
                    valid={controlObj.valid}
                    touched={controlObj.touched}
                    shouldValidate={!!controlObj.validation}
                    errorMessage={controlObj.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlItem)}
                  />
                )
              })
            }
            {select}
            <Button type='reg' text='Создать тест' onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}/>
            <Button type='submit' text='Добавить вопрос' onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}/>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  quiz: state.create.quiz
})

const mapDispatchToProps = (dispatch) => ({
  createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
  finishCreateQuiz: () => dispatch(finishCreateQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)