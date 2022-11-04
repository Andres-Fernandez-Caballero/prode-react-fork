import React, { useState, useEffect } from 'react';
import { ProdeProvider } from '../ProdeProvider';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import { getresultadosuserprode } from '../../../database/services/resultadosService';

const ProdeUsuarioProviderLayer = ({ uid, prodeFontFunction, children }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [globalProde, setGlobalProde] = useState({});

	// const { userauth } = AuthConsumer();

	const childWithProps = React.Children.map(children, child => {
		return React.cloneElement(child, { ...child.props, uid });
	});

	useEffect(() => {
		const getProdeById = async (uid = '') => {
			const prode = await prodeFontFunction(uid);
			const _puntos = await getresultadosuserprode(uid);

			setIsLoading(false);
			if (prode === null && _puntos === null) {
				setGlobalProde({});
			} else if (prode !== null) {
				prode.puntos = _puntos===null?undefined : _puntos;
				setGlobalProde(prode);
			}
			setIsLoading(true);
		};
		getProdeById(uid)
			.then(() => {
				console.log('Prode cargado');
			})
			.catch(error => {
				console.error(error);
				setIsLoading(false);
				navigate('/reglas');
			});
	}, []);

	return (
		<>
			{isLoading === false ? (
				<Loading />
			) : (
				<ProdeProvider prode={globalProde}>
					{childWithProps}
				</ProdeProvider>
			)}
		</>
	);
};

export default ProdeUsuarioProviderLayer;
