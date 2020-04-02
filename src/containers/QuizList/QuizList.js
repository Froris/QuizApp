import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/loader/Loader';
import classes from './QuizList.scss';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../redux/actions/actions/fetchQuizes';

class QuizList extends Component {
  quizListRenderer() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id} className={classes.List__item}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  componentDidMount(){
    this.props.fetchQuizes()
  }

  render(){
    return (
      <div className={classes.Quiz}>
        <h2>Quiz List</h2>
        { 
          this.props.loading && this.props.quizes.length !== 0 
          ? <Loader />
          :<ul className={classes.Quiz__list}>
            { this.quizListRenderer() }
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  quizes: state.quiz.quizes,
  loading: state.quiz.loading
})

const mapDispatchToProps = (dispatch) =>({
  fetchQuizes: () => dispatch(fetchQuizes())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)