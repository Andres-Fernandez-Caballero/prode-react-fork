import { equipos } from '../../../../Constantes';
import PrimeroYsegundo from './PrimeroYsegundo';
const Octavos = () => {
	const convertirGrupoNombreALetraMinuscula = (nombreGrupo = '') => {
		const letraMinuscula = nombreGrupo.split('grupo')[1].toLowerCase();
		return letraMinuscula;
	};

	return (
		<>
			<h2>Octavos</h2>
			<h4>
				Elija los equipos primeros y segundos de cada grupo
				respectivamente.
			</h4>
			<section>
				{Object.keys(equipos).map((grupoNombre, index) => (
					<PrimeroYsegundo
						key={grupoNombre}
						nombreGrupo={convertirGrupoNombreALetraMinuscula(
							grupoNombre,
						)}
						equipos={Object.values(equipos[grupoNombre])}
					/>
				))}
			</section>
		</>
	);
};

export default Octavos;
