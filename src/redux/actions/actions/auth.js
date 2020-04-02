// При авторизации/регистрации возвращаеться id токен пользователя
// помещаем данные в local storage
// если токен есть в local storage - пользователь авторизован, и
// мы добавляем доп функционал

import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../actionsTypes/actionsTypes' 

export const auth = (email, password, isLogin) => async (dispatch) => {
  const authData = {
    email,
    password,
    returnSecureToken: true
  }

  // Меняем ссылку в зависимости от регистрации/авторизации
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRmR4BVPH1PVlp4E0C5OKdg4ZZ9i-QVAM'
  if(isLogin){
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRmR4BVPH1PVlp4E0C5OKdg4ZZ9i-QVAM'
  }
  const response = await axios.post(url, authData)
  console.log(response.data)
  const data = response.data

  // Дата окончания сессии
  const expirationDate = new Date( new Date().getTime() + data.expiresIn * 1000)
  console.log(new Date().getTime())

  localStorage.setItem('token', data.idToken)
  localStorage.setItem('userId', data.localId)
  localStorage.setItem('expirationDate', expirationDate)

  dispatch(authSuccess(data.idToken));
  dispatch(autoLogout(data.expiresIn))
}

export function authSuccess(token){
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export const autoLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout())
  }, time * 1000)
}

export function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT,
  }
}

export const autoLogin = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if(!token){
    dispatch(logout());
  } else if (expirationDate <= new Date()){
    dispatch(logout());
  } else {
    dispatch(authSuccess(token));
    dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
  }
}