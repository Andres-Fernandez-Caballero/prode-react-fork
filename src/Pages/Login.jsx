import { useNavigate } from 'react-router-dom';
import { daysLeftToCloseProde } from '../utils/dateUtils';

export const Login = () => {
	const navigate = useNavigate();

	const handleOnClickRegister = () => {
		navigate('/register');
	};
	return (
		<header className='App-header'>
			<h1>TU PRODE</h1>
			<img
				className='imagen-login img-fluid'
				height='300'
				width='300'
				src='https://www.benditofutbol.com/files/article_main/uploads/2014/09/05/5409da78a6a0f.jpg'
				alt='copa del mundo'
			/>

			{daysLeftToCloseProde() > 0 && (
				<button
					className='btn btn-primary my-2'
					onClick={handleOnClickRegister}
				>
					Regristrate
				</button>
			)}
			<button
				className='btn btn-secondary my-2'
				onClick={() => {
					navigate('/logintuprode');
				}}
			>
				Sign-in con TU PRODE
			</button>
		</header>
	);
};
