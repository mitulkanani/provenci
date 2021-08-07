import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import UserProfile from '../components/UserProfile/UserProfile'
import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from 'react';


export default function ProfilePage () {
	const [session, loading]:any = useSession()
	const [userData,setUserData]:any = useState();
	useEffect(() =>{
		if(session?.user?.data?.email){
			init()
		}
	},[session])
	
	const init = async () => {
		const response = await fetch(`/api/get-user-profile-data/${session?.user?.data?.email}`, {
			method: 'GET'
		});
		const data = await response.json()
		setUserData(data.data)
	}
	const router = useRouter()

	return (
		<div className="sm:p-3">
			{
				userData?.email && 
				<UserProfile userDataObj={userData}/>
			}
		</div>
	)
}
  