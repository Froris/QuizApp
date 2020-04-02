const formControls = {
  question: createControl({
    label: 'Введите вопрос: ',
    errorMessage: 'Вопрос не может быть пустым'
  }, {required: true}),

  option1: createOptionControl(1),
  option2: createOptionControl(2),
  option3: createOptionControl(3),
  option4: createOptionControl(4)
}

// ======================================== Создание опций
// Создание валидации
function createOptionControl(optionNumber){
  return (
    createControl(
      {
        label: `Вариант ${optionNumber}: `,
        errorMessage: 'Значение не может быть пустым',
        id: optionNumber
      }, 
      { required: true }
    )
  )
}

// Создание опций валидации
function createControl(config, validation){
  return {
    ...config,
    validation,
    valid: false,
    touched: false,
    value: ''
  }
}

export const createFormControls = () => ({
  ...formControls
})

// ======================================== Создание валидаторов
// Валидация почты
export function validateEmail(email) {
  let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Валидация формы
export function validateForm(formControls){
  // Проверяем кажде свойство копии на валидность
  // Если .valid = true - передаем копию в setState
  let isFormValid = true;
  Object.keys(formControls).forEach((name) => {
    isFormValid = formControls[name].valid && isFormValid
  })

  return isFormValid
}

// Проверка на валидность всех полей
export const validateControl = (value, validation = null) => {
// Если валидация не нужна (required: false) 
// функция не выполнится 
  if(!validation){
    return
  }

  let isValid = true;

  if(validation.required){
    isValid = value.trim() !== '' && isValid
  }
  if(validation.email){
    isValid = validateEmail(value) && isValid
  }
  if(validation.minLength) {
    isValid = value.length >= validation.minLength && isValid
  }

  return isValid;
}


