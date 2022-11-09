import { useState } from 'react';
import authconsumer from './../Hooks/UseAuth';
import Loading from './../Components/Loading';

export const FormularioLoginTuProde = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');

	const consumer = authconsumer();

	const handleOnSubmit = evento => {
		evento.preventDefault();
		setIsLoading(true);
		consumer
			.logearseEnTuProde(email, password)
			.then(() => setIsLoading(false))
			.catch(error => {
				console.error('Error al recuperar usuario', error);
				if (error.message.includes('wrong-password'))
					alert('credenciales incorrectas');
				else alert(error.message);
				setIsLoading(false);
			});
	};

	const handleOnChangeEmail = evento => {
		setemail(evento.target.value);
	};

	const handleOnChangePassword = evento => {
		setpassword(evento.target.value);
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
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
			)}
		</>
	);
};
