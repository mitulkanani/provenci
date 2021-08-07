import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma:any = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      let dataObjResetForm:any = JSON.parse(req.body);
      // let dataObj:any = [...dataObjResetForm]
      console.log(dataObjResetForm)
      const addEmployeeTraining = await prisma.employeeTraining.createMany({
        data: dataObjResetForm,
      })
      console.log(addEmployeeTraining)
      if(addEmployeeTraining){
        res.status(200).json({ message: 'Training Data added successfully',data:addEmployeeTraining });
      }else{
        res.status(400).json({ message: 'Something went wrong' });
      }
    } catch (error) {
        console.log("error",error.code)
      res.status(400).json({ message: error.message });
    }
  }else{
    try {
      const getCorrectUserDataByIdPass = await prisma.user.findUnique({ 
        where:{
          email: req.query.email[0]
        },
        include: {
          UserProfile: true, // All posts where authorId == 20
        },
      });
      if(getCorrectUserDataByIdPass){
        
        res.status(200).json({ message: 'Data found',data:getCorrectUserDataByIdPass });
      }else{
        res.status(400).json({ message: 'Data not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
  
};
