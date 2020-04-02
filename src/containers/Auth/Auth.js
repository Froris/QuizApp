import React, { Component } from 'react'
import Button from '../../components/UI/buttons/Button';
import Input from '../../components/UI/inputs/Input';
import classes from './Auth.module.scss';
import {validateForm, validateControl} from '../../form/formFramework';
import { auth } from '../../redux/actions/actions/auth';
import { connect } from 'react-redux';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Please provide a correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }  
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Please provide a correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }  
      }
    }
  }

  // ============================================================================
  onSubmitHandler = event => {
    event.preventDefault();
  }

  onLoginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  onRegisterHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  // Функция - валидатор
  onChangeHandler = (event, controlName) => {
    // Создаем копию стейта и конкретного объекта для избежания мутации
    const formControls = this.state.formControls;
    const controlObj = {...formControls[controlName]};

    controlObj.touched = true;
    controlObj.value = event.target.value;
    controlObj.valid = validateControl(controlObj.value, controlObj.validation)

    // Присваиваем копии стейта измененную копию объекта
    formControls[controlName] = controlObj;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs(){
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const controlObj = this.state.formControls[controlName];
      return (
        <Input 
          key={controlName+index}
          type={controlObj.type}
          value={controlObj.value}
          valid={controlObj.valid}
          touched={controlObj.touched}
          label={controlObj.label}
          shouldValidate={!!controlObj.validation}
          errorMessage={controlObj.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render(){
    return (
      <div className={classes['Auth-wrapper']}>
        <div className={classes.Auth}>
          <h2>Auth</h2>
          <form onSubmit={this.onSubmitHandler}>
            {this.renderInputs()}
            <div className={classes['buttons-wrapper']}>
              <Button onClick={this.onLoginHandler} type='submit' text='Login' disabled={!this.state.isFormValid} />
              <Button onClick={this.onRegisterHandler} type='reg' text='Register' disabled={!this.state.isFormValid} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
})

export default connect(null, mapDispatchToProps)(Auth)