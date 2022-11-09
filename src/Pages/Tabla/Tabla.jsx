import { useEffect, useState } from 'react';
import { getAllProdesResultados } from '../../database/services/resultadosService';
import { getAllUsers } from '../../database/services/usuariosService';
import FilaResultado from './FilaResultado';
// import Loading from '../../Components/Loading';

const Tabla = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [resultados, setresultados] = useState([]);

	useEffect(() => {
		const obtenerYordenarResultados = async () => {
			const usuarios = await getAllUsers();
			console.log(usuarios);
			const resultados = await getAllProdesResultados();
			resultados.forEach(resultado => {
				const getPuntajeTotalByResultado = resultado => {
					const puntajetorneo = Object.values(
						resultado.torneo,
					).reduce((a, b) => a + b, 0);
					const puntajepreliminar = Object.values(
						resultado.preliminares,
					).reduce((a, b) => a + b, 0);
					return puntajetorneo + puntajepreliminar;
				};
				resultado.puntajetotal = getPuntajeTotalByResultado(resultado);
			});

			const ordenarpuntajemayor = (a, b) => {
				if (a.puntajetotal < b.puntajetotal) {
					return 1;
				} else {
					return -1;
				}
			};

			if (resultados && resultados.length > 0) {
				const resultadosordenados =
					resultados.sort(ordenarpuntajemayor);
				setresultados(resultadosordenados);
			}
		};
		setIsLoading(true);
		obtenerYordenarResultados().then(() => {
			setIsLoading(false);
		});
	}, []);
	return (
		<>
			{isLoading ? (
				<FilaResultado />
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
								{resultados.map((resultado, index) => (
									<FilaResultado
										key={index}
										index={index}
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
