import mongoose from 'mongoose';

/**
 *  0 = disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 */

const mongoConnection = {
    isConnected: 0
};

export const connect = async () => {
    if ( mongoConnection.isConnected === 1 ) {
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[ 0 ].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            return;
        }

        await disconnect();
    }

    await mongoose.connect( process.env.MONGODB_URI! );
    console.log( 'MongoDB connected', process.env.MONGODB_URI! );
    mongoConnection.isConnected = 1;
};

export const disconnect = async () => {
    if ( mongoConnection.isConnected !== 0 && process.env.NODE_ENV === 'production' ) {
        await mongoose.disconnect();
        console.log( 'MongoDB disconnected' );
    }
};
