import { puntaje } from "../Constantes"


export const calularPuntosPreliminar = (prodeUsuario, superProde) => {
    const puntajepreliminares = []

    prodeUsuario.resultados.forEach((grupo) => {
      grupo.partidos.forEach((partido)=> {
        const superprodegrupo = superProde.resultados.find(g =>  g.nombre === partido.gruponombre())
        const superprodepartido = superprodegrupo.partidos.find(p => p.partidoid === partido.partidoid)

        let puntospartido = puntaje.puntajepreliminar.SIN_COINCIDENCIA
        if(partido.golesequipoA === superprodepartido.golesequipoA && partido.golesequipoB === superprodepartido.golesequipoB){
          puntospartido = puntaje.puntajepreliminar.COINCIDENCIA_TOTAL
        } else if(partido.resultado() === superprodepartido.resultado() ){
          puntospartido = puntaje.puntajepreliminar.COINCIDENCIA_PARCIAL
        } else {
          puntospartido = puntaje.puntajepreliminar.SIN_COINCIDENCIA
        }
        puntajepreliminares.push({partidoid:partido.partidoid,puntaje:puntospartido})
      })
    })
    return puntajepreliminares;
  }


export const calcularPuntosTorneo = ( prodeUsuario, superProde, etapa,) => {
    const equiposProdeUsiario = obtenerListaEquipos(prodeUsuario, etapa);
    const equiposSuperProde = obtenerListaEquipos(superProde, etapa);

    console.log(equiposProdeUsiario);
    console.log(equiposSuperProde);

    const resultadosEtapa = equiposProdeUsiario.map(equipo => {
        const huboCoincidencia = equiposSuperProde.some(equipoGanador => equipoGanador.nombre === equipo.nombre);
        const resultado = {...equipo }

        if(huboCoincidencia){
            const puntajekey = 'ACIERTO_' + etapa.toUpperCase()
            resultado.puntos = puntaje.puntajetorneo[puntajekey]
        }else {
            resultado.puntos = puntaje.puntajetorneo.SIN_ACIERTO
        }
        return resultado
    })
    return resultadosEtapa
}

export const obtenerListaEquipos = (prode, etapa) => {
    const {torneo} = prode;
    const constKeysEtapas = Object.keys(torneo).filter(nombre => nombre.includes(etapa));
    console.log(constKeysEtapas);
    const equiposEnEtapa = constKeysEtapas.map(nombreKey => ({nombre: torneo[nombreKey], formKey: nombreKey}));
    console.log(equiposEnEtapa);
    return equiposEnEtapa
  }