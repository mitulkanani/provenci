import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Trainings from '../components/Trainings';

export default function Training () {
    return (
        <div className="sm:p-3">
            <Trainings />
        </div>
    )
}
