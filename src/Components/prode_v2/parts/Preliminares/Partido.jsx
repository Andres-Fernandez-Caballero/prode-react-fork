import { puntaje } from '../../../../Constantes';
import ConsumerProdeContext from '../../ProdeProvider';
import { coloresPuntaje } from '../../../../constants/coloresPuntaje';

const Partido = ({ partido }) => {
	const { updatePartido, getPuntosPreliminaresByKey } =
		ConsumerProdeContext();

	const colorPuntaje = () => {
		switch (getPuntosPreliminaresByKey(partido.partidoid)) {
			case puntaje.puntajepreliminar.COINCIDENCIA_TOTAL:
				return coloresPuntaje.COINCIDENCIA_TOTAL;
			case puntaje.puntajepreliminar.COINCIDENCIA_PARCIAL:
				return coloresPuntaje.COINCIDENCIA_PARCIAL;
			case puntaje.puntajepreliminar.SIN_COINCIDENCIA:
				return coloresPuntaje.SIN_COINCIDENCIA;
			default:
				return colorPuntaje.SIN_PUNTOS;
		}
	};

	// const SIN_COINCIDENCIAS = '#ff6d4e';

	const handleOnChange = evento => {
		const goles = evento.target.value;

		if (evento.target.name === 'golesequipoA') {
			partido.golesequipoA = goles;
		}
		if (evento.target.name === 'golesequipoB') {
			partido.golesequipoB = goles;
		}

		updatePartido(
			partido.partidoid,
			partido.golesequipoA,
			partido.golesequipoB,
		);
	};

	const style = { height: '32px', weight: '32px' };
	const divstyle = {
		backgroundColor: colorPuntaje(),
		padding: '8px',
		margin: '0',
		alingItems: 'center',
	};
	return (
		<div className=' row' style={divstyle}>
			<p className='equipo col-md-3'>{partido.equipoA}</p>
			<input
				name='golesequipoA'
				style={style}
				className='col-md-2'
				type='number'
				onChange={handleOnChange}
				value={partido.golesequipoA}
			></input>

			<p className='col-md-2 text-center'>
				<strong> - </strong>
			</p>
			<input
				name='golesequipoB'
				style={style}
				className='col-md-2'
				type='number'
				onChange={handleOnChange}
				value={partido.golesequipoB}
			></input>
			<p className='equipo col-md-3'>{partido.equipoB}</p>
		</div>
	);
};

export default Partido;
