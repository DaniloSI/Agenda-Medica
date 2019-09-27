import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import * as Notifications from '../../services/notifications';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '350px'
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
        position: "fixed",
        margin: theme.spacing(1),
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 6
    },
}));

export default function AdicionarHorario() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedDiaSemana, setSelectedDiaSemana] = React.useState(null);
  const [selectedHorarioInicio, setSelectedHorarioInicio] = React.useState(null);
  const [selectedHorarioFim, setSelectedHorarioFim] = React.useState(null);
  const listaDiasSemana = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado"
  ];

  function handleChangeDiaSemana(event) {
    setSelectedDiaSemana(event.target.value);
  }

  function handleHorarioInicioChange(horarioInicio) {
    setSelectedHorarioInicio(horarioInicio);
  }

  function handleHorarioFimChange(horarioFim) {
    setSelectedHorarioFim(horarioFim);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Fab color="primary" aria-label="add" className={classes.fab}  onClick={handleOpen}>
            <AddIcon />
        </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Novo Horário</h2>
            <form autoComplete="off" className={{flexGrow: 1}}>
              <Grid container spacing={3} justify="center">
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="diaSemana">Dia da Semana</InputLabel>
                        <Select
                            value={selectedDiaSemana}
                            fullWidth
                            onChange={handleChangeDiaSemana}
                            displayEmpty
                        >
                        {listaDiasSemana.map((e, i) => 
                                <MenuItem key={i} value={i}>{e}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        fullWidth
                        id="time-picker-inicio"
                        label="Início"
                        value={selectedHorarioInicio}
                        onChange={handleHorarioInicioChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        fullWidth
                        id="time-picker-fim"
                        label="Fim"
                        value={selectedHorarioFim}
                        onChange={handleHorarioFimChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Adicionar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" className={classes.button} onClick={handleClose}>
                    Fechar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}