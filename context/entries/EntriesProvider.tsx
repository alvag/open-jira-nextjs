import {FC, PropsWithChildren, useEffect, useReducer} from 'react';
import {EntriesContext} from './EntriesContext';
import {entriesReducer} from './entriesReducer';
import {Entry} from '../../interfaces';
import {entriesApi} from '../../apis';
import {useSnackbar} from "notistack";

export interface UIState {
    entries: Entry[];
}

const UI_INITIAL_STATE: UIState = {
    entries: []
};

export const EntriesProvider: FC<PropsWithChildren<any>> = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, UI_INITIAL_STATE);
    const {enqueueSnackbar} = useSnackbar();

    const addNewEntry = async (description: string) => {
        const {data} = await entriesApi.post<Entry>('/entries', {description});

        dispatch({
            type: '[Entry] Add-Entry',
            payload: data
        });

        enqueueSnackbar('Entry added', {variant: 'success', autoHideDuration: 1500});
    };

    const updateEntry = async ({_id, description, status}: Entry, showSnackBar = false) => {
        try {
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status});
            dispatch({
                type: '[Entry] Update-Entry',
                payload: data
            });

            if (showSnackBar)
                enqueueSnackbar('Entry updated successfully', {variant: 'success', autoHideDuration: 1500});

        } catch (error) {
            console.log(error);
        }
    };

    const refreshEntries = async () => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: '[Entry] Load-Entries', payload: data});
    };

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    );
};
