import { List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { FC, useContext, useMemo, DragEvent } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ( { status } ) => {

    const { isDragging, endDragging } = useContext( UIContext );
    const { entries, updateEntry } = useContext( EntriesContext );
    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ] );

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    };

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData( 'text' );
        const entry = entries.find( entry => entry._id === id )!;
        entry.status = status;
        updateEntry( entry );
        endDragging();
    };

    return (
        <div onDragOver={ allowDrop }
             onDrop={ onDropEntry }
             className={ isDragging ? styles.dragging : '' }
        >

            <Paper sx={ { height: 'calc(100vh - 18px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' } }>
                <List sx={ { opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' } }>
                    { entriesByStatus.map( entry => (
                        <EntryCard key={ entry._id } entry={ entry }/>
                    ) ) }
                </List>
            </Paper>

        </div>
    );
};
