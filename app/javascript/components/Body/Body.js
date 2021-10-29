import React, { useState, useEffect, useRef } from 'react';
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetUI, resetLoad } from '../../actions';
import MyTeamsContainer from './TeamsContainer/MyTeamsContainer';
import MyProjectsContainer from './ProjectsContainer/MyProjectsContainer';
import MyTasksContainer from './TasksContainer/MyTasksContainer';
import DashboardContainer from './DashboardContainer/DashboardContainer';
import ActiveTeamContainer from './TeamsContainer/ActiveTeamContainer';
import ActiveProjectContainer from './ProjectsContainer/ActiveProjectContainer';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

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
            header = props.activeWorkspace.workspace_name
            if (props.activeProject) {
                header = props.activeProject.project_name
            }
        }
        return header
    }

    function determineRender() {
        if (props.UI.initialLoad) {
            return <ClipLoader color={'#ff8851'} loading={props.UI.initialLoad} css={override} size={50} />
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

    const Header = determineHeader(props.UI)
    const Body = determineRender()

    return (
        <div className="body-content">
            <header className="header"><h2>{ Header }</h2><a href="http://localhost:3000/users/sign_out" onClick={() => { props.resetLoad(); props.resetUI();  }}>Logout</a> </header>
            { Body }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        UI: state.UI
    }
}

export default connect(mapStateToProps, { resetUI, resetLoad })(Body);