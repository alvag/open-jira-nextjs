import { UIState } from './EntriesProvider';
import { Entry } from '../../interfaces';

type UIActionType =
    | { type: '[Entry] Add-Entry', payload: Entry }
    | { type: '[Entry] Update-Entry', payload: Entry }
    | { type: '[Entry] Load-Entries', payload: Entry[] };

export const entriesReducer = ( state: UIState, action: UIActionType ): UIState => {
    switch ( action.type ) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payload ]
            };
        case '[Entry] Update-Entry':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if ( entry._id === action.payload._id ) {
                        // return action.payload;
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                } )
            };
        case '[Entry] Load-Entries':
            return {
                ...state,
                entries: [ ...action.payload ]
            };
        default:
            return state;
    }
};
