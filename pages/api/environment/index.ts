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
 *  @openapi
 *  /api/environment:
 *  get:
 *    summary: Returns list of environments.
 *    description: Returns the list of environments,
 *    responses:
 *      '200':
 *        description: A response object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: '1234567890'
 *                       name:
 *                         type: string
 *                         example: 'DEV'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *      '400':
 *        description: A error object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: 'Bad Request'
 *
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
