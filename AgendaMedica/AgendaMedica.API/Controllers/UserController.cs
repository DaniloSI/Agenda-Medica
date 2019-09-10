﻿using AgendaMedica.Application.ViewModels;
using AgendaMedica.Domain.Entities;
using AgendaMedica.Domain.Identity;
using AgendaMedica.Domain.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AgendaMedica.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly IUsuarioPacienteRepository _usuarioPacienteRepository;
        private readonly IUsuarioProfissionalRepository _usuarioProfissionalRepository;

        public UserController(IConfiguration config,
                              UserManager<AppUser> userManager,
                              SignInManager<AppUser> signInManager,
                              IMapper mapper,
                              IUsuarioPacienteRepository usuarioPacienteRepository,
                              IUsuarioProfissionalRepository usuarioProfissionalRepository)
        {
            _signInManager = signInManager;
            _mapper = mapper;
            _config = config;
            _userManager = userManager;
            _usuarioPacienteRepository = usuarioPacienteRepository;
            _usuarioProfissionalRepository = usuarioProfissionalRepository;
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser()
        {
            return Ok(new dynamic[]
            {
                _mapper.Map<UsuarioPaciente, UsuarioPacienteViewModel>(_usuarioPacienteRepository.GetById(1)),
                _mapper.Map<UsuarioProfissional, UsuarioProfissionalViewModel>(_usuarioProfissionalRepository.GetById(3))
            });
        }

        [HttpPost("CadastroPaciente")]
        [AllowAnonymous]
        public async Task<IActionResult> CadastroPaciente(UsuarioPacienteViewModel paciente)
        {
            try
            {
                var user = _mapper.Map<UsuarioPaciente>(paciente);

                user.UserName = paciente.Email;

                var result = await _userManager.CreateAsync(user, paciente.Password);

                var userToReturn = _mapper.Map<UsuarioPacienteViewModel>(user);

                if (result.Succeeded)
                {
                    return Created("GetUser", userToReturn);
                }

                return BadRequest(result.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"O Banco Dados Falhou {e.Message}!!");
            }
        }

        [HttpPost("CadastroProfissional")]
        [AllowAnonymous]
        public async Task<IActionResult> CadastroProfissional(UsuarioProfissionalViewModel profissional)
        {
            try
            {
                var user = _mapper.Map<UsuarioProfissional>(profissional);

                user.UserName = profissional.Email;

                var result = await _userManager.CreateAsync(user, profissional.Password);

                if (result.Succeeded)
                {
                    var usuario = _usuarioProfissionalRepository.GetById(user.Id);
                    var usuarioViewModel = _mapper.Map<UsuarioProfissionalViewModel>(usuario);
                    return Created("GetUser", usuarioViewModel);
                }

                return BadRequest(result.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"O Banco Dados Falhou {e.Message}.");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel userLogin)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userLogin.Email);

                var result = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);

                if (result.Succeeded)
                {
                    var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Email.ToUpper() == userLogin.Email.ToUpper());

                    var userToReturn = _mapper.Map<UsuarioViewModel>(appUser);

                    return Ok(GenerateJWToken(appUser).Result);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {e.Message}.");
            }
        }

        private async Task<object> GenerateJWToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new
            {
                token = tokenHandler.WriteToken(token),
                tokenDescriptor.Expires,
                FullName = $"{(user as Usuario).Nome} {(user as Usuario).SobreNome}",
                user.Email
            };
        }
    }
}
