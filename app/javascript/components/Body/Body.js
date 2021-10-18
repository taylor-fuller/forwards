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
        if (active === 'dashboard') {
            content = (
                <div className="dashboard-container">
                    
                </div>
            )
        } else if (active === 'tasks') {
            content = (
                <div className="task-container">
                    <div className="tasks">
                        <h2>My Tasks</h2>
                        <div className="today">
                            <h3>Due Today</h3>
                        </div>
                        <div className="upcoming">
                            <h3>Upcoming</h3>
                        </div>
                    </div>
                    <div className="task-detail">
                        <h2>Details</h2>
                    </div>
                </div>
            )
        }
        return content
    }

    const Content = determineRender(props.settings.activeSidebarOption)

    return (
        <div className="body-content">
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