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
            Teams = <div className="empty-teams">No Teams</div>
        }
    
        if (props.projects.length != 0) {
            Projects = props.projects.map(project => <div key={project.id} id={project.id}><h3>{project.name}</h3></div>)
            if (props.projects.length == 10) {
                maxProjects = <div className="see-more"><h3><a>See More</a></h3></div>
            }
        } else {
            Projects = <div className="empty-projects">No Projects</div>
        }

        let content;
        if (active === 'dashboard') {
            content = (
                <div className="dashboard-container">
                    <div className="tasks">
                        <h2>My Tasks</h2>
                    </div>
                    <div className="projects-and-teams">
                        <div className="projects">
                            <h2>My Projects</h2>
                            { Projects }
                        </div>
                        <div className="teams">
                            <h2>My Teams</h2>
                            { Teams }
                        </div>
                    </div>
                </div>
            )
        } else if (active === 'tasks') {
            content = (
                <div className="tasks-container">
                    <div className="tasks">
                        <h2>Tasks</h2>
                    </div>
                </div>
            )
        } else if (active === 'projects') {
            content = (
                <div className="projects-container">
                    <div className="projects">
                        <h2>Projects</h2>
                    </div>
                </div>
            )
        } else if (active === 'teams') {
            content = (
                <div className="teams-container">
                    <div className="teams">
                        <h2>Teams</h2>
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