import React, { useState, useEffect } from 'react';
import './EditTransaction.scss';
import { useDispatch, useSelector } from 'react-redux';
import { editTransaction } from '../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../../redux/actions';


function EditTransaction() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]);

    const categories = useSelector((state) => state.categories);

    const [inputValues, setInputValues] = useState({
      concept: "",
      amount: "",
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
        dispatch(editTransaction(inputValues, id));
        navigate('/');
      }
      setIsSubmit(false);
    }, [inputErrors, isSubmit]);
  
    const token = window.localStorage.getItem('token');

    console.log(inputValues)
  
    return (
      <div className='createTransaction'>
        <div className='title'>
          <h2>Edit transaction</h2>
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
                  <input type='text' name='amount' value={inputValues.amount} placeholder='Amount...' onChange={(e) => handleInputChange(e)} />
                  {inputErrors.amount && <p className='error'>{inputErrors.amount}</p>}
                </div>
                <div>
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
                  {inputErrors.category && <p className='error'>{inputErrors.category}</p>}
                </div>
                <input type='submit' value='Edit' />
              </form>
              : <>
                <p>404 not found</p>
              </>
          }
        </div>
      </div>
    )
  }


export default EditTransaction;
