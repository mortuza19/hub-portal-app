// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Environment, { IEnvironmentResponse } from '../../../models/dbModels/environment';

type Data = {
    message: string;
    data?: IEnvironmentResponse;
    success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
    const id = req.query.id;
    await dbConnect();
    if (method === 'GET') {
        try {
            const envionmentList = await Environment.findById(id);
            const data: IEnvironmentResponse = { id: envionmentList._id.toString(), name: envionmentList.name };
            res.status(200).json({ success: true, data, message: 'Success' });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    } else if (method === 'DELETE') {
        try {
            await Environment.deleteOne({ id });
            res.status(200).json({ success: true, message: 'Environment deleted successfully!' });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    } else if (method === 'PUT') {
        try {
            await Environment.updateOne({ id }, { $set: req.body });
            res.status(200).json({
                success: true,
                message: 'Environment updated successfully!'
            });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    } else {
        res.status(404).json({ success: false, message: 'Route not found!' });
    }
}
