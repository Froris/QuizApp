import React, { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    menu: false
  }

  toggleMenuHnadler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  closeMenuHnadler = () => {
    this.setState({
      menu: false
    })
  }

  render(){
    return (
      <Fragment>
        <Drawer 
          isOpen={this.state.menu} 
          onClose={this.closeMenuHnadler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle onToggle={this.toggleMenuHnadler} isOpen={this.state.menu}/>
        <main className={classes.Layout}>
          { this.props.children }
        </main>
      </Fragment>
    )
  }
};

// Работает
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(Layout);