import React, { useState } from 'react';
import authconsumer from './../Hooks/UseAuth';

export const FormularioLoginTuProde = () => {
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');

	const consumer = authconsumer();

	const handleOnSubmit = evento => {
		evento.preventDefault();
		consumer
			.logearseEnTuProde(email, password)
			.then(user => console.log('autenticado', user))
			.catch(error => console.error('Error al recuperar usuario', error));
	};

	const handleOnChangeEmail = evento => {
		setemail(evento.target.value);
	};

	const handleOnChangePassword = evento => {
		setpassword(evento.target.value);
	};

	return (
		<div className='container m-4'>
			<h1>Login</h1>
			<hr />
			<form onSubmit={handleOnSubmit} className='m-4'>
				<label className='form-label'>Email:</label>
				<input
					className='form-control'
					type='email'
					name='email'
					onChange={handleOnChangeEmail}
				></input>
				<label className='form-label'>Contraseña:</label>
				<input
					className='form-control'
					type='password'
					name='password'
					onChange={handleOnChangePassword}
				></input>
				<button type='submit' className='btn btn-primary mt-2'>
					Log-in
				</button>
			</form>
		</div>
	);
};
