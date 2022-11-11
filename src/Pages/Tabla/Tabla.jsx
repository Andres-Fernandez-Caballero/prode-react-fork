import { useEffect, useState } from 'react';
import { getresultadosuserprode } from '../../database/services/resultadosService';
import { getAllUsers } from '../../database/services/usuariosService';
import { getPuntajeTotalByResultado } from './../../utils/resultadosConverter';

import FilaResultado from './FilaResultado';
import Loading from '../../Components/Loading';
import { daysLeftTo } from '../../utils/dateUtils';
import moment from 'moment';
import emptyStadium from './../../assets/empty_stadium.jpg';

const Tabla = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [resultados, setresultados] = useState([]);
	const daysLeft = daysLeftTo(moment('2022-11-20:00:00:00'));
	useEffect(() => {
		const obtenerYordenarResultados = async () => {
			const usuarios = await getAllUsers();

			const resultadosPrometidos = usuarios.map(async usuario => {
				const r = await getresultadosuserprode(usuario.userid);
				const puntajeUsuario = {
					userid: usuario.userid,
					displayName: usuario.displayName,
				};
				if (r === null) {
					puntajeUsuario.puntaje = 0;
				} else {
					puntajeUsuario.puntaje = getPuntajeTotalByResultado(r);
				}
				return puntajeUsuario;
			});

			const ordenarpuntajemayor = (a, b) => b.puntaje - a.puntaje;

			const resultadosEjecutados = await Promise.all(
				resultadosPrometidos,
			);
			setresultados(resultadosEjecutados.sort(ordenarpuntajemayor));
		};

		obtenerYordenarResultados().then(() => {
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					{resultados.length === 0 ? (
						<div className='alert alert-warning' role='alert'>
							No hay resultados!
						</div>
					) : (
						<div>
							{daysLeft > 0 ? (
								<div className='alert' role='alert'>
									<h4 className='text-secondary my-4'>
										Quedan {daysLeft} dias para que puedas
										ver los prodes de tus amigos!{' '}
										<span>⏳</span>
									</h4>
									<img
										src={emptyStadium}
										className='img-fluid'
										alt='empty stadium'
										width={800}
										height={700}
									/>
								</div>
							) : (
								<div className='p-4'>
									<div
										className='alert alert-success'
										role='alert'
									>
										<h4 className='text-secondary'>
											Has Click sobre el nombre de tu
											amigo para ver su prode ⚽!
										</h4>
									</div>
									<table className='table'>
										<thead>
											<tr>
												<th scope='col'>Puesto</th>
												<th scope='col'>Nombre</th>
												<th scope='col'>Puntaje</th>
											</tr>
										</thead>
										<tbody>
											{resultados.map(resultado => (
												<FilaResultado
													key={resultado.userid}
													index={resultados.indexOf(
														resultado,
													)}
													resultado={resultado}
												/>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Tabla;
