import { useState } from 'react';
import Loading from '../../../Loading';
import SuccessToast, { showToast } from '../../../toasts/SuccessToast';
import Octavos from '../../parts/Octavos';
import Preliminares from '../../parts/Preliminares';
import Torneo from '../../parts/Torneo';
import ConsumerProdeContext from '../../ProdeProvider';
import { storeUserProde } from './../../../../database/services/prodeService';

const ProdeUsuarioLogic = ({ uid, isEditable = false }) => {
	const { prode, octavosNoEsValido, torneoNoEsValido, _puntos } =
		ConsumerProdeContext();
	const [isLoading, setIsLoading] = useState(false);
	console.log('torneo', _puntos);

	const handleOnClickToSave = async () => {
		try {
			setIsLoading(true);
			if (torneoNoEsValido()) {
				alert('No pueden haber dos equipos iguale en torneo');
			} else if (octavosNoEsValido()) {
				alert('No pueden haber equipos iguales en octavos');
			} else {
				await storeUserProde(uid, prode);
				showToast('⚽ Prode guardado!');
			}
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			alert('Error al guardar el prode');
		}
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<SuccessToast />
					{isEditable && (
						<button
							className='prodeboton'
							onClick={handleOnClickToSave}
						>
							Guardar
						</button>
					)}
					<p>
						Para grabar los datos de TU PRODE apriete el botón de
						guardar al final.
					</p>
					<Preliminares />
					<Octavos />
					<Torneo />
				</div>
			)}
		</>
	);
};

export default ProdeUsuarioLogic;
