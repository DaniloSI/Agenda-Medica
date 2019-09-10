﻿using FluentValidation.Results;
using System;
using System.Collections.Generic;

namespace AgendaMedica.Application.ViewModels
{
    public class AgendaViewModel
    {
        public int AgendaId { get; set; }
        public DateTime DataHoraInicio { get; set; }
        public DateTime DataHoraFim { get; set; }
        public ICollection<HorarioViewModel> Horarios { get; set; }
        public int ProfissionalId { get; set; }
        public UsuarioProfissionalViewModel Profissional { get; set; }

        public ValidationResult ValidationResult { get; set; }
    }
}
