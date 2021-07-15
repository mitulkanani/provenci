import Layout from '../../components/Layout/Layout'
import ResetPassword from '../../components/Auth/ResetPassword'
import ErrorPage from "next/error";
import { useEffect } from 'react';



export default function LoginIndexPage() {

  useEffect(()=>{
    console.log("called")
  },[])

    return (
        // <Layout title="Proven Cli">
            <ResetPassword />
        // </Layout>
    )
}
