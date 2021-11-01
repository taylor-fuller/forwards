import React, { useState, useEffect } from 'react';
import "../../assets/stylesheets/App.css"
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body'
import { connect } from 'react-redux';
import { fetchAll,fetchUI, createTeam, createProject, createTask, toggleModal, patchTask, addUserToTeam } from '../actions';
import Modal from 'react-modal';
import CreateProjectForm from './Forms/CreateProjectForm';
import CreateTeamForm from './Forms/CreateTeamForm';
import CreateTaskForm from './Forms/CreateTaskForm';
import PatchProjectForm from './Forms/PatchProjectForm';
import PatchTeamForm from './Forms/PatchTeamForm';
import PatchTaskForm from './Forms/PatchTaskForm';
import AddTeamMemberForm from './Forms/AddTeamMemberForm';

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
        setTimeout(() => {
            props.fetchUI()
        }, 1000);
    }, [])
    
    function determineForm(type) {
        switch(type) {
            case 'createTask':
                return <CreateTaskForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            case 'createProject':
                return <CreateProjectForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            case 'createTeam':
                return <CreateTeamForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            case 'addTeamMember':
                return <AddTeamMemberForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            case 'patch task':
                return <PatchTaskForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            case 'patchProject':
                return <PatchProjectForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            case 'patchTeam':
                return <PatchTeamForm onSubmit={(event) => {handleFormSubmit(event, type)}}/>
                break;
            default:
                return
        }
    }

    function handleFormSubmit(event, type) {
        event.preventDefault();

        switch(type) {
            case 'createTask':
                props.createTask(
                    event.target.title.value,
                    event.target.description.value,
                    props.UI.activeWorkspace.workspace_id,
                    props.UI.activeProject.project_id,
                    false,
                    event.target.due_date.value,
                    Number(event.target.assignee_id.value),
                )
                props.toggleModal(false, null)
                break;
            case 'createProject':
                props.createProject(
                    event.target.name.value,
                    event.target.description.value,
                    props.UI.activeWorkspace.workspace_id
                )
                props.toggleModal(false, null)
                break;
            case 'createTeam':
                props.createTeam(
                    event.target.name.value,
                )
                props.toggleModal(false, null)
                break;
            case 'addTeamMember':
                props.addUserToTeam(event.target.user_id.value, props.UI.activeWorkspace.workspace_id)
                props.toggleModal(false, null)
                break;
            case 'patch task':
                console.log()
                // props.patchTask(
                //     event.target.title.value,
                //     event.target.description.value,
                //     props.UI.activeWorkspace.workspace_id,
                //     props.UI.activeProject.project_id,
                //     false,
                //     event.target.due_date.value,
                //     Number(event.target.assignee_id.value),
                // )
                props.toggleModal(false, null)
                break;
            case 'patchProject':
                console.log('patch project')
                // props.patchProject(
                //     event.target.name.value,
                //     event.target.description.value,
                //     props.UI.activeWorkspace.workspace_id
                // )
                props.toggleModal(false, null)
                break;
            case 'patchTeam':
                console.log('patch team')
                // props.patchTeam(
                //     event.target.name.value,
                // )
                props.toggleModal(false, null)
                break;
        }
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
                    <div className="button" onClick={() => props.toggleModal(false, null)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></div>
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

export default connect(mapStateToProps, { fetchAll, fetchUI, createTeam, createProject, createTask, toggleModal, patchTask, addUserToTeam })(App);