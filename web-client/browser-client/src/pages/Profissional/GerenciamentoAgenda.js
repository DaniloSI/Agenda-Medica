import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NavBarProfissional from './NavBarProfissional.js';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(3),
    },
  }));

export default function GerenciamentoAgenda(props) {
    const classes = useStyles();
    const diasSemana = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado"
    ];
    const horarios = [
        {
            horarioId : 1,
            diaSemana: 0,
            horaInicio: '08:00',
            horaFim: '09:00'
        },
        {
            horarioId : 2,
            diaSemana: 0,
            horaInicio: '09:00',
            horaFim: '10:00'
        },
        {
            horarioId : 3,
            diaSemana: 1,
            horaInicio: '08:00',
            horaFim: '09:00'
        },
        {
            horarioId : 4,
            diaSemana: 1,
            horaInicio: '09:00',
            horaFim: '10:00'
        },
        {
            horarioId : 5,
            diaSemana: 2,
            horaInicio: '08:00',
            horaFim: '09:00'
        },
        {
            horarioId : 6,
            diaSemana: 2,
            horaInicio: '09:00',
            horaFim: '10:00'
        },
        {
            horarioId : 7,
            diaSemana: 3,
            horaInicio: '08:00',
            horaFim: '09:00'
        },
        {
            horarioId : 8,
            diaSemana: 3,
            horaInicio: '09:00',
            horaFim: '10:00'
        }
    ];

    return (
        <NavBarProfissional
            history={props.history}
            content={
                <div>
                    <CssBaseline />
                    <Container maxWidth="xl">
                        <Box mb={5}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h6">Agenda</Typography>
                                <br />
                                <form noValidate autoComplete="off" >
                                    <Grid container spacing={3} justify="flex-start" direction="row">
                                        <Grid item xs={4}>
                                            <TextField
                                                id="titulo"
                                                label="Título"
                                                width="100%"
                                                fullWidth
                                                // onChange={handleChange('name')}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    id="date-picker-data-inicio-vigencia"
                                                    label="Início da Vigência"
                                                    format="MM/dd/yyyy"
                                                    fullWidth
                                                    // value={selectedDate}
                                                    onChange={() => console.log('Data alterada.')}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    id="date-picker-data-fim-vigencia"
                                                    label="Fim da Vigência"
                                                    format="MM/dd/yyyy"
                                                    fullWidth
                                                    // value={selectedDate}
                                                    onChange={() => console.log('Data alterada.')}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Box>
                    </Container>
                    <Container maxWidth="xl">
                        <Box width="100%" height={100} display="flex" alignItems="flex-start">
                            {diasSemana.map((diaSemana, index) => 
                                <Box width={1 / diasSemana.length} p={1} display="inline-block" maxHeight={5} key={index}>
                                    <List subheader={<ListSubheader>{diaSemana}</ListSubheader>} className={classes.root} bgcolor="background.paper">
                                        {horarios.filter(h => h.diaSemana == index)
                                            .map(h => 
                                                <ListItem key={h.horarioId}>
                                                    <ListItemText id={h.horarioId} primary={"De " + h.horaInicio + " às " + h.horaFim} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )}
                                    </List>
                                </Box>
                            )}
                        </Box>
                    </Container>
                </div>
            }
        />
    )
}