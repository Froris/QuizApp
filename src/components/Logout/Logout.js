import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { logout } from '../../redux/actions/actions/auth';


class Logout extends Component {
  componentDidMount(){
    this.props.logout()
    console.log('logout func should be called');
  }

  render(){
    return <Redirect to={'/'} />
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout)