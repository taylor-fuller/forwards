import React, { Component } from 'react';
import "../../../assets/stylesheets/ProjectsContainer.css"
import axios from 'axios'
import Modal from 'react-modal';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

Modal.setAppElement(document.getElementById('root'));

class ProjectsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            modalIsOpen: false,
        }

        axios.get('http://localhost:3000/api/projects', {    
        })
        .then( (data) => {
            this.setState({
                projects: [...data.data.projects]
            })
            console.log(this.state.projects)
            console.log(data)
        })
        .catch( (data) => {
        })
    }

    render () {
        return (
            <div className="projects-container">
                
            </div>
        )
    }
}

export default ProjectsContainer;