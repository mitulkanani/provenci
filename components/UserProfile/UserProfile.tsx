import React, { ReactNode, useEffect, useState } from 'react'
import {
    withFormik, FormikProps, FormikErrors, Form, Field
  } from 'formik';
import { signIn,useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';

type Props = {
    
}

// Shape of form values
interface FormValues {
    email: string;
    dba: string;
    main: string;
    mobile: string;
    contact: string;
    address_line_1: string;
    address_line_2: string;
    company: string;
    mid: string;
    state: string;
    country: string;
    mcc: string;
    url: string;
    ip_address: string;
}

interface OtherProps {
    message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message,isValid } = props;
    return (
      <Form>
        <div className="container flex flex-row ">
          <div className="height-feet-content container border-2 border-gray-100 flex flex-row flex-wrap w-3/4 border-teal p-4 border-t-12 bg-white rounded-lg shadow-lg">
            <div className="p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">DBA</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="dba" />
              {touched.dba && errors.dba && <div className='text-red-500'>{errors.dba}</div>}
            </div>

            <div className="p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">MID</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="mid" />
              {touched.mid && errors.mid && <div className='text-red-500'>{errors.mid}</div>}
            </div>

            <div className="p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Company</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="company" />
              {touched.company && errors.company && <div className='text-red-500'>{errors.company}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Contact</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="contact" />
              {touched.contact && errors.contact && <div className='text-red-500'>{errors.contact}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Main</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="main" />
              {touched.main && errors.main && <div className='text-red-500'>{errors.main}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Mobile</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="mobile" />
              {touched.mobile && errors.mobile && <div className='text-red-500'>{errors.mobile}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Email</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="email" name="email" disabled/>
              {touched.email && errors.email && <div className='text-red-500'>{errors.email}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Business address Line 1</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="address_line_1" />
              {touched.address_line_1 && errors.address_line_1 && <div className='text-red-500'>{errors.address_line_1}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Business address Line 2</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="address_line_2" />
              {touched.address_line_2 && errors.address_line_2 && <div className='text-red-500'>{errors.address_line_2}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">Country</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="country" />
              {touched.country && errors.country && <div className='text-red-500'>{errors.country}</div>}
            </div>

            <div className="mb-4 p-4 w-4/12">
              <label className="font-bold text-gray-600 block mb-2">State</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="state" />
              {touched.state && errors.state && <div className='text-red-500'>{errors.state}</div>}
            </div>

            <div className="w-full flex mb-4 p-4 w-4/12">
              <div className='w-2/4'>
                <div className='w-full color-13aeb7'>
                  <h2>Payment channels your business serves:</h2>
                </div>

                <div className="flex w-full">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="payment_channels" value="mail_odrer" />
                    <span className="ml-2">Mail Order /Telephone Order</span>
                  </label>
                </div>

                <div className="w-full">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="payment_channels" value="ecommerce" />
                    <span className="ml-2">Ecommerce/Online</span>
                  </label>
                </div>

                <div className="w-full">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="payment_channels" value="card_present" />
                    <span className="ml-2">Card Present (Face to Face)</span>
                  </label>
                </div>

              </div>
              <div className='w-2/4'>
                <div className='w-full color-13aeb7'>
                  <h2>What payment channels are covered by this SAQ:</h2>
                </div>

                <div className="flex w-full">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="payment_channels_covered" value="mail_odrer" />
                    <span className="ml-2">Mail Order /Telephone Order</span>
                  </label>
                </div>

                <div className="w-full">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="payment_channels_covered" value="ecommerce" />
                    <span className="ml-2">Ecommerce/Online</span>
                  </label>
                </div>

                <div className="w-full">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="payment_channels_covered" value="card_present" />
                    <span className="ml-2">Card Present (Face to Face)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="my-4 flex items-center justify-between">
					    <button type="submit" className={!isValid ? 'bg-gray-300 text-white py-2 px-4 rounded':'bg-color-13aeb7 transform hover:scale-110 text-white py-2 px-4 rounded transition duration-700 ease-in-out'} disabled={isSubmitting}>
                  Download Begin
              </button>
					  </div>
          
          </div>

          <div className="w-1/4 ml-4 border-2 border-gray-100 border-teal p-4 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
            <div className='flex flex-row'>
              <div className='w-full' role="group" aria-labelledby="checkbox-group">
                <div className='w-full color-13aeb7'>
                  <h2>Type(s) of Business:</h2>
                </div>

                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="retailer" />
                    <span className="ml-2">Retailer</span>
                  </label>
                </div>
                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="grocery" />
                    <span className="ml-2">Grocery</span>
                  </label>
                </div>
                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="petroleum" />
                    <span className="ml-2">Petroleum</span>
                  </label>
                </div>

                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="ecommerce" />
                    <span className="ml-2">Ecommerce/Online</span>
                  </label>
                </div>

                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="telecommunications" />
                    <span className="ml-2">Telecommunications</span>
                  </label>
                </div>

                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="moto" />
                    <span className="ml-2">MOTO</span>
                  </label>
                </div>

                <div className="w-full my-4">
                  <label className="py-2 flex items-center">
                    <Field type="checkbox" name="business_type" value="others" />
                    <span className="ml-2">Others</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              <label className="font-bold text-gray-600 block mb-2">MCC</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="mcc" />
              {touched.mcc && errors.mcc && <div className='text-red-500'>{errors.mcc}</div>}
            </div>

            <div className="my-4">
              <label className="font-bold text-gray-600 block mb-2">URL</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' type="text" name="url" />
              {touched.url && errors.url && <div className='text-red-500'>{errors.url}</div>}
            </div>

            <div className="my-4">
              <label className="font-bold text-gray-600 block mb-2">IP Address</label>
              <Field className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow' component="textarea"
                rows="2" name="ip_address" />
              {touched.ip_address && errors.ip_address && <div className='text-red-500'>{errors.ip_address}</div>}
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
    userProfileProps: any;
    message: string; // if this passed all the way through you might do this or make a union type
  }

  interface UserProfileProps {
    userDataObj: object
  }

//   / Wrap our form with the withFormik HoC
 const UserProfileForm = withFormik<LoginFormProps, FormValues>({
   // Transform outer props into form values
   mapPropsToValues: props => {
     let userProfleData = props?.userProfileProps?.UserProfile[0]
     return {
      email: props.userProfileProps?.email || '',
      dba: userProfleData?.dba || '',
      main: userProfleData?.main || '',
      mobile: userProfleData?.mobile || '',
      contact: userProfleData?.contact || '',
      address_line_1: userProfleData?.address_line_1 || '',
      address_line_2: userProfleData?.address_line_2 || '',
      company: userProfleData?.company || '',
      mid: userProfleData?.mid || '',
      state: userProfleData?.state || '',
      country: userProfleData?.country || '',
      mcc: userProfleData?.mcc || '',
      url: userProfleData?.url || '',
      ip_address: userProfleData?.ip_address || '',
      business_type:userProfleData?.business_type || '',
      payment_channels:userProfleData?.payment_channels || '',
      payment_channels_covered:userProfleData?.payment_channels_covered || '',
     };
   },
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
    const regxValidUrl = /^(http|HTTP)+(s|S)?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._\$\(\)/]+$/g;
    const regxForIp = /^(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)$/;
    if (!values.email) {
      errors.email = 'Email is required';
    } if (!values.dba) {
      errors.dba = 'DBA is required';
    }if (!values.main) {
      errors.main = 'main is required';
    } if (!values.mobile) {
      errors.mobile = 'mobile is required';
    }if (!regex.test(values.mobile)) {
      errors.mobile = "Invalid phone number";
    }if (!regex.test(values.contact)) {
      errors.contact = "Invalid contact";
    } if (!values.contact) {
      errors.contact = 'contact is required';
    } if (!values.address_line_1) {
      errors.address_line_1 = 'Address line 1 is required';
    } if (!values.address_line_2) {
      errors.address_line_2 = 'Address line 2 is required';
    } if (!values.company) {
      errors.company = 'company is required';
    } if (!values.mid) {
      errors.mid = 'mid is required';
    } if (!values.state) {
      errors.state = 'state is required';
    } if (!values.country) {
      errors.country = 'country is required';
    } if (!values.mcc) {
      errors.mcc = 'mcc is required';
    } if (!values.url) {
      errors.url = 'url is required';
    }if(!regxValidUrl.test(values.url)){
      errors.url = 'url is not valid';
    }
    // if(!regxForIp.test(values.ip_address)){
    //   errors.ip_address = 'ip address is not valid';
    // } 
    if (!values.ip_address) {
      errors.ip_address = 'ip address is required';
    } 
     return errors;
   },
 
   handleSubmit: async values => {
    const {email} = values 
    const response = await fetch(`/api/get-user-profile-data/${values.email}`, {
      method: 'POST',
      body: JSON.stringify(values)
    });
    const data:any = await response.json()
    if(!response.ok){
      notiFy(data.message)
    }else{
      notiFy(data.message)
    }
     // do submitting things
   },
 })(InnerForm);

const UserProfile = (props:UserProfileProps) => {
    const router = useRouter()
const [session, loading]:any = useSession()

useEffect(() => {
  
}, [loading, session])
    return(
      <div className="focus:from-pink-500 focus:to-yellow-500 user-profile-page-height">
        <UserProfileForm userProfileProps={props.userDataObj} message="Sign up" />  
        <ToastContainer closeOnClick/>
      </div>
    )
}

export default UserProfile;
