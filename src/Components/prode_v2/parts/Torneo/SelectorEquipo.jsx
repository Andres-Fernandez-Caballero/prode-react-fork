import { puntaje } from '../../../../Constantes';
import ConsumerProdeContext from '../../ProdeProvider';

const SelectorEquipo = ({
	equipos,
	keySelector,
	onChange,
	titleEmptyValue = 'Seleccione un equipo',
}) => {
	const { getTorneoByKey, getPuntosTorneoByKey } = ConsumerProdeContext();

	const calcularColorPuntaje = torneoKey => {
		const ganador = 'success';
		const perdedor = 'danger';
		return getPuntosTorneoByKey(torneoKey) ===
			puntaje.puntajetorneo.SIN_ACIERTO
			? perdedor
			: ganador;
	};

	return (
		<div className={'participant ' + calcularColorPuntaje(keySelector)}>
			<span className={'badge bg-' + calcularColorPuntaje(keySelector)}>
				{getPuntosTorneoByKey(keySelector)}
			</span>
			<select onChange={onChange} name={keySelector}>
				<option>{titleEmptyValue}</option>
				{equipos.map((equipo, index) => (
					<option
						key={keySelector + equipo + index}
						value={equipo}
						defaultValue=''
						selected={getTorneoByKey(keySelector) === equipo}
					>
						{equipo}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectorEquipo;
