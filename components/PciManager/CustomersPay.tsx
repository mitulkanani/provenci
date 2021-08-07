import React, { ReactNode, useEffect, useState } from 'react'
import {
    withFormik, FormikProps, FormikErrors, Form, Field
  } from 'formik';
import { signIn,useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";

type Props = {
    
}

// Shape of form values
interface FormValues {
  payment_type: Array;
}

interface OtherProps {
    message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message,isValid } = props;

    function onChange(value) {
        console.log(`selected ${value}`);
      }
    return (
      <Form>
        <div className="container flex flex-row ">
          <div className="height-feet-content container flex flex-row flex-wrap">
            
            <div className='w-full'>
              <span className="text-base font-semibold text-black">How do your customers pay you?</span>
            </div>
            <div className="w-full my-2 mt-5">
              <div className=" my-2">
                <label className="py-2 flex items-center">
                  <div className="w-1/4 tag text-gray-500">My Customers are taken to another site to pay:</div>
                  <Field type="checkbox" name='payment_type' id='payment_type'  className="regular-checkbox big-checkbox ml-5" /><label htmlFor='payment_type'></label>
                </label>
              </div>
            </div>
            <div className="w-full my-2 mt-5">
              <div className=" my-2">
                <label className="py-2 flex items-center">
                  <div className="w-1/4 tag text-gray-500">My payment page is setup in on iFrame::</div>
                  <Field type="checkbox" name='payment_type_i_frame' id='payment_type_i_frame'  className="regular-checkbox big-checkbox ml-5" /><label htmlFor='payment_type_i_frame'></label>
                </label>
              </div>
            </div>
            <div className="my-4 w-full next-button-pci-manager mt-10">
              <div className='mr-10 text-right'>
                <button type="submit" className='rounded-3xl bg-purple-900 px-10 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out'>
                    Next
                </button>
              </div>
            </div>
          
          </div>
					
				</div>
      </Form>
    );
  };

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

  // The type of props LoginForm receives
 interface LoginFormProps {
    email?: string;
    pciManageForm: any;
    setStepCustomersPay: Function,
    stepCustomersPay: Number,
    message: string; // if this passed all the way through you might do this or make a union type
  }

  interface UserProfileProps {
    userDataObj: object,
    setStepCustomersPay: Function,
    stepCustomersPay: Number,
  }

//   / Wrap our form with the withFormik HoC
 const PciManagerForm = withFormik<LoginFormProps, FormValues>({
   // Transform outer props into form values
   
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (values.payment_type?.length === 0) {
      errors.payment_type = 'Email is required';
    }
    if (values.payment_type_i_frame?.length === 0) {
      errors.payment_type_i_frame = 'Email is required';
    }
     return errors;
   },
 
   handleSubmit: async values => {
    const {email} = values 
    console.log("values",values)
    let currentStep = values.userProfileProps.stepCustomersPay
    let nextStepFun = values.userProfileProps.setStepCustomersPay
    nextStepFun(currentStep + 1)
   },
 })(InnerForm);

const CustomersPay = (props:UserProfileProps) => {
    const router = useRouter()
const [session, loading]:any = useSession()

useEffect(() => {
  
}, [loading, session])
    return(
      <div className="focus:from-pink-500 focus:to-yellow-500 user-profile-page-height">
        <PciManagerForm userProfileProps={props} message="Sign up" />  
        <ToastContainer closeOnClick/>
      </div>
    )
}

export default CustomersPay;
