import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../../assets/stylesheets/Sidebar';
import axios from 'axios'
import Modal from 'react-modal';
import ProjectForm from '../Forms/ProjectForm';
import TeamsContainer from './TeamsContainer';

import React, { Component } from 'react';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const customStyles = {
    content: {
      backgroundColor: 'var(--base2)'
    },
  };

const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
const taskIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>
const teamIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><rect fill="none" height="24" width="24"/><g><path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z"/></g></svg>
const projectIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zM4 9h16v5h-5v-3H9v3H4V9zm9 6h-2v-2h2v2zm6 4H5v-3h4v1h6v-1h4v3z"/></svg>

class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            activeCreateOption: null,
            userProjects: [],
            userTeams: [],
            userTasks: [],
        }

        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.determineForm = this.determineForm.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/teams', {})
        .then( (data) => {
            this.setState({
                userTeams: [...data.data.teams]
            })
        })
        .catch( (data) => {
        })

        axios.get('http://localhost:3000/api/projects', {})
        .then( (data) => {
            this.setState({
                userProjects: [...data.data.projects]
            })
        })
        .catch( (data) => {
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.userProjects !== prevProps.userProjects) {
          this.fetchData(this.props.userProjects);
        }

        if (this.props.userTeams !== prevProps.userTeams) {
            this.fetchData(this.props.userTeams);
        }
    }

    handleModalOpen(type) {
        this.setState({
            modalIsOpen: true,
            activeOption: type
        })

        this.determineForm(type)
    }

    handleModalClose() {
        this.setState({
            modalIsOpen: false,
            activeOption: null
        })
    }

    handleCreate(event, type) {
        event.preventDefault();

        if (type == 'task') {
            console.log('task')
        } else if (type == 'project') {
            axios.post('http://localhost:3000/api/projects', {
                name: event.target.title.value,
                description: event.target.description.value,
                team_id: 1
            })
            .then( (data) => {
                this.handleModalClose()

                axios.get('http://localhost:3000/api/projects', {})
                .then( (data) => {
                    this.setState({
                        userProjects: [...data.data.projects]
                    })
                })
                .catch( (data) => {
                })
            })
            .catch( (data) => {
            })
        } else if (type == 'team') {
            axios.post('http://localhost:3000/api/teams', {
                name: 'test1',
            })
            .then( (data) => {
                this.handleModalClose()

                axios.get('http://localhost:3000/api/teams', {})
                .then( (data) => {
                    this.setState({
                        userTeams: [...data.data.teams]
                    })
                })
                .catch( (data) => {
                })
            })
            .catch( (data) => {
            })
        }
    }

    determineForm(type) {
        if (type == 'task') {

        } else if (type == 'project') {
            return <ProjectForm onSubmit={(event) => {this.handleCreate(event, type)}}/>
        } else if (type == 'team') {

        }
    }
    
    render () {
        let teams;
        let projects;
        let maxTeams;
        let maxProjects;
        const form = this.determineForm(this.state.activeOption)

        if (this.state.userTeams.length != 0) {
            teams = this.state.userTeams.map(team => <div className="text-item" key={team.id} id={team.id}><h3>{team.name}</h3></div>)
            if (this.state.userTeams.length == 10) {
                maxTeams = <div className="see-more"><h3><a>See More</a></h3></div>
            }
        } else {
            teams = <div className="empty-teams">No Teams</div>
        }

        if (this.state.userProjects.length != 0) {
            projects = this.state.userProjects.map(project => <div className="text-item" key={project.id} id={project.id}><h3>{project.name}</h3></div>)
            if (this.state.userProjects.length == 10) {
                maxTeams = <div className="see-more"><h3><a>See More</a></h3></div>
            }
        } else {
            projects = <div className="empty-projects">No Projects</div>
        }

        return (
            <ProSidebar>
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <h2>Home</h2>
                        <div className="text-item"><span>{taskIcon}</span><h3>My Tasks</h3></div>
                        <div className="text-item"><span>{projectIcon}</span><h3>My Projects</h3></div>
                        <div className="text-item"><span>{teamIcon}</span><h3>My Teams</h3></div>
                    </div>
                    <div className="sidebar-item">
                        <h2>Create</h2>
                        <div className="text-item" onClick={() => this.handleModalOpen('task')}><h3>Create Task</h3><span>{addIcon}</span></div>
                        <div className="text-item" onClick={() => this.handleModalOpen('project')}><h3>Create Project</h3><span>{addIcon}</span></div>
                        <div className="text-item" onClick={() => this.handleModalOpen('team')}><h3>Create Team</h3><span>{addIcon}</span></div>
                    </div>
                    <div className="sidebar-item">
                        <h2>Projects</h2>
                        <div className="sidebar-sub-item">
                            { projects }
                            { maxProjects }
                        </div>
                    </div>
                    <div className="sidebar-item">
                        <h2>Teams</h2>
                        <div className="sidebar-sub-item">
                            { teams }
                            { maxTeams }
                        </div>
                    </div>
                </div>
                <div className="modal">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        style={customStyles}
                        contentLabel="Modal"
                    >
                        <div className="button" onClick={this.handleModalClose}>close</div>
                        { form }
                    </Modal>
                </div>
            </ProSidebar>
        )
    }
}

export default Sidebar;