import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout'
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Quiz from './containers/Quiz/Quiz';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './redux/actions/actions/auth';

class App extends Component{

  componentDidMount(){
    this.props.autoLogin()
  }

  render(){
    let routes;

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout}/>
          <Route path='/' component={QuizList} exact={true}/>
          <Redirect to='/' />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/' component={QuizList} />
        </Switch>
      )
    }

    return <Layout>{ routes }</Layout>
  };
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
