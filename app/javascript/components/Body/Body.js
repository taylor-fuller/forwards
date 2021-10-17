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
    const [activeSidebarOption, setActiveSidebarOption] = useState(props.activeOption)

    useEffect(() => {
        setActiveSidebarOption(props.activeOption)
    }, [props.activeOption])

    function determineRender(active) {
        let Teams
        let Projects
        let maxTeams
        let maxProjects

        if (props.teams.length != 0) {
            Teams = props.teams.map(team => <div key={team.id} id={team.id}><h3>{team.name}</h3></div>)
            if (props.teams.length == 10) {
                maxTeams = <div className="see-more"><h3><a>See More</a></h3></div>
            }
        } else {
            Teams = <div className="empty">No Teams</div>
        }
    
        if (props.projects.length != 0) {
            Projects = props.projects.map(project => <div key={project.id} id={project.id}><h3>{project.name}</h3></div>)
            if (props.projects.length == 10) {
                maxProjects = <div className="see-more"><h3><a>See More</a></h3></div>
            }
        } else {
            Projects = <div className="empty">No Projects</div>
        }

        let content;
        if (active === 'dashboard') {
            content = (
                <div className="dashboard-container">
                    <div className="dashboard-my-tasks">
                        <h2>My Tasks</h2>
                        <div className="today">
                            <h3>Due Today</h3>
                        </div>
                        <div className="upcoming">
                            <h3>Upcoming</h3>
                        </div>
                    </div>
                    <div className="recent-activity">
                        <h2>Recent Activity</h2>
                    </div>
                </div>
            )
        } else if (active === 'tasks') {
            content = (
                <div className="task-container">
                    <div className="tasks">
                        <div className="task-header">
                            <h2>Tasks</h2>
                            <div className="header-bar">
                                <div>Task</div>
                                <div>Assignee</div>
                                <div>Due Date</div>
                                <div>Status</div>
                                <div>Project</div>
                            </div>
                        </div>
                        <div className="task-list">

                        </div>
                    </div>
                    <div className="task-detail">
                        <h2>Details</h2>
                    </div>
                </div>
            )
        } else if (active === 'projects') {
            content = (
                <div className="projects-container">
                    <div className="projects">
                        <h2>My Projects</h2>
                        <div className="projects-container">
                            <div className="projects-header">
                                <div>Project</div>
                                <div>Tasks Due Today</div>
                                <div>Upcoming Tasks</div>
                                <div>Status</div>
                                <div>Team</div> 
                            </div>
                            <div className="projects-list">
                                { Projects }
                                { maxProjects }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (active === 'teams') {
            content = (
                <div className="teams-container">
                    <div className="teams">
                        <h2>My Teams</h2>
                        <div className="teams-container">
                            <div className="teams-header">

                            </div>
                            <div className="teams-list">
                                { Teams }
                                { maxTeams }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return content
    }

    const Content = determineRender(activeSidebarOption)

    return (
        <div className="body-content">
            { Content }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects
    }
}

export default connect(mapStateToProps)(Body);