import React,{ useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { ToastContainer, toast } from "react-toastify";

import * as Yup from 'yup';

const  Trainings = (props) => {
  
  const notiFy = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }  

  const initialValues = {
    training: [
      {
        first_name:'',
        last_name:'',
        company_email:'',
        employee_number:'',
      }
    ]
  };

  

  const validationSchema = Yup.object().shape({
      training: Yup.array().of(
          Yup.object().shape({
              company_email: Yup.string()
                  .required('Company email is required'),
							first_name: Yup.string()
                  .required('First name is required'),
							last_name: Yup.string()
                  .required('Last name is required'),
          })
      )
  });

  function addTrainingType(e, values, setValues) {
    console.log("allecd",values)
    const training = [...values.training];
    training.push({
        first_name:'',
        last_name:'',
        company_email:'',
        employee_number:'',
    })
    setValues({ ...values, training });
  }

  const  onSubmit = async(fields, { setSubmitting, resetForm }) => {
			// display form field values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
			console.log("field",fields)
			const response = await fetch(`/api/employee-training`, {
				method: 'POST',
				body: JSON.stringify(fields.training)
			});
			const data:any = await response.json()
			if(!response.ok){
				notiFy(data.message)
			}else{
				resetForm()
				notiFy(data.message)
			}

  }

    console.log("initialValues",initialValues)
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
							<>
                <Form>
                    <div className="card m-3">
                        <FieldArray name="training">
                        {() => (values.training.map((application, i) => {
                            const ticketErrors = errors.training?.length && errors.training[i] || {};
                            const ticketTouched = touched.training && touched.training[i] || {};
                            return (
															<>
                                <div key={i} className="container flex flex-row flex-wrap">
                                    {/* <div className="height-feet-content container "> */}
                                    	<div className="w-2/4 mb-3 mt-5">
																				<div className="w-3/4">
																					<label className="font-bold text-gray-600 block mb-2">First Name</label>
																					<Field name={`training.${i}.first_name`} type="text" className={'block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow form-control' + (ticketErrors.first_name && ticketTouched.first_name ? ' is-invalid' : '' )} />
																					<ErrorMessage name={`training.${i}.first_name`} component="div" className="invalid-feedback text-red-500" />
																				</div>
                                      </div>
																			<div className="w-2/4  mb-3 mt-5">
																				<div className="w-3/4">
																					<label className="font-bold text-gray-600 block mb-2">Last Name</label>
																					<Field name={`training.${i}.last_name`} type="text" className={'block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow form-control' + (ticketErrors.last_name && ticketTouched.last_name ? ' is-invalid' : '' )} />
																					<ErrorMessage name={`training.${i}.last_name`} component="div" className="invalid-feedback text-red-500" />
                                      	</div>
                                      </div>
                                      <div className="w-2/4 mb-3 mt-3">
																				<div className="w-3/4">
																					<label className="font-bold text-gray-600 block mb-2">Company Email</label>
																					<Field name={`training.${i}.company_email`} type="email" className={'block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow form-control' + (ticketErrors.company_email && ticketTouched.company_email ? ' is-invalid' : '' )} />
																					<ErrorMessage name={`training.${i}.company_email`} component="div" className="invalid-feedback text-red-500" />
                                      	</div>
                                      </div>
																			<div className="w-2/4 mb-3 mt-3">
																				<div className="w-3/4">
																					<label className="font-bold text-gray-600 block mb-2">Employee No</label>
																					<Field name={`training.${i}.employee_number`} type="text" className={'block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow form-control' + (ticketErrors.employee_number && ticketTouched.employee_number ? ' is-invalid' : '' )} />
																					<ErrorMessage name={`training.${i}.employee_number`} component="div" className="invalid-feedback text-red-500" />
                                      	</div>
                                      </div>
                                    {/* </div> */}
                              </div>
															{ values.training.length > 1 && i < values.training.length &&
															<hr className='horizontal-line'/>
															}
															</>
                            );
                        }))}
                        </FieldArray>
                        <div className="my-4 flex items-center justify-end next-button-pci-manager mt-10">
                          <div className='ml-10 mr-10'>
                            <button type="button" onClick={(e)=>addTrainingType(e, values, setValues)} className='rounded-3xl bg-color-13aeb7 px-10 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out' >
                                Add Another Employee
                            </button>
                          </div>
													<div className='mr-10'>
                            <button type="submit" className='rounded-3xl bg-purple-900 px-10 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out'>
                                Save
                            </button>
                          </div>
                        </div>
                    </div>
                </Form>
								<ToastContainer closeOnClick/>
							</>
            )}
        </Formik>
    )
}

export default Trainings;