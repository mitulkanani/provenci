import type { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma:any = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {
      const getAllPaymentApplicationData = await prisma.paymentApplication.findMany({ 
        include: {
          VersionNumber: true, // All posts where authorId == 20
        },
      });
      if(getAllPaymentApplicationData){
        
        res.status(200).json({ message: 'Data found',data:getAllPaymentApplicationData });
      }else{
        res.status(400).json({ message: 'Data not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Something went wrong' });
    }
  
  
};
