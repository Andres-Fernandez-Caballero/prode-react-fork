import ConsumerProdeContext from '../../ProdeProvider';
import LineaTorneoConectora from './LineaTorneoConectora';
import SelectorEquipo from './SelectorEquipo';

const Torneo = () => {
	const { getOctavoByKey, getTorneoByKey, updateTorneo } =
		ConsumerProdeContext();

	const handleOnChangeTorneo = event => {
		updateTorneo(event.target.name, event.target.value);
		console.log(getTorneoByKey(event.target.name));
	};

	return (
		<div>
			<h4 className='mt-4'>
				Elija los equipos primeros y segundos de cada grupo
				respectivamente.
			</h4>
			<div className='bracket'>
				<section className='round of16'>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-a')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-b')}</span>
									</div>
								</div>
							</div>

							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-c')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-d')}</span>
									</div>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-e')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-f')}</span>
									</div>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-g')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-h')}</span>
									</div>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-b')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-a')}</span>
									</div>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-d')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-c')}</span>
									</div>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-f')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-e')}</span>
									</div>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<div className='participant'>
										<span>{getOctavoByKey('1-h')}</span>
									</div>
									<div className='participant'>
										<span>{getOctavoByKey('2-g')}</span>
									</div>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
				</section>
				<section className='round quarterfinals'>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-a'),
											getOctavoByKey('2-b'),
										]}
										keySelector='cuartos-a-1'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>

									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-c'),
											getOctavoByKey('2-d'),
										]}
										keySelector='cuartos-a-2'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-e'),
											getOctavoByKey('2-f'),
										]}
										keySelector='cuartos-b-1'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-g'),
											getOctavoByKey('2-h'),
										]}
										keySelector='cuartos-b-2'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-b'),
											getOctavoByKey('2-a'),
										]}
										keySelector='cuartos-c-1'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-d'),
											getOctavoByKey('2-c'),
										]}
										keySelector='cuartos-c-2'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-f'),
											getOctavoByKey('2-e'),
										]}
										keySelector='cuartos-d-1'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
									<SelectorEquipo
										equipos={[
											getOctavoByKey('1-h'),
											getOctavoByKey('2-g'),
										]}
										keySelector='cuartos-d-2'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CUARTOS'
									/>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
				</section>
				<section className='round semifinals'>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('cuartos-a-1'),
											getTorneoByKey('cuartos-a-2'),
										]}
										keySelector='semi-a-1'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='SEMIFINAL'
									/>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('cuartos-b-1'),
											getTorneoByKey('cuartos-b-2'),
										]}
										keySelector='semi-a-2'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='SEMIFINAL'
									/>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('cuartos-c-1'),
											getTorneoByKey('cuartos-c-2'),
										]}
										keySelector='semi-b-1'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='SEMIFINAL'
									/>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('cuartos-d-1'),
											getTorneoByKey('cuartos-d-2'),
										]}
										keySelector='semi-b-2'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='SEMIFINAL'
									/>
								</div>
							</div>
						</div>
						<LineaTorneoConectora />
					</div>
				</section>
				<section className='round finals'>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('semi-a-1'),
											getTorneoByKey('semi-a-2'),
										]}
										keySelector='final-a'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='FINAL'
									/>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('semi-b-1'),
											getTorneoByKey('semi-b-2'),
										]}
										keySelector='final-b'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='FINAL'
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className='round champion'>
					<div className='winners'>
						<div className='matchups'>
							<div className='matchup'>
								<div className='participants'>
									<label>Campeon</label>
									<SelectorEquipo
										equipos={[
											getTorneoByKey('final-a'),
											getTorneoByKey('final-b'),
										]}
										keySelector='campeon'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='CAMPEON'
									/>
								</div>
							</div>
							<div className='matchup'>
								<div className='participants'>
									<label>Tercero</label>
									<SelectorEquipo
										equipos={
											[
												getTorneoByKey('final-a') === getTorneoByKey('semi-a-1')? getTorneoByKey('semi-a-2') : getTorneoByKey('semi-a-1'),
												getTorneoByKey('final-b') === getTorneoByKey('semi-b-1')? getTorneoByKey('semi-b-2') : getTorneoByKey('semi-b-1'),
											]
										}
										keySelector='tercero'
										onChange={handleOnChangeTorneo}
										titleEmptyValue='TERCERO'
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Torneo;
