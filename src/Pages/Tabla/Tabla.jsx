import { useEffect, useState } from 'react';
import { getresultadosuserprode } from '../../database/services/resultadosService';
import { getAllUsers } from '../../database/services/usuariosService';
import { getPuntajeTotalByResultado } from './../../utils/resultadosConverter';

import FilaResultado from './FilaResultado';
import Loading from '../../Components/Loading';

const Tabla = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [resultados, setresultados] = useState([]);

	useEffect(() => {
		const obtenerYordenarResultados = async () => {
			const usuarios = await getAllUsers();
			console.log('usuarios', usuarios);

			const resultadosPrometidos = usuarios.map(async usuario => {
				const r = await getresultadosuserprode(usuario.userid);
				const puntajeUsuario = {
					userid: usuario.userid,
					displayName: usuario.displayName,
				};

				console.log(`puntos de ${usuario.displayName}`, r);
				if (r === null) {
					puntajeUsuario.puntaje = 0;
				} else {
					puntajeUsuario.puntaje = getPuntajeTotalByResultado(r);
				}
				return puntajeUsuario;
			});

			const ordenarpuntajemayor = (a, b) => {
				if (a.puntajetotal < b.puntajetotal) {
					return 1;
				} else {
					return -1;
				}
			};

			setresultados(await Promise.all(resultadosPrometidos));
			if (resultados && resultados.length > 0) {
				setresultados(resultados.sort(ordenarpuntajemayor));
			}
		};

		obtenerYordenarResultados().then(() => {
			setIsLoading(false);
		});
	}, []);

	console.log('resultados', resultados);
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
										index={resultados.indexOf(resultado)}
										resultado={resultado}
									/>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}
		</>
	);
};

export default Tabla;
