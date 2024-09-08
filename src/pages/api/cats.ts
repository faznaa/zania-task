// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {  Item, connectToDatabase } from '@/lib/db';
import { sampleData, sortData } from '@/utils/data';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    await connectToDatabase()
    if(req.method == 'POST') {
        const items = req.body.items
        if(!items) return res.status(400).json({ message: 'Items not found'})
        try{
            for (const item of items) {
                await Item.findOneAndUpdate({ title: item.title }, item, { new:true,upsert: true })
            }
            return res.status(200).json({message: 'Succesfully added data'})
    
        }catch(err){
            console.log(err)
            return res.status(500).json({message: 'Error updating data..'})
        }
        
    }
    if (req.method === 'GET') {
        try {
          const existingItems = await Item.find({});
          console.log('ex',existingItems)
          if (existingItems.length === 0) {
            await Item.insertMany(sampleData);
            return res.status(200).json({ message: 'Data inserted', data: sortData(sampleData) });
          } else {
            return res.status(200).json({ message: 'Data already exists', data: sortData(existingItems) });
          }
        } catch (error) {
            console.log(error)
          return res.status(500).json({ message: 'Error fetching data', error });
        }
    }

 return res.status(400).json({ message: 'Method not supported' })
}
