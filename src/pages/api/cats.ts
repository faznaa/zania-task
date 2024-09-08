// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if(req.method == 'POST') {
        const items = req.body.items
        if(!items) return res.status(500).json({ message: 'Items not found'})
        
    }
  res.status(200).json({ name: 'John Doe' })
}
