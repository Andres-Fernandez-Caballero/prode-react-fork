import { Link } from 'react-router-dom';
const FilaResultado = ({ index, resultado }) => {
	const linkIsActive = true;

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
