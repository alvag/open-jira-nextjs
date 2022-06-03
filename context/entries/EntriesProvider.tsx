import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface UIState {
    entries: Entry[];
}

const UI_INITIAL_STATE: UIState = {
    entries: []
};

export const EntriesProvider: FC<PropsWithChildren<any>> = ( { children } ) => {
    const [ state, dispatch ] = useReducer( entriesReducer, UI_INITIAL_STATE );

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post<Entry>( '/entries', { description } );

        dispatch( {
            type: '[Entry] Add-Entry',
            payload: data
        } );
    };

    const updateEntry = async ( { _id, description, status }: Entry ) => {
        try {
            const { data } = await entriesApi.put<Entry>( `/entries/${ _id }`, { description, status } );
            dispatch( {
                type: '[Entry] Update-Entry',
                payload: data
            } );
        } catch ( error ) {
            console.log( error );
        }
    };

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>( '/entries' );
        dispatch( { type: '[Entry] Load-Entries', payload: data } );
    };

    useEffect( () => {
        refreshEntries();
    }, [] );

    return (
        <EntriesContext.Provider value={ {
            ...state,
            addNewEntry,
            updateEntry
        } }>
            { children }
        </EntriesContext.Provider>
    );
};
