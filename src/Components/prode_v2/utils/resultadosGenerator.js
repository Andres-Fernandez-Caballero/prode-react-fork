import { gruposEtapaPreliminares } from '../../../constants/grupos_etapa_preliminares';
import { puntaje } from '../../../Constantes';

export const generarPuntosIniciales = () => {
	const preliminaresIniciales = {};
	gruposEtapaPreliminares.forEach(grupo =>
		grupo.partidos.forEach(
			partido =>
			(preliminaresIniciales[
				`${grupo.nombre}-${partido.equipoA}-${partido.equipoB}`
			] = 0),
		),
	);

	const torneoIniciales = {
		campeon: 0,
		tercero: 0,
		'final-a': 0,
		'final-b': 0,
		'semi-a-1': 0,
		'semi-a-2': 0,
		'semi-b-1': 0,
		'semi-b-2': 0,
		'cuartos-a-1': 0,
		'cuartos-a-2': 0,
		'cuartos-b-1': 0,
		'cuartos-b-2': 0,
		'cuartos-c-1': 0,
		'cuartos-c-2': 0,
		'cuartos-d-1': 0,
		'cuartos-d-2': 0,
	};
	return { preliminares: preliminaresIniciales, torneo: torneoIniciales };
};

export const crearResultado = (prodeUsuario, superProde) => {
	if (!prodeUsuario) {
		throw new Error('prodeUsuario es undefined');
	}

	if (!superProde) {
		return generarPuntosIniciales();
	}

	return {
		preliminares: calcularPuntosPreliminar(prodeUsuario, superProde),
		torneo: calcularPuntosTorneo(prodeUsuario, superProde),
	};
};

const calcularPuntosPreliminar = (prodeUsuario, superProde) => {
	const puntosPreliminar = {};

	prodeUsuario.resultados.forEach(grupo => {
		grupo.partidos.forEach(partido => {
			const superprodegrupo = superProde.resultados.find(
				g => g.nombre === partido.gruponombre(),
			);
			const superprodepartido = superprodegrupo.partidos.find(
				p => p.partidoid === partido.partidoid,
			);

			let puntospartido = puntaje.puntajepreliminar.SIN_COINCIDENCIA;
			if (
				(partido.golesequipoA === '' && partido.golesequipoB === '') ||
				(superprodepartido.golesequipoA === '' &&
					superprodepartido.golesequipoB === '')
			) {
				puntospartido = puntaje.puntajepreliminar.SIN_COINCIDENCIA;
			} else if (
				partido.golesequipoA === superprodepartido.golesequipoA &&
				partido.golesequipoB === superprodepartido.golesequipoB
			) {
				puntospartido = puntaje.puntajepreliminar.COINCIDENCIA_TOTAL;
			} else if (partido.resultado() === superprodepartido.resultado()) {
				puntospartido = puntaje.puntajepreliminar.COINCIDENCIA_PARCIAL;
			} else {
				puntospartido = puntaje.puntajepreliminar.SIN_COINCIDENCIA;
			}
			puntosPreliminar[partido.partidoid] = puntospartido;
		});
	});
	console.log('puntos', puntosPreliminar);
	return puntosPreliminar;
};


const generarObjetoResultadosPaisesPorEtapa = (superProde) => {
	const resultadosPaisesPorEtapa = {
		campeon: [],
		tercero: [],
		final: [],
		semi: [],
		cuartos: [],
	};
	Object.keys(superProde.torneo).forEach(torneoKey => {
		const etapaKey = torneoKey.split('-')[0];
		const pais = superProde.torneo[torneoKey];

		resultadosPaisesPorEtapa[etapaKey].push(pais);

	})
	return resultadosPaisesPorEtapa;

}


const calcularPuntosTorneo = (prodeUsuario, superProde) => {
	const puntosTorneo = {};
	const paisesEnEtapaSuperProde = generarObjetoResultadosPaisesPorEtapa(superProde);
	console.log('paisesEnEtapaSuperProde', paisesEnEtapaSuperProde);

	Object.keys(prodeUsuario.torneo).forEach(key => {
		const etapa = key.split('-')[0];
		const keyPuntajeTorneo = 'ACIERTO_' + etapa.toUpperCase();
		const pais = prodeUsuario.torneo[key];
		const paises = paisesEnEtapaSuperProde[etapa];

		console.log('pais', pais);
		console.log('paises', paises);

		if (paises.includes(pais)) {
			puntosTorneo[key] = puntaje.puntajetorneo[keyPuntajeTorneo];
		} else {
			puntosTorneo[key] = puntaje.puntajetorneo.SIN_ACIERTO;
		}

	})
	console.log('puntosTorneo', puntosTorneo);

	return puntosTorneo;
};
