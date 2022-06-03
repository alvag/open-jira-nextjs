import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const [ inputValue, setInputValue ] = useState( '' );
    const [ touched, setTouched ] = useState( false );

    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );
    const { addNewEntry } = useContext( EntriesContext );

    const onSave = () => {
        if ( inputValue.length > 0 ) {
            addNewEntry( inputValue );
            setIsAddingEntry( false );
            setInputValue( '' );
            setTouched( false );
        } else {
            setTouched( true );
        }
    };

    return (
        <Box sx={ { marginBottom: 2, paddingX: 2 } }>
            {
                isAddingEntry ? (
                        <>
                            <TextField fullWidth sx={ { marginTop: 2, marginBottom: 1 } }
                                       placeholder={ 'Nueva entrada' }
                                // multiline
                                       value={ inputValue }
                                // helperText={ touched && inputValue.length === 0 && 'Ingrese un valor' }
                                       error={ touched && inputValue.length === 0 }
                                       label={ 'Nueva entrada' }
                                       onBlur={ () => setTouched( true ) }
                                       onChange={ ( e ) => setInputValue( e.target.value ) }
                            />

                            <Box display={ 'flex' } justifyContent={ 'space-between' }>
                                <Button variant={ 'text' } onClick={ () => setIsAddingEntry( false ) }>
                                    Cancelar
                                </Button>
                                <Button variant={ 'outlined' }
                                        color={ 'secondary' }
                                        endIcon={ <SaveOutlinedIcon/> }
                                        onClick={ onSave }
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    ) :
                    <Button startIcon={ <AddIcon/> } fullWidth variant={ 'outlined' } onClick={ () => setIsAddingEntry( true ) }>
                        Agregar Tarea
                    </Button>
            }


        </Box>
    );
};
