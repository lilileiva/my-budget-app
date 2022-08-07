import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateTransaction.scss';
import { createTransaction, getCategories } from '../../redux/actions';


function CreateTransaction() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

  const categories = useSelector((state) => state.categories);

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
      errors.concept = 'You must fill concept field.';
    }
    if (!inputValues.amount) {
      errors.amount = 'You must fill amount field.';
    }
    if (inputValues.amount && inputValues.amount !== Number(inputValues.amount)) {
      errors.amount = 'Amount must be a number.';
    }
    if (!inputValues.type) {
      errors.type = 'You must fill type field.';
    }
    if (!inputValues.category) {
      errors.category = 'You must fill category field.';
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
      dispatch(createTransaction(inputValues));
      setInputValues({
        ...inputValues,
        concept: "",
        amount: "",
        type: "",
        category: ""
      })

    }
    setIsSubmit(false);
  }, [inputErrors, isSubmit]);

  const [addCategory, setAddCategory] = useState(false)
  const addNewCategory = () => {
    !addCategory ? setAddCategory(true) : setAddCategory(false);
  }

  const token = window.localStorage.getItem('token');

  console.log(inputValues)

  return (
    <div className='createTransaction'>
      <div className='title'>
        <h2>New transaction</h2>
      </div>
      <div className='formContainer'>
        {
          token
            ? <form onSubmit={(e) => handleInputSubmit(e)}>
              <div className='inputContainer'>
                <input type='text' name='concept' value={inputValues.concept} placeholder='Concept...' onChange={(e) => handleInputChange(e)} />
                {inputErrors.concept && <p className='error'>{inputErrors.concept}</p>}
              </div>
              <div>
                <input type='text' name='amount' value={inputValues.amount} placeholder='$ Amount...' onChange={(e) => handleInputChange(e)} />
                {inputErrors.amount && <p className='error'>{inputErrors.amount}</p>}
              </div>
              <div>
                <select type='text' name='type' onClick={(e) => handleInputChange(e)}>
                  <option value='null'>Type...</option>
                  <option value='income'>Income</option>
                  <option value='egress'>Egress</option>
                </select>
                {inputErrors.type && <p className='error'>{inputErrors.type}</p>}
              </div>
              <div>
                {
                  !addCategory
                    ? (
                      <div className='category'>
                        <select type='text' name='category' onClick={(e) => handleInputChange(e)} >
                          <option value='null'>Categories...</option>
                          {
                            categories
                              ? <>
                                {categories.map((category) => (
                                  <option value={category.name}>{category.name}</option>
                                ))}
                              </>
                              : <option value='null'>There are not categories</option>
                          }
                        </select>

                        <a className='newCategoryButton' onClick={() => addNewCategory()}>
                          Add new category
                        </a>
                      </div>
                    ) : (
                      <div className='category'>
                        <input type='text' name='category' value={inputValues.category} placeholder='Category...' onChange={(e) => handleInputChange(e)} />

                        <a className='newCategoryButton' onClick={() => addNewCategory()}>
                          Select category
                        </a>
                      </div>
                    )
                }
                {inputErrors.category && <p className='error'>{inputErrors.category}</p>}
              </div>
              <input type='submit' value='Create' />
            </form>
            : <>
              <p>You should sign in to create a transaction</p>
            </>
        }
      </div>
    </div>
  )
}

export default CreateTransaction;