import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import CustomersPay from './CustomersPay'
import PciManager from './PciManager'
import { useEffect, useState } from 'react';
import QirAssistant from './QirAssistant';


export default function ProfilePage (paymentApplicationData) {
	const [stepCustomersPay,setStepCustomersPay]:any = useState(1);

	useEffect(()=>{
		console.log("Customer pay step",stepCustomersPay)
		if(stepCustomersPay === 4){
			fetch('/Files/Proven Certificate 1.pdf', {
				method: 'GET',
				headers: {
				  'Content-Type': 'application/pdf',
				},
			  })
			  .then((response) => response.blob())
			  .then((blob) => {
				// Create blob link to download
				const url = window.URL.createObjectURL(
				  new Blob([blob]),
				);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute(
				  'download',
				  `FileName.pdf`,
				);
			
				// Append to html link element page
				document.body.appendChild(link);
			
				// Start download
				link.click();
			
				// Clean up and remove the link
				link.parentNode.removeChild(link);
			});
		}
	},[stepCustomersPay])

	return (
		<div className="sm:p-3">
			{
                stepCustomersPay === 1 ? 
                <PciManager paymentApplicationData={paymentApplicationData} stepCustomersPay={stepCustomersPay} setStepCustomersPay={setStepCustomersPay}/> : 
					(stepCustomersPay === 2  ? <CustomersPay stepCustomersPay={stepCustomersPay} setStepCustomersPay={setStepCustomersPay}/> : 
					((stepCustomersPay === 3 || stepCustomersPay === 4) ? <QirAssistant stepCustomersPay={stepCustomersPay} setStepCustomersPay={setStepCustomersPay}/> : ''
				))
            }
		</div>
	)
}
  