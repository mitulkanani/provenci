import React, { ReactNode, useEffect, useState } from 'react'
import {
    withFormik, FormikProps, FormikErrors, Form, Field
  } from 'formik';
import { signIn,useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

type Props = {
    
}

// Shape of form values
interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  

    const { touched, errors, isSubmitting, message,isValid } = props;
    return (
      <Form>
        <div className="mb-4">
          <label className="font-bold text-gray-600 block mb-2">Username or Email</label>
          <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="email" name="email" />
          {touched.email && errors.email && <div className='text-red-500'>{errors.email}</div>}
        </div>
  
        <div className="mb-4">
          <label className="font-bold text-gray-600 block mb-2">Password</label>
          <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="password" name="password" />
          {touched.password && errors.password && <div className='text-red-500'>{errors.password}</div>}
        </div>
  
        <div className="flex items-center justify-between">
        
          <button type="submit" className={!isValid ? 'bg-gray-300 text-white py-2 px-4 rounded':'bg-color-13aeb7 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out'} disabled={isSubmitting}>
            Login
          </button>
          <a className="no-underline inline-block align-baseline font-bold text-sm text-gray-600 hover:text-blue-dark float-right" href="#">
            Forgot Password?
          </a>
        </div>
      </Form>
    );
  };

  // The type of props LoginForm receives
 interface LoginFormProps {
    initialEmail?: string;
    message: string; // if this passed all the way through you might do this or make a union type
  }

//   / Wrap our form with the withFormik HoC
 const LoginForm = withFormik<LoginFormProps, FormValues>({
   // Transform outer props into form values
   mapPropsToValues: props => {
     return {
       email: props.initialEmail || '',
       password: '',
     };
   },
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
     let errors: FormikErrors<FormValues> = {};
     if (!values.email) {
       errors.email = 'Email is required';
     } if (!values.password) {
       errors.password = 'Password is required';
     }
     return errors;
   },
 
   handleSubmit: async values => {
    const {email,password} = values 
    const res = signIn('credentials',
      {
        email,
        password,
        callbackUrl: `${window.location.origin}/profile-page`
      }
    )
     // do submitting things
   },
 })(InnerForm);

const Login = () => {
    const router = useRouter()
const [session, loading]:any = useSession()

useEffect(() => {
  // if(loading && session?.accessToken) {
  //   if(session?.user?.data?.isFirstTimeLogin){
  //     router.push(`/set-password/${session.user.data.id}`)
  //   }else{
  //     router.push('/')
  //   }
  // }
}, [loading, session])
    return(
      <div className="bg-gradient-to-r login-gradiant-background focus:from-pink-500 focus:to-yellow-500 sign-in-page-height">
        <div className="container mx-auto h-full flex justify-center items-center">
          <div className="w-1/3">
            <div className="border-teal p-16 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
              <LoginForm message="Sign up" />
            </div>
          </div>
        </div>
        {/* <LoginForm message="Sign up" /> */}
      </div>
    )
}

export default Login;
