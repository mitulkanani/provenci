import React,{ useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { string } from 'yup/lib/locale';

// interface FormValues {
//   paymentApplication: Array [
//     payment_type:string'',
//     application_name:'',
//     version_name:'',
//     application_vendor:'',
//     application_expiry:''
//   ]
// }

interface PaymentValue {
}

const  QirAssistant = (props) => {
  const{setStepCustomersPay,stepCustomersPay} = props;
  const initialValues = {
    paymentApplication: [
      {
        application_name:'',
        description:'',
      }
    ]
  };

  const validationSchema = Yup.object().shape({
      paymentApplication: Yup.array().of(
          Yup.object().shape({
              application_name: Yup.string()
                  .required('Application name is required'),
              descrioption: Yup.string()
                  .required('Version name is required'),
          })
      )
  });

  function addPaymentType(e, values, setValues) {
    console.log("allecd",values)
    const paymentApplication = [...values.paymentApplication];
    paymentApplication.push({
      application_name:'',
      description:'',
    })
    setValues({ ...values, paymentApplication });
  }

  function onSubmit(fields) {

      // display form field values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      let currentStep = stepCustomersPay + 1
      setStepCustomersPay(currentStep)
  }

  
  
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
											<div className="w-3/4 my-1">
												<label className="py-2 flex items-center">
														<div className="tag text-gray-500">Did you or your company reach out to "QIR Assistance for installation of proven
														or any other software pertaining to card data environment"?</div>
														<Field type="checkbox" name={`reach_out_qir`} id={`reach_out_qir`}  className="regular-checkbox big-checkbox ml-5" /><label htmlFor={`reach_out_qir`} className='ml-5'></label>
												</label>
											</div>
											<div className="w-3/4 my-1">
												<label className="py-2 flex items-center">
														<div className="tag text-gray-500">Does your company share cardholder data with any third party service provider (for example
														Qallified integration & Reslleres (QIR), gateways, payment processors, Payment service providers(PSP)
														web hosting companies, airline booking agents, loyalti platform agents, etc.)?</div>
														<Field type="checkbox" name={`share_data`} id={`share_data`}  className="regular-checkbox big-checkbox ml-5" /><label htmlFor={`share_data`} className='ml-5'></label>
												</label>
											</div>
                        <FieldArray name="paymentApplication">
                        {() => (values.paymentApplication.map((application, i) => {
                            const ticketErrors = errors.paymentApplication?.length && errors.paymentApplication[i] || {};
                            const ticketTouched = touched.paymentApplication?.length && touched.paymentApplication[i] || {};
                            console.log("hhb",ticketErrors,ticketTouched)
                            return (
													<div key={i} className="container flex flex-row">
															<div className="w-2/4 mb-4 mt-5 mr-10">
																	<Field name={`application.${i}.application_name`}>
																		{({ field }) => (
																				<div className='form-group'>
																					<label className="text-gray-600 block mb-2">Name of Service Provider</label>
																					<Field className={'block appearance-none rounded-lg w-full background-input-color border border-grey-light hover:border-grey px-2 py-2 rounded shadow form-control' + (ticketErrors.application_name && ticketTouched.application_name ? ' is-invalid' : '' ) }
																						type="text" name={`application.${i}.application_name`} />
																					<ErrorMessage name={`application.${i}.application_name`} component="div" className="invalid-feedback" />
																				</div>
																		)}
																	</Field>
															</div>

																<div className="w-2/4 mb-4 mt-5 ml-10">
																	<Field name={`application.${i}.description`}>
																		{({ field }) => (
																				<>
																					<label className="text-gray-600 block mb-2">Description of Service Provider</label>
																					<Field className='block appearance-none rounded-lg w-full background-input-color border border-grey-light hover:border-grey px-2 py-2 rounded shadow' 
																						type="text" name={`application.${i}.description`} />
																					<ErrorMessage name={`application.${i}.description`} component="div" className="invalid-feedback" />
																				</>
																		)}
																	</Field>
																</div>
                              </div>
                            );
                        }))}
                        </FieldArray>
                        <div className="my-4 flex items-center justify-end next-button-pci-manager mt-10">
                          <div className='ml-10 mr-10'>
                            <button type="button" onClick={(e)=>addPaymentType(e, values, setValues)} className='rounded-3xl bg-color-13aeb7 px-10 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out' >
                                Add
                            </button>
                          </div>
                          <div className='mr-10'>
                            <button type="submit" className='rounded-3xl bg-purple-900 px-10 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out'>
                                Complete
                            </button>
                          </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default QirAssistant;