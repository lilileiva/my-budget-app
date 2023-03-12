import React, { useState, useEffect } from 'react';
import './EditTransaction.scss';
import { useDispatch, useSelector } from 'react-redux';
import { editTransaction } from '../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../../redux/actions';
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';


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

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      setIsLoading(true);
      dispatch(editTransaction(inputValues, id));
      setIsOpen(true);
      setInputValues({
        ...inputValues,
        concept: "",
        amount: "",
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
                {
                  !addCategory
                    ? (
                      <div className='category'>
                        <select type='text' name='category' onClick={(e) => handleInputChange(e)} >
                          <option>Categories...</option>
                          {
                            categories.length !== 0
                              ? <>
                                {categories.map((category) => (
                                  <option value={category.name}>{category.name}</option>
                                ))}
                              </>
                              : <option>There are not categories</option>
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
              {
                isLoading
                  ? <div className='loaderContainer'>
                    <Loader />
                  </div>
                  : <input type='submit' value='Edit' />
              }
            </form>
            : <>
              <p>404 not found</p>
            </>
        }
      </div>
      {
        isOpen && <Alert text='Transaction edited succesfully!' setIsOpen={setIsOpen} />
      }
    </div>
  )
}


export default EditTransaction;
