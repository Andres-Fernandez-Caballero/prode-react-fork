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

const calcularPuntosTorneo = (prodeUsuario, superProde) => {
	const puntosTorneo = {};

	Object.keys(superProde.torneo).forEach(prodeKey => {
		const etapa = prodeKey.split('-')[0].toUpperCase();
		const etapaKey = 'ACIERTO_' + etapa;

		// const paisGanador = superProde.torneo[prodeKey];
		const keysEnEtapa = Object.keys(superProde.torneo).filter(
			k => k.split('-')[0] === etapa,
		);
		const paisesEnEtapa = keysEnEtapa.map(k => superProde.torneo[k]);

		console.log('paisesEnEtapa', paisesEnEtapa);
		if (prodeUsuario.torneo[prodeKey] === superProde.torneo[prodeKey]) {
			puntosTorneo[prodeKey] = puntaje.puntajetorneo[etapaKey];
		}

		if (
			prodeUsuario.torneo[prodeKey] === '' ||
			superProde.torneo[prodeKey] === ''
		) {
			puntosTorneo[prodeKey] = puntaje.puntajetorneo.SIN_ACIERTO;
		}

		if (prodeUsuario.torneo[prodeKey] !== superProde.torneo[prodeKey]) {
			puntosTorneo[prodeKey] = puntaje.puntajetorneo.SIN_ACIERTO;
		}
	});
	return puntosTorneo;
};
