import Grupo from '../Components/prode/preliminares/Models/Grupo';
import Partido from '../Components/prode/preliminares/Models/Partido';

export const resultadosconverter = {
	toFirestore: (resultados = []) => {
		const grupos = resultados.map(grupo => ({
			nombre: grupo.nombre,
			partidos: grupo.partidos.map(partido => ({
				partidoid: partido.partidoid,
				equipoA: partido.equipoA,
				equipoB: partido.equipoB,
				golesequipoA: partido.golesequipoA,
				golesequipoB: partido.golesequipoB,
			})),
		}));
		return grupos;
	},
	toObject: (resultadosfromfirestore = []) => {
		if (resultadosfromfirestore === undefined) return undefined;
		const grupos = resultadosfromfirestore.map(
			grupo => new Grupo(grupo.nombre),
		);
		for (let index = 0; index < grupos.length; index++) {
			resultadosfromfirestore[index].partidos.forEach(partido =>
				grupos[index].agregarpartido(
					new Partido(
						grupos[index].nombre,
						partido.equipoA,
						partido.equipoB,
						partido.golesequipoA,
						partido.golesequipoB,
					),
				),
			);
		}
		return grupos;
	},
};

export const getPuntajeTotalByResultado = resultado => {
	const puntajeTorneo = Object.values(resultado.torneo).reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0,
	);
	const puntajePreliminares = Object.values(resultado.preliminares).reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0,
	);
	console.log('puntajeTorneo', puntajeTorneo);
	console.log('puntajePreliminares', puntajePreliminares);
	return puntajeTorneo + puntajePreliminares;
};
