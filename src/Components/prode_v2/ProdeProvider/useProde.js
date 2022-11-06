import { useState } from 'react';
import { equipos } from '../../../Constantes';
import { gruposEtapaPreliminares } from '../../../constants/grupos_etapa_preliminares';
import Grupo from '../../prode/preliminares/Models/Grupo';
import {
  crearResultado,
  generarPuntosIniciales,
  // generarPuntosIniciales,
} from '../utils/resultadosGenerator';
import { getSuperProde } from '../../../database/services/superProdeService';
import { storeresultadosuserprode } from '../../../database/services/resultadosService';

export const useProde = (prode = {}) => {
  const resultadosPorDefecto = gruposEtapaPreliminares.map(
    grupo => new Grupo(grupo.nombre, grupo.partidos),
  );

  const octavosPorDefecto = () => {
    const octavosPorDefecto = {};
    Object.keys(equipos).forEach(grupoNombre => {
      const letraGrupo = grupoNombre.split('grupo')[1].toLowerCase();
      octavosPorDefecto[`1-${letraGrupo}`] = '';
      octavosPorDefecto[`2-${letraGrupo}`] = '';
    });
    return octavosPorDefecto;
  };

  const torneoPorDefecto = {
    campeon: '',
    tercero: '',
    'cuartos-a-1': '',
    'cuartos-a-2': '',
    'cuartos-b-1': '',
    'cuartos-b-2': '',
    'cuartos-c-1': '',
    'cuartos-c-2': '',
    'cuartos-d-1': '',
    'cuartos-d-2': '',
    'semi-a-1': '',
    'semi-a-2': '',
    'semi-b-1': '',
    'semi-b-2': '',
    'final-a': '',
    'final-b': '',
  };

  const {
    resultados = resultadosPorDefecto,
    octavos = octavosPorDefecto(),
    torneo = torneoPorDefecto,
    puntos = generarPuntosIniciales(),
  } = prode;

  if (resultados && !resultados.every(grupo => grupo instanceof Grupo)) {
    throw new Error('Resultados must be an array of Grupo objects');
  }

  const [_resultados, _setResultados] = useState(resultados);
  const [_octavos, setOctavos] = useState(octavos);
  const [_torneo, _setTorneo] = useState(torneo);
  const [_puntos] = useState(puntos);

  console.log('puntos cargados', puntos);

  function getPartidoById(id) {
    const groupName = id.split('-')[0];
    return _resultados
      .find(grupo => grupo.nombre === groupName)
      .partidos.find(partido => partido.partidoid === id);
  }

  function updatePartido(partidoId, golesequipoA = '', golesequipoB = '') {
    const partido = getPartidoById(partidoId);
    _setResultados(
      _resultados.map(grupo => {
        if (grupo.nombre === partido.gruponombre()) {
          grupo.partidos = grupo.partidos.map(partido => {
            if (partido.partidoid === partidoId) {
              partido.setgolesequipoA(golesequipoA);
              partido.setgolesequipoB(golesequipoB);
            }
            return partido;
          });
        }
        return grupo;
      }),
    );
  }

  function updateOctavos(keyOctavos, value) {
    validateOctavosKey(keyOctavos);
    setOctavos({ ..._octavos, [keyOctavos]: value });
  }

  function getOctavoByKey(keyOctavos) {
    validateOctavosKey(keyOctavos);
    return _octavos[keyOctavos];
  }

  function validateOctavosKey(keyOctavos) {
    if (!Object.keys(_octavos).includes(keyOctavos))
      throw new Error('Invalid octavos key');
  }

  function getTorneoByKey(keyTorneo) {
    validateTorneoKey(keyTorneo);
    return _torneo[keyTorneo];
  }

  function updateTorneo(keyTorneo, value) {
    validateTorneoKey(keyTorneo);
    _setTorneo({ ..._torneo, [keyTorneo]: value });
  }

  function validateTorneoKey(keyTorneo) {
    if (!Object.keys(_torneo).includes(keyTorneo))
      throw new Error('Invalid torneo key');
  }

  function octavosNoEsValido() {
    const paisesSeleccionados = Object.values(_octavos).filter(value => value !== '')
    if (paisesSeleccionados.length === 0) return false
    else {
      const disting = (value, index, self) => {
        return self.indexOf(value) === index
      }
      const octavosNoRepetidos = paisesSeleccionados.filter(disting)
      return octavosNoRepetidos.length < paisesSeleccionados.length
    }
  }

  function torneoNoEsValido() {
    const paisesSeleccionados = Object.values(_torneo).filter(value => value !== '')
    if (paisesSeleccionados.length === 0) return false
    else {
      if (
        _torneo['cuartos-a-1'] !== _torneo['cuartos-a-2'] &&
        _torneo['cuartos-b-1'] !== _torneo['cuartos-b-2'] &&
        _torneo['cuartos-c-1'] !== _torneo['cuartos-c-2'] &&
        _torneo['cuartos-d1'] !== _torneo['cuartos-d-2'] &&
        _torneo['semi-a-1'] !== _torneo['semi-a-2'] &&
        _torneo['semi-b-1'] !== _torneo['semi-b-2'] &&
        _torneo['final-a'] !== _torneo['final-b']
      ) {
        return false
      } else return true
    }
  }
  
  function getPuntosPreliminaresByKey(keyPuntos) {
    return _puntos.preliminares[keyPuntos];
  }

  function getPuntosTorneoByKey(keyPuntos) {
    return _puntos.torneo[keyPuntos];
  }

  async function updatePuntaje(uid) {
    const superProde = await getSuperProde();
    const puntajeResultados = crearResultado(
      {
        resultados: _resultados,
        octavos: _octavos,
        torneo: _torneo,
      },
      superProde,
    );
    await storeresultadosuserprode(uid, puntajeResultados);
  }

  return {
    resultados: _resultados,
    octavos: _octavos,
    prode: { resultados: _resultados, octavos: _octavos, torneo: _torneo },
    getPartidoById,
    updatePartido,
    updateOctavos,
    getOctavoByKey,
    getTorneoByKey,
    updateTorneo,
    getPuntosPreliminaresByKey,
    getPuntosTorneoByKey,
    updatePuntaje,
    torneoNoEsValido,
    octavosNoEsValido
  };
};
