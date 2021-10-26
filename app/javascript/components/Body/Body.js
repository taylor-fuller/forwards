import React, { useState, useEffect, useRef } from 'react';
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetUI } from '../../actions';
import MyTeamsContainer from './TeamsContainer/MyTeamsContainer';
import MyProjectsContainer from './ProjectsContainer/MyProjectsContainer';
import MyTasksContainer from './TasksContainer/MyTasksContainer';
import DashboardContainer from './DashboardContainer/DashboardContainer';

const Body = (props) => {
    let homeRef = useRef()

    useEffect(() => {
        if (homeRef.current) {
            homeRef.current.scrollTo(0, 0)
        }
    }, [props.activeSidebarOption])

    function determineHeader(props) {
        let header
        if (props.activeSidebarOption === 'Dashboard' || props.activeSidebarOption === 'My Tasks' || props.activeSidebarOption === 'My Teams' || props.activeSidebarOption === 'My Projects') {
            header = props.activeSidebarOption
        } else {
            header = props.activeWorkspace.workspace_name
            if (props.activeProject) {
                header = header + ' > ' + props.activeProject.project_name
            }
            if (props.activeProject && props.activeTask) {
                header = header + ' > ' + props.activeTask.task_name
            }
        }
        return header
    }

    function resetUI() {
        props.resetUI()
    }

    function determineRender() {
        if (props.UI.activeSidebarOption === 'Dashboard') {
            return <DashboardContainer />
        } else if (props.UI.activeSidebarOption === 'My Tasks') {
            return <MyTasksContainer />
        } else if (props.UI.activeSidebarOption === 'My Projects') {
            return <MyProjectsContainer />
        } else if (props.UI.activeSidebarOption === 'My Teams') {
            return <MyTeamsContainer />
        } else {
            if (props.UI.activeProject) {
                return 'project page'
            } else {
                return 'team page'
            }
            
        }
    }

    const Header = determineHeader(props.UI)
    const Body = determineRender()

    return (
        <div className="body-content">
            <div className="header"><h2>{ Header }</h2><a href="http://localhost:3000/users/sign_out" onClick={() => resetUI()}>Logout</a> </div>
            { Body }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        UI: state.UI
    }
}

export default connect(mapStateToProps, { resetUI })(Body);