import './Reglas.css';

export const Reglas = () => {
	return (
		<div className='container m-3'>
			<h1>Reglas de TU PRODE</h1>
			<p>
				El que más puntaje saca al finalizar el torneo será el ganador.
				En caso de empate de puntos en el primer puesto ganaran los
				participantes que estén primeros. Todos los prodes serán
				públicos, es decir, todo participante tendrá acceso a todos los
				prodes de los otros participantes usando la solapa de TABLA. Los
				prodes serán secretos hasta un día antes del día que arranque la
				copa del mundo, ese día se guardaran los prodes de todos los
				participantes como este inscripto por la página. Los prodes
				luego de ese día no se podrán alterar por ningún participante.
				El sistema calculara el puntaje de cada participante mediante
				vaya avanzando cada partido de la copa del mundo. Al finalizar
				el torneo el que mas puntaje obtenga será el ganador.
			</p>

			<h3>Puntaje</h3>
			<p>
				El sistema de puntos tendrá 400 puntos máximos. 144 de esos
				puntos se disputarán en la fase de grupos de la copa del mundo.
				64 se disputarán por entrar a cuartos de final. Otros 64 puntos
				en semi-final y otros 64 en la final. Luego por acertar el
				campeón 42 puntos y por acertar el equipo que salió tercero 22
				puntos.{' '}
			</p>
			<table>
				<tr>
					<th>Fase</th>
					<th>Puntaje por acierto</th>
					<th>Puntaje total</th>
				</tr>
				<tr>
					<td>Grupos</td>
					<td>2 + (1)</td>
					<td>144</td>
				</tr>
				<tr>
					<td>Cuartos</td>
					<td>8</td>
					<td>64</td>
				</tr>
				<tr>
					<td>Semi-final</td>
					<td>16</td>
					<td>64</td>
				</tr>
				<tr>
					<td>Final</td>
					<td>32</td>
					<td>64</td>
				</tr>
				<tr>
					<td>Campeon y tercer puesto</td>
					<td>42 + 22</td>
					<td>64</td>
				</tr>
				<tr>
					<td>Total</td>
					<td>-----</td>
					<td>400</td>
				</tr>
			</table>

			<h3>Grupos</h3>
			<p>
				Se otorgarán 2 puntos por partido a quienes acierten el ganador
				del partido, o si fue un empate. A su vez, se otorgará un punto
				extra si se acierta el resultado exacto del partido.
			</p>
			<h4>Ejemplo:</h4>

			<p>Resultado real: Argentina 3 - 0 Brasil</p>
			<h4>Respuestas:</h4>

			<p>Argentina 1 - 0 Brasil - Ganador Argentina, suma 2 puntos.</p>
			<p>
				Argentina 3 - 3 Brasil - Empate, no acierta al ganador, suma 0
				puntos.
			</p>
			<p>
				Argentina 0 - 1 Brasil - Ganador Brasil, no acierta al ganador
				suma 0 puntos.
			</p>
			<p>
				Argentina 3 - 0 Brasil - Ganador Argentina, acierta al ganador y
				a su vez acierta al resultado, suma 3 puntos.
			</p>
			<h3>Cuartos de Final - Semi-Final - Final</h3>
			<p>
				Se otorgará puntos a quien acierte el equipo que llegue a cada
				fase respectivamente, sin importar el orden de las llaves. Por
				equipo en cuartos de final, 8 puntos, por equipo en semi-final
				,16 puntos, por equipo en la final, 32 puntos.
			</p>
			<h3>Campeón y tercer puesto</h3>
			<p>
				Por acertar el equipo que salió campeón, 42 puntos. Por acertar
				el tercero, 22 puntos.
			</p>
		</div>
	);
};
