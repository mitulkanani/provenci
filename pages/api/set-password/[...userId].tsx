import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma:any = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const dataObjResetForm:any = JSON.parse(req.body);
    const getCorrectUserDataByIdPass = await prisma.user.findUnique({ 
      where:{
        id: parseInt(dataObjResetForm.id)
      }
    });
    if(getCorrectUserDataByIdPass){
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(dataObjResetForm.id),
        },
        data: {
          password: dataObjResetForm.new_password,
          isFirstTimeLogin:false
        },
      })
      res.status(200).json(updateUser);
    }else{
      res.status(400).json({ message: 'Data not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
