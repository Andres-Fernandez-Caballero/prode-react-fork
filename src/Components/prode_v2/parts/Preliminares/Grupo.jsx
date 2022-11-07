import Partido from './Partido';

const Grupo = ({ nombre, partidos }) => {
	return (
		<div className='col-md-6 mx-auto mt-4'>
			<h1>Grupo {nombre}</h1>
			{partidos.map(partido => (
				<Partido key={partido.partidoid} partido={partido} />
			))}
		</div>
	);
};

export default Grupo;
