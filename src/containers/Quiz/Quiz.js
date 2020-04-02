// Вывод текущего вопроса
import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import QuizFinished from '../../components/quizFinished/QuizFinished';
import Loader from '../../components/UI/loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../redux/actions/actions/fetchQuizes'

class Quiz extends Component {

  componentDidMount(){
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount(){
    this.props.retryQuiz();
  }

	render() {
		return (
      <div className={classes['Quiz-wrapper']}>
        <h2>Answer to all questions, please</h2>
        {
          this.props.loading || !this.props.quiz
          ? <Loader />
          : this.props.isFinished 
            ? <QuizFinished 
              results = {this.props.results}
              quiz = {this.props.quiz}
              onRetry = {this.props.retryQuiz}
            />
            : <ActiveQuiz
              questionNumber = { this.props.questionNumber + 1}
              question = { this.props.quiz[this.props.questionNumber].question }
              answers = { this.props.quiz[this.props.questionNumber].answers } 
              onAnswerClick = { this.props.quizAnswerClick }
              questionLength = { this.props.quiz.length }
              answerState = { this.props.answerState }
            />  
        }
      </div>
		)
	}
};

const mapStateToProps = (state) =>({
  results: state.quiz.results,
  isFinished: state.quiz.isFinished,
  questionNumber: state.quiz.questionNumber,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading
})

const mapDispatchToProps = (dispatch) =>({
  fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
  retryQuiz: () => dispatch(retryQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)