import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const Body = (props) => {
    function determineRender(active) {
        let Projects
    
        if (props.projects.length != 0) {
            Projects = props.projects.map(project => <div key={project.id} id={project.id}><h3>{project.name}</h3></div>)
        } else {
            Projects = <div className="empty">No Projects</div>
        }

        let content;
        if (active === 'Dashboard') {
            content = (
                <div className="dashboard-container">
                    <div className="dashboard-tasks">
                        <h2>Tasks Due Soon</h2>
                        <div className="tasks-due-soon">
                            
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

    const Content = determineRender(props.settings.activeSidebarOption)
    const Header = determineHeader(props.settings)

    return (
        <div className="body-content">
            <div className="header"><h2>{ Header }</h2></div>
            { Content ? Content : null }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        settings: state.settings
    }
}

export default connect(mapStateToProps)(Body);