import React, { useState, useEffect } from 'react';
import "../../assets/stylesheets/App.css"
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body'
import axios from 'axios'
import { connect } from 'react-redux';
import { fetchTeams, fetchProjects, fetchTasks, fetchUI, createTeam, createProject, createTask, amendActiveSidebar, toggleModal } from '../actions';
import Modal from 'react-modal';
import ProjectForm from '../components/Forms/ProjectForm';
import TeamForm from '../components/Forms/TeamForm';
import TaskForm from '../components/Forms/TaskForm';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const customStyles = {
    content: {
        backgroundColor: 'var(--base2)',
        borderRadius: '.5rem'
    },
};

Modal.setAppElement('#root');

const App = (props) => {
    useEffect(() => {
        props.fetchTeams()
        props.fetchProjects()
        props.fetchTasks()
        props.fetchUI()
    }, [])

    function determineForm(type) {
        if (type === null) {
            return
        } else if (type === 'task') {
            return <TaskForm onSubmit={(event) => {handleCreate(event, type)}} state={props.projects, props.teams}/>
        } else if (type === 'project') {
            return <ProjectForm onSubmit={(event) => {handleCreate(event, type)}}/>
        } else if (type === 'team') {
            return <TeamForm onSubmit={(event) => {handleCreate(event, type)}}/>
        }
    }

    function handleCreate(event, type) {
        event.preventDefault();

        if (type == 'task') {
            props.createTask(
                event.target.title.value,
                event.target.description.value,
                props.UI.activeWorkspace.workspace_id,
                props.UI.activeProject.project_id,
                true,
                event.target.due_date.value, 
                // event.target.assignee_id.value,
                // event.target.parent_task_id.value
                1,
                null
            )
        } else if (type == 'project') {
            props.createProject(
                event.target.name.value,
                event.target.description.value,
                props.UI.activeWorkspace.workspace_id
            )
        } else if (type == 'team') {
            props.createTeam(
                event.target.name.value,
            )
        }
        props.toggleModal(false, null)
    }

    const form = determineForm(props.UI.modalOption)

    return (
        <div id="view">
            <Sidebar/>
            <div className="content-container">
                <Body/>
            </div>
            <div className="modal">
                <Modal
                    isOpen={props.UI.isModalOpen}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <div className="button" onClick={() => props.toggleModal(false, null)}>close</div>
                    { form }
                </Modal>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        tasks: state.tasks,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { fetchTeams, fetchProjects, fetchTasks, fetchUI, createTeam, createProject, createTask, amendActiveSidebar, toggleModal })(App);