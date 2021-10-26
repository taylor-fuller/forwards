import React, { useState, useEffect, useRef } from 'react';
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetUI } from '../../actions';
import HomeContainer from './HomeContainer';

const Body = (props) => {
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

    function determineRender(active) {
        if (active === 'Dashboard' || active === 'My Tasks' || active === 'My Projects' || active === 'My Teams') {
            return <HomeContainer />
        } else {
            return null
        }
    }

    const Header = determineHeader(props.UI)
    const Body = determineRender(props.UI.activeSidebarOption)

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