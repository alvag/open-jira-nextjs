import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
    | { message: string }
    | IEntry;

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res );
        case 'GET':
            return getEntry( req, res );
        default:
            return res.status( 400 ).json( { message: 'Method not allowed' } );
    }

}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;

    await db.connect();
    const entry = await Entry.findById( id );
    await db.disconnect();

    if ( !entry ) {
        return res.status( 404 ).json( { message: 'No se encontró la entrada' } );
    }

    return res.status( 200 ).json( entry );
};

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;

    await db.connect();

    const entry = await Entry.findById( id );

    if ( !entry ) {
        await db.disconnect();
        return res.status( 404 ).json( { message: 'No se encontró la entrada' } );
    }

    const {
        description = entry.description,
        status = entry.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { new: true, runValidators: true } );
        return res.status( 200 ).json( updatedEntry! );
    } catch ( error: any ) {
        return res.status( 400 ).json( { message: error.errors.status.message } );
    } finally {
        await db.disconnect();
    }

};
