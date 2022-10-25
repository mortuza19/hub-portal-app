// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../utils/dbConnect';
import Environment, { IEnvironmentResponse } from '../../../models/dbModels/environment';

type Data = {
    message: string;
    data?: IEnvironmentResponse[];
    success: boolean;
};

/**
 * @swagger
 * /api/environment:
 *   get:
 *     description: Returns the list of environments,
 *     responses:
 *       200:
 *         description: Returns list of environment
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
    await dbConnect();
    if (method === 'GET') {
        try {
            const envionmentList = await Environment.find({});
            const data: IEnvironmentResponse[] = envionmentList.map((env) => ({
                id: env._id.toString(),
                name: env.name
            }));
            res.status(200).json({ success: true, data, message: 'Success' });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Bad request' });
        }
    } else {
        res.status(404).json({ success: false, message: 'Route not found!' });
    }
}
