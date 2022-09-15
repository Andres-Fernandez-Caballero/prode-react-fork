import React from 'react'
import { Partido } from './Partido'


export const GrupoPreliminar = (props) => {
    const nombre = props.nombre
    const partidos = props.partidos
    const resultados = props.resultados 
    const setresultados = props.setresultados
  return (
    <div className='containeritem col-md-5'>
        <h1>Grupo {nombre}</h1>
        {
          partidos.map((partido) =>
            <Partido 
              key={partido.partidoid} 
              resultados={resultados} 
              setresultados={setresultados} 
              partido={partido}
            />
          )
        }
    </div>
  )
}