import {ChangeEvent, useMemo, useState} from "react";
import {
    capitalize,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    IconButton
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Layout} from '../../components/layouts';
import {EntryStatus} from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => touched && inputValue.length === 0, [inputValue, touched]);

    const onTextFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus);
    }

    const onSave = () => {
        if (inputValue.length > 0) {
            console.log(inputValue, status);
            setInputValue('');
            setStatus('pending');
            setTouched(false);
        } else {
            setTouched(true);
        }
    }

    return (
        <Layout title={'....'}>
            <Grid container justifyContent={'center'} sx={{marginTop: 2}}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada: ${inputValue}`} subheader={`Creado hace .... minutos`}/>

                        <CardContent>
                            <TextField sx={{marginTop: 2, marginBottom: 1}}
                                       fullWidth
                                       autoFocus
                                       value={inputValue}
                                       onChange={onTextFileChange}
                                       placeholder={'Nueva entrada'}
                                       label={'Nueva entrada'}
                                       helperText={isNotValid && 'Ingrese un valor'}
                                       onBlur={() => setTouched(true)}
                                       error={isNotValid}
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup row value={status} onChange={onStatusChange}>
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel key={option}
                                                              value={option}
                                                              control={<Radio/>}
                                                              label={capitalize(option)}/>
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button startIcon={<SaveOutlinedIcon/>}
                                    variant={'contained'}
                                    fullWidth
                                    onClick={onSave}
                                    disabled={inputValue.length === 0}
                            >
                                GUARDAR
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}>
                <DeleteOutlinedIcon/>
            </IconButton>
        </Layout>
    );
};

export default EntryPage;
