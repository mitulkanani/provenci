import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import PciManagerComp from '../components/PciManager'
import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";



export default function PciManager () {
	const [session, loading]:any = useSession()
	const [paymentApplicationData,setPaymentApplicationData]:any = useState();
	useEffect(() =>{
		init()
	},[])
	
	const init = async () => {
		const response = await fetch(`/api/get-payment-applications`, {
			method: 'GET'
		});
		const data = await response.json()
		setPaymentApplicationData(data.data)
	}
	const router = useRouter()

	return (
		<div className="sm:p-3">
			{
				paymentApplicationData && 
				<PciManagerComp paymentApplicationData={paymentApplicationData} />
			}
		</div>
	)
}
  