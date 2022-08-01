import React, { useState, useEffect } from 'react';
import './CreateOperation.scss';

function CreateOperation() {

  const [inputValues, setInputValues] = useState({
    concept: "",
    amount: "",
    type: "",
    category: ""
  })

  const [inputErrors, setInputErrors] = useState({})
  const validate = (inputValues) => {
    let errors = {}

    if (!inputValues.concept) {
      errors.concept = 'Debes completar este campo.';
    }
    if (!inputValues.amount) {
      errors.amount = 'Debes ingresar un monto.';
    }
    if (!inputValues.type) {
      errors.type = 'Debes indicar el tipo de operación.';
    }
    if (!inputValues.category) {
      errors.category = 'Debes agregar una categoría.';
    }

    return errors;
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const [isSubmit, setIsSubmit] = useState(false);
  const handleInputSubmit = (e) => {
    e.preventDefault();
    setInputErrors(validate(inputValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
    }
    setIsSubmit(false);
  }, [inputErrors, isSubmit]);

  console.log(inputErrors)
  console.log(inputValues)

  return (
    <div className='createOperation'>
      <div className='title'>
        <h2>Nueva operación</h2>
      </div>
      <div className='formContainer'>
        <form onSubmit={(e) => handleInputSubmit(e)}>
          <div className='inputContainer'>
            <input type='text' name='concept' value={inputValues.concept} placeholder='Concepto...' onChange={(e) => handleInputChange(e)} />
            {inputErrors.concept && <p className='error'>{inputErrors.concept}</p>}
          </div>
          <div>
            <input type='text' name='amount' value={inputValues.amount} placeholder='Monto...' onChange={(e) => handleInputChange(e)} />
            {inputErrors.amount && <p className='error'>{inputErrors.amount}</p>}
          </div>
          <div>
            <select type='text' name='type' onClick={(e) => handleInputChange(e)}>
              <option value='null'>Tipo...</option>
              <option value='ingreso'>Ingreso</option>
              <option value='egreso'>Egreso</option>
            </select>
            {inputErrors.type && <p className='error'>{inputErrors.type}</p>}
          </div>
          <div>
            <select type='text' name='category' onClick={(e) => handleInputChange(e)} >
              <option value='null'>Categorias...</option>
              <option value='comidas'>Comidas</option>
              <option value='luz'>Luz</option>
            </select>
            {inputErrors.category && <p className='error'>{inputErrors.category}</p>}
          </div>
          <input type='submit' value='Crear' />
        </form>
      </div>
    </div>
  )
}

export default CreateOperation;