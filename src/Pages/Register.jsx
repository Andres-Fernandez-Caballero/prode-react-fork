import { useState } from 'react';
import Authconsumer from '../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
	const { registrarse } = Authconsumer();
	const navigate = useNavigate();
	const inputinicial = {
		email: '',
		name: '',
		lastname: '',
		phone: '',
		password: '',
		repeatpassword: '',
	};
	const [input, setinput] = useState(inputinicial);

	const handleOnChange = evento => {
		setinput({ ...input, [evento.target.name]: evento.target.value });
	};

	const handleOnSubmit = evento => {
		evento.preventDefault();

		if (
			input.name === '' ||
			input.email === '' ||
			input.lastname === '' ||
			input.phone === '' ||
			input.password === '' ||
			input.repeatpassword === ''
		) {
			alert('Debe completar todos los campos');
			return;
		}

		if (input.password !== input.repeatpassword) {
			alert('Las contraseñas no coinciden');
			return;
		}
		if (input.password.length <= 6) {
			alert('La contraseña debe poseer mas de 6 caracteres');
			return;
		}

		registrarse(
			input.email,
			input.password,
			input.name,
			input.lastname,
			input.phone,
		)
			.then(authusercredentials => {
				console.log('credentials', authusercredentials);
				alert('Usuario Registrado');
				navigate('/reglas');
			})
			.catch(error => {
				console.log(error);
				alert('Error al registrarse');
			});
	};

	return (
		<div className='m-5'>
			<h1>Registro</h1>
			<form onSubmit={handleOnSubmit}>
				<div className='row'>
					<div className='col-md-6'>
						<label className='form-label'>Apellido:</label>
						<input
							className='form-control'
							type='text'
							name='lastname'
							onChange={handleOnChange}
						></input>
					</div>
					<div className='col-md-6'>
						<label className='form-label'>Nombre:</label>
						<input
							className='form-control'
							type='text'
							name='name'
							onChange={handleOnChange}
						></input>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-6'>
						<label className='form-label'>Email:</label>
						<input
							className='form-control'
							type='text'
							name='email'
							onChange={handleOnChange}
						></input>
					</div>
					<div className='col-md-6'>
						<label className='form-label'>Teléfono:</label>
						<input
							className='form-control'
							type='text'
							name='phone'
							onChange={handleOnChange}
						></input>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<label className='form-label'>Contraseña:</label>
						<input
							className='form-control'
							type='password'
							name='password'
							onChange={handleOnChange}
						></input>
					</div>
					<div className='col-md-6'>
						<label className='form-label'>Repita contraseña:</label>
						<input
							className='form-control'
							type='password'
							name='repeatpassword'
							onChange={handleOnChange}
						></input>
					</div>
				</div>

				<button className='my-3 btn btn-primary' type='submit'>
					Registrar
				</button>
			</form>
		</div>
	);
};
