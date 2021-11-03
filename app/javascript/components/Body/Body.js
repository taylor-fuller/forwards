import React, { useState, useEffect, useRef } from 'react';
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetUI, resetLoad, toggleModal } from '../../actions';
import MyTeamsContainer from './TeamsContainer/MyTeamsContainer';
import MyProjectsContainer from './ProjectsContainer/MyProjectsContainer';
import MyTasksContainer from './TasksContainer/MyTasksContainer';
import DashboardContainer from './DashboardContainer/DashboardContainer';
import ActiveTeamContainer from './TeamsContainer/ActiveTeamContainer';
import ActiveProjectContainer from './ProjectsContainer/ActiveProjectContainer';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Switch, Route } from 'react-router'

const override = css`
  display: block;
  margin: auto;
`;

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
            if (props.initialLoad || (!props.activeWorkspace && props.isLoading)) {
                return null
            }
            header = props.activeWorkspace.workspace_name
            if (props.activeProject) {
                header = props.activeProject.project_name
            }
        }
        return header
    }

    function determineRender() {
        if (props.UI.initialLoad || props.UI.isLoading) {
            return <ClipLoader color={'#ff8851'} loading={true} css={override} size={50} />
        }
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
                return <ActiveProjectContainer />
            } else {
                return <ActiveTeamContainer />
            }
        }
    }

    function renderEditButton() {
        if (props.activeSidebarOption === 'Dashboard' || props.activeSidebarOption === 'My Tasks' || props.activeSidebarOption === 'My Teams' || props.activeSidebarOption === 'My Projects') {
            return null
        } else {
            if (props.UI.activeWorkspace && !props.UI.activeProject) {
                let editIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)" onClick={() => props.toggleModal(true, 'patchTeam')}><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                return editIcon
            } else if (props.UI.activeProject) {
                let editIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)" onClick={() => props.toggleModal(true, 'patchProject')}><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                return editIcon
            }
        }
    }

    const Header = determineHeader(props.UI)
    const Body = determineRender()

    return (
        <div className="body-content">
            <header className="header"><h2>{ Header } <span>{renderEditButton()}</span></h2><a href="http://localhost:3000/users/sign_out" onClick={() => { props.resetLoad(); props.resetUI();  }}>Logout</a> </header>
            { Body }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        UI: state.UI
    }
}

export default connect(mapStateToProps, { resetUI, resetLoad, toggleModal })(Body);