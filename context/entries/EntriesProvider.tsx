import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces';


export interface UIState {
    entries: Entry[];
}

const UI_INITIAL_STATE: UIState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En progreso Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
            status: 'in-progress',
            createdAt: Date.now() - 1000000000,
        },
        {
            _id: uuidv4(),
            description: 'Terminadas Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        }
    ]
};

export const EntriesProvider: FC<PropsWithChildren<any>> = ( { children } ) => {
    const [ state, dispatch ] = useReducer( entriesReducer, UI_INITIAL_STATE );

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            status: 'pending',
            createdAt: Date.now(),
        };

        dispatch( {
            type: '[Entry] Add-Entry',
            payload: newEntry
        } );
    };

    const updateEntry = ( entry: Entry ) => {
        dispatch( {
            type: '[Entry] Update-Entry',
            payload: entry
        } );
    };

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
