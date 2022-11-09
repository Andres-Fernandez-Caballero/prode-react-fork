import { Link } from 'react-router-dom';
const FilaResultado = ({ index, resultado }) => {
	return (
		<tr>
			<th scope='row'>{index + 1}</th>
			<td>
				<Link to={'/prode/' + resultado.userid}>
					{resultado.displayName}
				</Link>
			</td>
			<td>{resultado.puntaje}</td>
		</tr>
	);
};

export default FilaResultado;
