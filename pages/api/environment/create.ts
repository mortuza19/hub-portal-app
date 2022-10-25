// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Environment from '../../../models/dbModels/environment';

type Data = {
    message: string;
    success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
    await dbConnect();
    if (method === 'POST') {
        try {
            await Environment.create(req.body);
            res.status(201).json({ success: true, message: 'Environment is created successfully!' });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    }
}
