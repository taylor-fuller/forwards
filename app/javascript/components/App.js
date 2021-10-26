import React, { useState, useEffect } from 'react';
import "../../assets/stylesheets/App.css"
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body'
import axios from 'axios'
import { connect } from 'react-redux';
import { fetchAll, createTeam, createProject, createTask, toggleModal, patchTask } from '../actions';
import Modal from 'react-modal';
import ProjectForm from './Forms/CreateProjectForm';
import TeamForm from './Forms/CreateTeamForm';
import TaskForm from './Forms/CreateTaskForm';

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
        props.fetchAll()
    }, [])

    function determineForm(type) {
        if (type === null) {
            return
        } else if (type === 'task') {
            return <TaskForm onSubmit={(event) => {handleCreate(event, type)}}/>
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
                false,
                event.target.due_date.value,
                Number(event.target.assignee_id.value),
                // event.target.parent_task_id.value
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

    function handleEdit(event, type) {
        event.preventDefault();

        if (type == 'task') {
            // props.patchTask(
            //     event.target.title.value,
            //     event.target.description.value,
            //     props.UI.activeWorkspace.workspace_id,
            //     props.UI.activeProject.project_id,
            //     false,
            //     event.target.due_date.value,
            //     Number(event.target.assignee_id.value),
            //     // event.target.parent_task_id.value
            //     null
            // )
        } else if (type == 'project') {
            // props.patchProject(
            //     event.target.name.value,
            //     event.target.description.value,
            //     props.UI.activeWorkspace.workspace_id
            // )
        } else if (type == 'team') {
            // props.patchTeam(
            //     event.target.name.value,
            // )
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

export default connect(mapStateToProps, { fetchAll, createTeam, createProject, createTask, toggleModal, patchTask })(App);