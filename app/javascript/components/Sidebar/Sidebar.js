import { ProSidebar, SidebarHeader, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../../assets/stylesheets/Sidebar';
import axios from 'axios'
import { connect } from 'react-redux';
import { createTeam, createProject, amendActiveSidebar, amendActiveWorkspace, amendActiveProject, toggleModal } from '../../actions';
import React, { useState, useEffect } from 'react';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })



const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"/></svg>
const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
const teamIcon = <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><rect fill="none" height="24" width="24"/><g><path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"/></g></svg>
const projectIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0zm10 5h4v2h-4zm0 0h4v2h-4z" fill="none"/><path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"/></svg>
const taskIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>

const Sidebar = (props) => {
    function handleWorkspaceSelect(team_id, team_name) {
        props.amendActiveWorkspace({workspace_id: team_id, workspace_name: team_name})
        props.amendActiveSidebar('Dashboard')
    }

    function determineSelects() {
        let Teams

        if (props.teams.length != 0) {
            Teams = props.teams.map(team => <option key={team.id} value={team.name} id={team.id} onClick={() => handleWorkspaceSelect(team.id, team.name)}>{team.name}</option>)
            return (
                <form>
                    <select name="workspace" value={props.UI.activeWorkspace.workspace_name ? props.UI.activeWorkspace.workspace_name : ''} id="workspace" readOnly>
                        <option value='' disabled hidden>Select a Workspace</option>
                        {Teams}
                    </select>
                </form>
            )
        } else {
            return(<div className="empty">No Workspaces</div>)
        }
    }

    function handleSidebarSelect(option) {
        props.amendActiveSidebar(option)
    }

    function handleProjectSelect(project_id, project_name) {
        props.amendActiveProject(project_id, project_name)
    }
    
    let Projects
    let userProjects = props.projects.filter((project) => project.team_id === Number(props.UI.activeWorkspace.workspace_id))
    if (userProjects.length != 0) {
        Projects = userProjects.map(project => <div key={project.id} id={project.id} className={props.UI.activeProject.project_id === project.id ? 'text-item active' : 'text-item'} onClick={() => handleProjectSelect(project.id, project.name)}><h4 id={project.id}>{project.name}</h4></div>)
    } else {
        Projects = <div className="empty">No Projects</div>
    }

    return (
        <ProSidebar>
            <SidebarHeader>
                <h1>forwards</h1>
            </SidebarHeader>
            <div className="sidebar-container">
                <div className="sidebar-home">
                    <h2>Home</h2>
                    <div className={props.UI.activeSidebarOption === 'Dashboard' ? 'text-item active' : 'text-item'} onClick={() => handleSidebarSelect('Dashboard')}><span>{homeIcon}</span><h3>Dashboard</h3></div>
                    <div className={props.UI.activeSidebarOption === 'My Tasks' ? 'text-item active' : 'text-item'} onClick={() => handleSidebarSelect('My Tasks')}><span>{taskIcon}</span><h3>My Tasks</h3></div>
                    <div className={props.UI.activeSidebarOption === 'My Projects' ? 'text-item active' : 'text-item'} onClick={() => handleSidebarSelect('My Projects')}><span>{projectIcon}</span><h3>My Projects</h3></div>
                    <div className={props.UI.activeSidebarOption === 'My Teams' ? 'text-item active' : 'text-item'} onClick={() => handleSidebarSelect('My Teams')}><span>{teamIcon}</span><h3>My Teams</h3></div>
                </div>
                <div className="sidebar-item">
                    <h2>Create</h2>
                    <div className="text-item" onClick={() => props.toggleModal(true, 'task')}><h3>Create Task</h3><span>{addIcon}</span></div>
                </div>
                <div className="sidebar-workspace">
                    <h2>Workspace <span className='icon' onClick={() => props.toggleModal(true, 'team')}>{addIcon}</span></h2>
                    {determineSelects()}
                </div>
                <div className="sidebar-item">
                    <h2>Projects <span className='icon' onClick={() => props.toggleModal(true, 'project')}>{addIcon}</span></h2>
                    { props.UI.activeWorkspace ? Projects : <div className="empty">Select a Workspace</div> }
                </div>
            </div>
        </ProSidebar>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { amendActiveSidebar, amendActiveWorkspace, amendActiveProject, toggleModal })(Sidebar);