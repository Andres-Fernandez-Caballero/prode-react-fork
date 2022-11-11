import { Link } from 'react-router-dom';
import { daysLefToOpenProde } from '../../utils/dateUtils';
const FilaResultado = ({ index, resultado }) => {
	const linkIsActive = daysLefToOpenProde() < 0;

	return (
		<tr>
			<th scope='row'>{index + 1}</th>
			<td>
				<Link to={linkIsActive ? `/prode/${resultado.userid}` : ''}>
					{resultado.displayName}
				</Link>
			</td>
			<td>{resultado.puntaje}</td>
		</tr>
	);
};

export default FilaResultado;
