import { useState } from 'react';
import Loading from '../../../Loading';
import SuccessToast, { showToast } from '../../../toasts/SuccessToast';
import Octavos from '../../parts/Octavos';
import Preliminares from '../../parts/Preliminares';
import Torneo from '../../parts/Torneo';
import ConsumerProdeContext from '../../ProdeProvider';
import { storeUserProde } from './../../../../database/services/prodeService';
import {useNavigate} from 'react-router-dom'

const ProdeUsuarioLogic = ({ uid, isEditable = false }) => {
	const { prode, octavosNoEsValido, torneoNoEsValido } = ConsumerProdeContext();
	const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

	const handleOnClickToSave = async () => {
		try {
			setIsLoading(true);
      if(torneoNoEsValido() ){
        alert('No pueden haber dos equipos iguale en torneo')
      } else
      if(octavosNoEsValido()) {
        alert('No pueden haber equipos iguales en octavos')
      } else {
	  		await storeUserProde(uid, prode);
  			showToast('⚽ Prode guardado!')
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
					<h2>Ronda de Grupos</h2>
					<Preliminares />
					<Octavos />
					<Torneo />
				</div>
			)}
		</>
	);
};

export default ProdeUsuarioLogic;
