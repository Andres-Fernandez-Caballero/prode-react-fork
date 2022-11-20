import AuthConsumer from './../Hooks/UseAuth';

export const Home = () => {
	const { signedout } = AuthConsumer();
	return (
		<div className='container m-3'>
			<h1>Home</h1>

			<h2>
				{process.env.REACT_APP_CANTIDAD_USUARIO} Personas inscriptas 👨‍👩‍👧‍👦
			</h2>

			<button onClick={signedout} className='btn btn-danger text-center'>
				Log Out
			</button>
		</div>
	);
};
