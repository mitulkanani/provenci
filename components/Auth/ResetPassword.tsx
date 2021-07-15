import React, { ReactNode, useEffect, useState } from 'react'
import {
    withFormik, FormikProps, FormikErrors, Form, Field
  } from 'formik';
import { signIn,useSession,signOut } from 'next-auth/client'
import router, { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';

type Props = {
    
}

// Shape of form values
interface FormValues {
    old_password: string;
    new_password: string;
    confirm_password: string;
    id:any;
}

interface OtherProps {
    message: string;
    id:any;
}

const notify = () => toast("Wow so easy!");

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { values,touched, errors, isSubmitting, message,isValid } = props;
    return (
      <Form>
        <div className="mb-4">
          <label className="font-bold text-gray-600 block mb-2">Old Password</label>
          <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="password" name="old_password" />
          {touched.old_password && errors.old_password && <div className='text-red-500'>{errors.old_password}</div>}
        </div>
  
        <div className="mb-4">
          <label className="font-bold text-gray-600 block mb-2">New Password</label>
          <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="password" name="new_password" />
          {touched.new_password && errors.new_password && <div className='text-red-500'>{errors.new_password}</div>}
        </div>

        <div className="mb-4">
          <label className="font-bold text-gray-600 block mb-2">Confirm New Password</label>
          <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="password" name="confirm_password" />
          {touched.confirm_password && errors.confirm_password && <div className='text-red-500'>{errors.confirm_password}</div>}
        </div>
  
        <div className="flex items-center justify-between">
        
          <button type="submit" className={!isValid ? 'bg-gray-300 text-white py-2 px-4 rounded':'bg-color-13aeb7 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out'} disabled={isSubmitting}>
            Reset Password
          </button>
        </div>
      </Form>
    );
  };

  // The type of props LoginForm receives
 interface LoginFormProps {
    initialEmail?: string;
    id?: any; 
    message: string; // if this passed all the way through you might do this or make a union type
  }

//   / Wrap our form with the withFormik HoC
 const ResetPasswordForm = withFormik<LoginFormProps, FormValues>({
   // Transform outer props into form values
   mapPropsToValues: props => {
     return {
        old_password: '',
        new_password: '',
        confirm_password: '',
        id:props.id
     };
   },
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
     let errors: FormikErrors<FormValues> = {};
     if (!values.old_password) {
       errors.old_password = 'Old password is required';
     } if (!values.new_password) {
       errors.new_password = 'Password is required';
     } if (!values.confirm_password) {
        errors.confirm_password = 'Confirm password is required';
      } if(values.confirm_password !== values.new_password){
        errors.confirm_password = 'Password not matched';
      }
     return errors;
   },
 
   handleSubmit: async values => {
    const {old_password,new_password,confirm_password} = values 
    const response = await fetch(`/api/set-password/${values.id}`, {
      method: 'POST',
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    notify();
    signOut();
    router.push('/')
    
   },
 })(InnerForm);

const ResetPassword = () => {
// const prisma = new PrismaClient()
const router = useRouter()
const [id,setId] = useState(router.query.userId);
const userId = router.query.userId
const [session, loading] = useSession()
useEffect(() => {
  if(id) {
    // router.push('/')
  }
}, [id])
    return(
      <div className="bg-gradient-to-r login-gradiant-background focus:from-pink-500 focus:to-yellow-500 sign-in-page-height">
        <div className="container mx-auto h-full flex justify-center items-center">
          <div className="w-1/3">
            <div className="border-teal p-16 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
              <ResetPasswordForm id={userId} message="Sign up" />
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    )
}

export default ResetPassword;
