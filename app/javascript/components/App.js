import React, { useState, useEffect } from 'react';
import "../../assets/stylesheets/App.css"
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body'
import { connect } from 'react-redux';
import { fetchAll, createTeam, createProject, createTask, toggleModal, patchTask } from '../actions';
import Modal from 'react-modal';
import CreateProjectForm from './Forms/CreateProjectForm';
import CreateTeamForm from './Forms/CreateTeamForm';
import CreateTaskForm from './Forms/CreateTaskForm';
import PatchProjectForm from './Forms/PatchProjectForm';
import PatchTeamForm from './Forms/PatchTeamForm';
import PatchTaskForm from './Forms/PatchTaskForm';

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
        } else if (type === 'createTask') {
            return <CreateTaskForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
        } else if (type === 'createProject') {
            return <CreateProjectForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
        } else if (type === 'createTeam') {
            return <CreateTeamForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
        } else if (type === 'patchTask') {
            return <PatchTaskForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
        } else if (type === 'patchProject') {
            return <PatchProjectForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
        } else if (type === 'patchTeam') {
            return <PatchTeamForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
        }
    }

    function handleFormSubmit(event, type) {
        event.preventDefault();

        if (type == 'createTask') {
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
        } else if (type == 'createProject') {
            props.createProject(
                event.target.name.value,
                event.target.description.value,
                props.UI.activeWorkspace.workspace_id
            )
        } else if (type == 'createTeam') {
            props.createTeam(
                event.target.name.value,
            )
        } else if (type == 'patchTask') {
            console.log('patch task')
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
        } else if (type == 'patchProject') {
            console.log('patch project')
            // props.patchProject(
            //     event.target.name.value,
            //     event.target.description.value,
            //     props.UI.activeWorkspace.workspace_id
            // )
        } else if (type == 'patchTeam') {
            console.log('patch team')
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
        UI: state.UI
    }
}

export default connect(mapStateToProps, { fetchAll, createTeam, createProject, createTask, toggleModal, patchTask })(App);