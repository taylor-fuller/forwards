import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetSettings } from '../../actions';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const Body = (props) => {
    function determineRender(active) {
        let Tasks
        let recentTasks

        if (props.tasks.length != 0) {
            Tasks = props.tasks.map(task => <div key={task.id} id={task.id}><h3>{task.title}</h3></div>)
        } else {
            Tasks = <div className="empty">No Tasks</div>
        }

        let content;
        if (active === 'Dashboard') {
            content = (
                <div className="dashboard-container">
                    <div className="dashboard-tasks">
                        <h2>Tasks Due Soon</h2>
                        <div className="tasks-due-soon">
                            { Tasks }
                        </div>
                    </div>
                    <div className="dashboard-favorites">
                        <h2>Favorites</h2>
                        <div className="favorites">
                            
                        </div>
                    </div>
                </div>
            )
        } else if (active === 'My Tasks') {
            content = (
                <div className="task-container">
                    <div className="task-list">   
                        <div className="tasks">
                            <h2>Recently Assigned</h2>
                            <div className="recently-assigned">
                                
                            </div>
                            <h2>Due Today</h2>
                            <div className="today">
                                
                            </div>
                            <h2>Upcoming</h2>
                            <div className="upcoming">
                                
                            </div>
                        </div>
                    </div>
                    <div className="task-detail-container">
                        <h2>Details</h2>
                        <div className="task-detail">
                        
                        </div>
                    </div>
                </div>
            )
        }
        return content
    }

    function determineHeader(props) {
        let header
        if (props.activeSidebarOption === 'Dashboard' || props.activeSidebarOption === 'My Tasks') {
            header = props.activeSidebarOption
        } else {
            header = props.activeWorkspace.workspace_name
            if (props.activeProject) {
                header = header + '  >  ' + props.activeProject.project_name
            } else if (props.activeTask) {
                header = header + '  >  ' + props.activeTask
            }
        }
        return header
    }

    function resetState() {
        props.resetSettings()
    }

    const Content = determineRender(props.settings.activeSidebarOption)
    const Header = determineHeader(props.settings)

    return (
        <div className="body-content">
            <div className="header"><h2>{ Header }</h2><a href="http://localhost:3000/users/sign_out" onClick={() => resetState()}>Logout</a> </div>
            { Content ? Content : null }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        tasks: state.tasks,
        settings: state.settings
    }
}

export default connect(mapStateToProps, { resetSettings })(Body);