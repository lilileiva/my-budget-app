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
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValues({
      [e.target.name]: e.target.value
    })
  }

  const [isSubmit, setIsSubmit] = useState(false);
  const handleInputSubmit = () => {
    setInputErrors(validate(inputValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {

    }
  }, [inputErrors, isSubmit])

  return (
    <div className='createOperation'>
      <h2>Nueva operación</h2>
      <form onSubmit={handleInputSubmit}>
        <input type='text' placeholder='Concepto...' onChange={(e) => handleInputChange(e)} />
        <input type='text' placeholder='Monto...' onChange={(e) => handleInputChange(e)} />
        <select type='text' onSelect={(e) => handleInputChange(e)} >
          <option>Tipo...</option>
          <option value='ingreso'>Ingreso</option>
          <option value='egreso'>Egreso</option>
        </select>
        <select type='text' onSelect={(e) => handleInputChange(e)} >
          <option>Categorias...</option>
          <option>Comidas</option>
          <option>Luz</option>
        </select>
        <input type='submit' value='Crear' />
      </form>
    </div>
  )
}

export default CreateOperation;