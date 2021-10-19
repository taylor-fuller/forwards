import { ProSidebar, SidebarHeader, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../../assets/stylesheets/Sidebar';
import axios from 'axios'
import Modal from 'react-modal';
import ProjectForm from '../Forms/ProjectForm';
import TeamForm from '../Forms/TeamForm';
import TaskForm from '../Forms/TaskForm';
import { connect } from 'react-redux';
import { createTeam, createProject, amendActiveSidebar, amendActiveWorkspace } from '../../actions';
import React, { useState, useEffect } from 'react';

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

Modal.setAppElement('#root');

const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"/></svg>
const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
const taskIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>

const Sidebar = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeCreateOption, setActiveCreateOption] = useState(null);

    function handleModalOpen(type) {
        setModalIsOpen(true)
        setActiveCreateOption(type)
        determineForm(type)
    }

    function handleModalClose() {
        setModalIsOpen(false)
        setActiveCreateOption(null)
    }

    function handleCreate(event, type) {
        event.preventDefault();

        if (type == 'task') {
            console.log('task')
        } else if (type == 'project') {
            props.createProject(
                event.target.name.value,
                event.target.description.value,
                props.settings.activeWorkspace.workspace_id
            )
            handleModalClose()
        } else if (type == 'team') {
            props.createTeam(
                event.target.name.value,
            )
            handleModalClose()
        }
    }

    function determineForm(type) {
        if (type == 'task') {
            return <TaskForm onSubmit={(event) => {handleCreate(event, type)}}/>
        } else if (type == 'project') {
            return <ProjectForm onSubmit={(event) => {handleCreate(event, type)}}/>
        } else if (type == 'team') {
            return <TeamForm onSubmit={(event) => {handleCreate(event, type)}}/>
        }
    }

    function handleWorkspaceSelect(team_id, team_name) {
        props.amendActiveWorkspace({workspace_id: team_id, workspace_name: team_name})
        props.amendActiveSidebar('dashboard')
    }

    function handleProjectSelect(project_id) {
        console.log(project_id)
    }

    function determineSelects() {
        let Teams

        if (props.teams.length != 0) {
            Teams = props.teams.map(team => <option key={team.id} value={team.name} id={team.id} onClick={() => handleWorkspaceSelect(team.id, team.name)}>{team.name}</option>)
            return (
                <form>
                    <select name="workspace" value={props.settings.activeWorkspace.workspace_name ? props.settings.activeWorkspace.workspace_name : ''} id="workspace" readOnly>
                        <option value='' disabled hidden>Select a Workspace</option>
                        {Teams}
                    </select>
                </form>
            )
        } else {
            return(<div className="empty">No Workspaces</div>)
        }
    }
    
    let Projects 
    let Favorites = <div className="empty">No Favorites</div>
    const form = determineForm(activeCreateOption)

    let userProjects = props.projects.filter((project) => project.team_id === Number(props.settings.activeWorkspace.workspace_id))
    if (userProjects.length != 0) {
        Projects = userProjects.map(project => <div key={project.id} id={project.id} className="text-item" onClick={() => handleProjectSelect(project.id)}><h4 id={project.id}>{project.name}</h4></div>)
    } else {
        Projects = <div className="empty">No Projects</div>
    }

    return (
        <ProSidebar>
            <SidebarHeader>
                <h1>forwards</h1>
            </SidebarHeader>
            <div className="sidebar-container">
                <div className="sidebar-workspace">
                    <h2>Workspace <span className='icon' onClick={() => handleModalOpen('team')}>{addIcon}</span></h2>
                    {determineSelects()}
                </div>
                <div className="sidebar-home">
                    <h2>Home</h2>
                    <div className={props.settings.activeSidebarOption === 'dashboard' ? 'text-item active' : 'text-item'} id='dashboard'><span>{homeIcon}</span><h3>Dashboard</h3></div>
                    <div className={props.settings.activeSidebarOption === 'tasks' ? 'text-item active' : 'text-item'} id='tasks'><span>{taskIcon}</span><h3>My Tasks</h3></div>
                </div>
                <div className="sidebar-item">
                    <h2>Create</h2>
                    <div className="text-item" onClick={() => handleModalOpen('task')}><h3>Create Task</h3><span>{addIcon}</span></div>
                </div>
                <div className="sidebar-item">
                    <h2>Favorites <span className='icon'>{addIcon}</span></h2>
                        { Favorites }
                </div>
                <div className="sidebar-item">
                    <h2>Projects <span className='icon' onClick={() => handleModalOpen('project')}>{addIcon}</span></h2>
                    { Projects }
                </div>
            </div>
            <div className="modal">
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <div className="button" onClick={handleModalClose}>close</div>
                    { form }
                </Modal>
            </div>
        </ProSidebar>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        settings: state.settings
    }
}

export default connect(mapStateToProps, { createTeam, createProject, amendActiveSidebar, amendActiveWorkspace })(Sidebar);