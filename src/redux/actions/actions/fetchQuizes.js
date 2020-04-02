import axios from '../../../axios/axios-quiz';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, QUIZ_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_RETRY } from '../actionsTypes/actionsTypes';

export const fetchQuizes = () => async(dispatch) => {
  dispatch(fetchQuizesStart())
  try{
    const quizes = [];
    const response = await axios.get('/quizes.json')
    
    Object.keys(response.data).forEach((key, index) =>{
      quizes.push({
        id: key,
        name: `Тест №${index + 1}`
      });
    });
    dispatch(fetchQuizesSuccess(quizes));

  } catch(e){
    console.log(e);
  }
}

// Проверка
export const fetchQuizById = (quizId) => async(dispatch) => {
  dispatch(fetchQuizesStart())
  try{
    const response = await axios.get(`quizes/${quizId}.json`);
    const quiz = response.data;
    dispatch(fetchQuizSuccess(quiz))
  } catch(e){
    console.log(e)
  }
}

export function fetchQuizSuccess(quiz){
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart(){
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes){
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function quizSetState(answerState, results){
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz(){
  return {
    type: QUIZ_FINISHED
  }
}

export function retryQuiz(){
  return {
    type: QUIZ_RETRY
  }
}

export function quizNextQuestion(number){
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export const quizAnswerClick = (answerId) => (dispatch, getState) => {
  const state = getState().quiz
  // *** Если ответ уже получен и он верный
  // код ниже не выполниться при повторном клике
  if(state.answerState) {
    // Берем id кликнутого варианта
    const key = Object.keys(state.answerState)[0]; 
    if(state.answerState[key] === 'success'){
      return
    }
  }
  // Берем первый/текущий вопрос
  const question = state.quiz[state.questionNumber] 
  const results = state.results;

  // *** Работа с текущим вопросом
  // Если ответ - верный
  if(question.rightAnswerId === answerId) {
    if(!results[question.id]) {
      results[question.id] = 'success'
    }

    dispatch(quizSetState({[answerId] :'success'}, results))

    const timeout = window.setTimeout(() => {
      if(isQuizFinished(state)) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(state.questionNumber + 1))
      }
      window.clearTimeout(timeout);
    }, 1000)

  // Если ответ - неверный
  } else {
    results[question.id] = 'fail';
    dispatch(quizSetState({[answerId] :'fail'}, results))
  }
}

function isQuizFinished(state){
  return state.questionNumber + 1 === state.quiz.length;
}