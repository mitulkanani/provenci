import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma:any = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      const getCorrectUserDataByEmail = await prisma.user.findUnique({ 
        where:{
          email: req.query.email[0]
        }
      });

      let dataObjResetForm:any = JSON.parse(req.body);
      // let dataObj:any = [...dataObjResetForm]
      dataObjResetForm.user_id = getCorrectUserDataByEmail.id
      delete dataObjResetForm.email
      const updateUserProfile = await prisma.userProfile.upsert({
        where: { user_id: getCorrectUserDataByEmail.id },
        update: dataObjResetForm,
        create: dataObjResetForm,
      })
      if(updateUserProfile){
        res.status(200).json({ message: 'Data updated successfully',data:updateUserProfile });
      }else{
        res.status(400).json({ message: 'Something went wrong' });
      }
    } catch (error) {
      console.log("error",error)
      res.status(400).json({ message: 'Something went wrong' });
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
      console.log(getCorrectUserDataByIdPass)
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
