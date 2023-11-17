import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import './EquiposAleatorios.css'; // Importar el archivo de estilos CSS

class EquiposAleatorios extends Component {
  state = {
    alumnos: [],
    teams: Array.from({ length: 8 }, () => []), // Inicializar teams como un array vacío de 8 elementos
  };

  loadEstudiantes = () => {
    const request = "api/alumnos/filtrarcurso/2023";
    const url = Global.urlApi + request;

    axios.get(url)
      .then(response => {
        const alumnos = response.data;

        this.setState({
          alumnos: alumnos,
          status: true,
        });
      })
      .catch(error => {
        console.error('Error al obtener la lista de alumnos:', error);
      });
  };

  componentDidMount() {
    this.loadEstudiantes();
  }

  generarEquipos = () => {
    const alumnosCopy = [...this.state.alumnos];
    const alumnosDesordenados = alumnosCopy.sort(() => Math.random() - 0.5);
    const alumnosPorEquipo = Math.ceil(alumnosDesordenados.length / 8);
    const equipos = [];

    for (let i = 0; i < 8; i++) {
      const equipo = alumnosDesordenados.splice(0, alumnosPorEquipo);
      equipos.push(equipo);
    }

    this.setState({ teams: equipos });
  };

  generarInforme = () => {
    // Implementa la lógica para generar el informe
  };

  render() {
    return (
      <div className="main-container">
        <div className="tabla-alumnos-container">
          <h2 margin="20px"> Alumnos 2023</h2>
          <ul className="alumnos-list">
            {this.state.alumnos.map((alumno, index) => (
              <li key={index}>{alumno.nombre} {alumno.apellidos}</li>
            ))}
          </ul>
          <div className="button-container">
            <button onClick={this.generarEquipos}>Generar Equipos</button>
            <button onClick={this.generarEquipos}>A Jugar</button>
            <button onClick={this.generarInforme}>Generar Informe</button>
          </div>
        </div>
        <div className="separator"></div>
        <div className="grilla-equipos-container">

          <fieldset>
          <legend><h2>Equipos</h2></legend>
          <div className="equipos-grid">
            {this.state.teams.map((equipo, index) => (
              <div key={index} className="equipo-contenedor">
                <h3>Equipo {index + 1}</h3>
                <table className="bordered-table equipos-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipo.map((alumno, alumnoIndex) => (
                      <tr key={alumnoIndex}>
                        <td>{alumno.nombre} {alumno.apellidos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default EquiposAleatorios;

