import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import CustomersPay from './CustomersPay'
import PciManager from './PciManager'
import { useEffect, useState } from 'react';
import QirAssistant from './QirAssistant';


export default function ProfilePage (paymentApplicationData) {
	const [stepCustomersPay,setStepCustomersPay]:any = useState(1);
	return (
		<div className="sm:p-3">
			{
                stepCustomersPay === 1 ? 
                <PciManager paymentApplicationData={paymentApplicationData} stepCustomersPay={stepCustomersPay} setStepCustomersPay={setStepCustomersPay}/> : 
					(stepCustomersPay === 2  ? <CustomersPay stepCustomersPay={stepCustomersPay} setStepCustomersPay={setStepCustomersPay}/> : 
					(stepCustomersPay === 3  ? <QirAssistant /> : ''
				))
            }
		</div>
	)
}
  