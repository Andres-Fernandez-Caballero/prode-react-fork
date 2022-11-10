import moment from 'moment';
import { Link } from 'react-router-dom';
import { daysLeftTo } from '../../utils/dateUtils';
const FilaResultado = ({ index, resultado }) => {
	const linkIsActive = daysLeftTo(moment('2022-11-20:00:00:00')) > 0;

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
