import React,{ useEffect, useState } from 'react';
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

const  CustomersPay = (props) => {
  const{setStepCustomersPay,stepCustomersPay,paymentApplicationData} = props;
  const [optionPaymentApplications,setOptionPaymentApplications] = useState([]);
  const [optionVersion,setOptionVersion] = useState([]);
  const [selectedOption,setSelectedOption] = useState();
  const [selectedOptionVersion,setSelectedVersionOption] = useState();
  const [selectedOptionVendor,setSelectedVendorOption] = useState();
  const initialValues = {
    paymentApplication: [
      {
        payment_type:'',
        application_name:'',
        version_name:'',
        application_vendor:'',
        application_expiry:new Date()
      }
    ]
  };
  const [startDate, setStartDate] = useState(new Date());

  useEffect(()=>{
    if(paymentApplicationData){
      let setOptionForPaymentApplication = paymentApplicationData.paymentApplicationData.map((val)=>{
        return {
          value : val.id,
          label : val.paymentName
        }
      })
      setOptionPaymentApplications(setOptionForPaymentApplication)
      // console.log('setOptionForPaymentApplication',setOptionForPaymentApplication)
    }
  },[paymentApplicationData])

  const validationSchema = Yup.object().shape({
      // paymentApplication: Yup.array().of(
      //     Yup.object().shape({
      //         application_name: Yup.object()
      //             .required('Application name is required'),
      //         version_name: Yup.object()
      //             .required('Version name is required'),
      //         application_vendor: Yup.object()
      //             .required('Version name is required')
      //     })
      // )
  });

  const options = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
  ];

  function addPaymentType(e, values, setValues) {
    console.log("allecd",values)
    const paymentApplication = [...values.paymentApplication];
    paymentApplication.push({
      payment_type:'',
      application_name:'',
      version_name:'',
      application_vendor:'',
      application_expiry: new Date(),
      is_application_listed:''
    })
    setValues({ ...values, paymentApplication });
  }

  function onSubmit(fields) {

      // display form field values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      let currentStep = stepCustomersPay + 1
      setStepCustomersPay(currentStep)
  }

  const handleChange = (e,i,values,setValues) => {
    
    let optionForVersions = paymentApplicationData.paymentApplicationData.filter((paymentTypes) => paymentTypes.id === e.value);
    console.log("optionForVersions",e," - ",optionForVersions)
    let setOptionForVersions = optionForVersions[0] && optionForVersions[0].VersionNumber.map((val)=>{
      return {
        value : val.id,
        label : val.name
      }
    })
    setOptionVersion(setOptionForVersions)

    const paymentApplication = [...values.paymentApplication];
    paymentApplication[i].application_name = e
    paymentApplication[i].version_name = '';
    console.log('paymentApplication',paymentApplication)
    setValues({ ...values, paymentApplication });
  };
  const handleChangeVersion = (e,i,values,setValues) => {
    console.log("allecd",e)
    const paymentApplication = [...values.paymentApplication];
    paymentApplication[i].version_name = e
    setValues({ ...values, paymentApplication });
    // setSelectedVersionOption(selectedOption);
  };
  const handleChangeVendor = (e,i,values,setValues) => {
    setSelectedVendorOption(selectedOption);
    const paymentApplication = [...values.paymentApplication];
    paymentApplication[i].application_vendor = e
    setValues({ ...values, paymentApplication });
  };
  const handleChangeDate = (e,i,values,setValues) => {
    const paymentApplication = [...values.paymentApplication];
    console.log("selected date",e)
    paymentApplication[i].application_expiry = new Date(e)
    setValues({ ...values, paymentApplication });
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f3f3f3",
      color: '#6b7280',
      opicity:1,
      // match with the menu
      borderRadius: state.isFocused ? "8px" : '8px',
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: '8px',
      color: '#6b7280',

      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      color: '#6b7280',
    
    }),
    singleValue: base => ({
      ...base,
      color: '#6b7280'
    })
  };
  console.log("initialValues",initialValues)
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
                        <FieldArray name="paymentApplication">
                        {() => (values.paymentApplication.map((application, i) => {
                            const ticketErrors = errors.paymentApplication?.length && errors.paymentApplication[i] || {};
                            const ticketTouched = touched.paymentApplication && touched.paymentApplication[i] || {};
                            return (
                                <div key={i} className="container flex flex-row ">
                                    <div className="height-feet-content container ">
                                      <div className="w-2/4 my-2">
                                        <label className="py-2 flex items-center">
                                          <div className="tag text-gray-500">Does your organization use one or more payment application?</div>
                                          <Field type="checkbox" name={`application.${i}.payment_type`} id={`application.${i}.payment_type`}  className="regular-checkbox big-checkbox ml-5" /><label htmlFor={`application.${i}.payment_type`} className='ml-5'></label>
                                        </label>
                                      </div>
                          
                                      <div className="w-1/4 mb-4 mt-5">
                                        <Field name={`application.${i}.application_name`}>
                                          {({ field }) => (
                                              <>
                                                <label className="font-bold text-gray-500 block mb-2">Payment application name</label>
                                                <Select
                                                name={`application.${i}.application_name`}
                                                  value={application[i]?.application_name?.value}
                                                  styles={customStyles}
                                                  className={(ticketErrors.application_name && ticketTouched.application_name ? 'is-invalid' : '')}
                                                  onChange={(e) => handleChange(e,i,values, setValues)}
                                                  options={optionPaymentApplications}
                                                />
                                                <ErrorMessage name={`application.${i}.application_name`} component="div" className="invalid-feedback" />
                                              </>
                                          )}
                                        </Field>
                                      </div>
                          
                                      <div className="w-1/4 mb-4 mt-5">
                                        <Field name={`application.${i}.version_name`}>
                                            {({ field }) => (
                                                <>
                                                  <label className="font-bold text-gray-500 block mb-2">Version name</label>
                                                  <Select
                                                  name={`application.${i}.version_name`}
                                                    value={application[i]?.version_name?.value}
                                                    styles={customStyles}
                                                    onChange={(e) => handleChangeVersion(e,i,values, setValues)}
                                                    options={optionVersion}
                                                  />
                                                </>
                                            )}
                                          </Field>
                                          <ErrorMessage name={`application.${i}.version_name`} component="div" className="invalid-feedback" />
                                      </div>
                          
                                      <div className="w-1/4 mb-4 mt-5">
                                        <Field name={`application.${i}.application_vendor`}>
                                          {({ field }) => (
                                              <>
                                                <label className="font-bold text-gray-500 block mb-2">Application Vendor</label>
                                                <Select
                                                name={`application.${i}.application_vendor`}
                                                  value={application[i]?.application_vendor?.value}
                                                  styles={customStyles}
                                                  onChange={(e) => handleChangeVendor(e,i,values, setValues)}
                                                  options={options}
                                                />
                                              </>
                                          )}
                                        </Field>
                                        <ErrorMessage name={`application.${i}.application_vendor`} component="div" className="invalid-feedback" />
                                      </div>
                          
                                      <div className="w-full my-2">
                                        <label className="py-2 flex items-center">
                                          <div className="tag text-gray-500">Is Application PA-DSS Listed?</div>
                                          <Field type="checkbox" name={`application.${i}.is_application_listed`} id={`application.${i}.is_application_listed`}  className="regular-checkbox big-checkbox ml-5" /><label htmlFor={`application.${i}.is_application_listed`} className='ml-5' ></label>
                                        </label>
                                      </div>
                          
                                      <div className="mb-4 mt-5">
                                        <Field name={`application.${i}.application_expiry`}>
                                          {({ field }) => (
                                              <>
                                                <label className="font-bold text-gray-500 block mb-2">PA-DSS List Expiry</label>
                                                <Field type="date" className='w-1/4 background-input-color pl-2 pr-2 pt-2 pb-2 text-gray-500 rounded-md unstyled' value={values?.application_expiry} onChange={(date) => handleChangeDate(date,i,values, setValues)} />
                                                {/* <DatePicker className='w-full background-input-color pl-8 pr-8 pt-2 pb-2' selected={values?.application_expiry} onChange={(date) => handleChangeDate(date,i,values, setValues)} /> */}
                                              </>
                                          )}
                                        </Field>
                                        <ErrorMessage name={`application.${i}.application_expiry`} component="div" className="invalid-feedback" />
                                      </div>
                                      
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
                                Next
                            </button>
                          </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CustomersPay;