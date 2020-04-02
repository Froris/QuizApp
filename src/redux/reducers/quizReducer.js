import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, QUIZ_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_RETRY } from "../actions/actionsTypes/actionsTypes";

const initialState = {
  quizes: [],
  loading: true,
  results: {},
  isFinished: false,
  questionNumber: 0,
  answerState: null,
  quiz: null
}

export default function quizReducer(state = initialState, action){
  switch (action.type){
    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, loading: false, quizes: action.quizes
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, loading: false, quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results
      }
    case QUIZ_FINISHED:
      return {
        ...state, isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state, questionNumber: action.number, answerState: null
      }
    case QUIZ_RETRY:
      return {
        ...state,
        questionNumber: 0,
        answerState: null,
        isFinished: false,
        results: {}
      }
    default:
      return state
  }
}