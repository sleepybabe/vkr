import React from 'react';
import http from "../http-common";
// import { Link } from 'react-router-dom';

class FormCreation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        labs: [],
        selectedLabs: [],
        lab: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    http
        .get("/api/getLabs")
        .then(response => {
            this.setState({ labs: response.data });
        })
        .catch(error => {
            console.error(error);
        });
  }

  handleChange(event, changed) {
    const selectedValue = event.target.value;
    this.setState(prevState => ({
        [changed]: [...prevState[changed], selectedValue]
        // lab: { ...prevState.lab, [changed]: selectedValue }
    }));
    console.log(this.state.lab)
}

  handleSubmit(event) {
    event.preventDefault();

    http
        .post(`/download`,{selectedLabs: this.state.selectedLabs}, { responseType: 'blob' })
        .then(response => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(response.data);
            link.download = 'extension.zip';
            document.body.appendChild(link).click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error(error);
        });
  }

  render() {
      return (
          <div>
              <form onSubmit={this.handleSubmit}>
                  <label>Выберите лабораторные:</label>
                  <select id="select" multiple
                      onChange={(event) => this.handleChange(event, 'selectedLabs')}>
                      {this.state.labs.map(lab => (
                          <option key={lab.id} value={[lab.domic_lab_id, lab.module]}>
                              {lab.name}
                          </option>
                      ))}
                  </select>
                  <button type="submit">Отправить</button>
              </form>
          </div>
      );
  }
}

export default FormCreation;
