import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { amendActiveProject, amendActiveWorkspace } from '../../../actions';
import Emoji from '../../Emoji/Emoji';

const MyProjectsContainer = (props) => {
    let homeRef = useRef()

    function handleProjectSelect(project_id, project_name, team_id, team_name) {
        props.amendActiveProject(project_id, project_name, {workspace_id: team_id, workspace_name: team_name})
    }

    function returnTeamName(team_id) {
        let team
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            return team[0].name
        }
    }

    function returnProjectLeadName(team_id, project_lead_id) {
        let team
        let project_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            project_lead = team[0].members.filter((member) => member.id === project_lead_id)
            if (project_lead[0]) {
                return (project_lead[0].first_name + ' ' + project_lead[0].last_name)
            }
        }
    }

    let projects
    let projectsLed
    
    if (props.projects.all_projects) {
        if (props.projects_led.length >= 1) {
            projectsLed = props.projects_led.map(project => <div key={project.id} id={project.id} className='project-item' onClick={() => handleProjectSelect(project.id, project.name, project.team_id, returnTeamName(project.team_id))}><h3 title={project.name}>{project.name}</h3> <h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3> <h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3> <h3 className={project.tasks.all_tasks.length === 0 ? "grey" : null}>{project.tasks.all_tasks.length}</h3> <h3 className={project.tasks.completed.length === 0 ? "grey" : null}>{project.tasks.completed.length}</h3> <h3 className={isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? 'grey' : null}>{isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? 'N/A' : (Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100) + '%')}</h3> <h3 title={returnTeamName(project.team_id)}>{returnTeamName(project.team_id)}</h3></div>)
        }
        if (props.projects.others_projects.length >= 1) {
            projects = props.projects.others_projects.map(project => <div key={project.id} id={project.id} className='project-item' onClick={() => handleProjectSelect(project.id, project.name, project.team_id, returnTeamName(project.team_id))}><h3 title={project.name}>{project.name}</h3> <h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3> <h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3> <h3 title={returnTeamName(project.team_id)}>{returnTeamName(project.team_id)}</h3> <h3 title={returnProjectLeadName(project.team_id, project.lead_id)}>{returnProjectLeadName(project.team_id, project.lead_id)}</h3> </div>)
        }
        return(
            <div className="projects-container" ref={homeRef}> 
                <div className="projects">
                    { projectsLed ? <h2>Projects Led</h2> : null }
                    { projectsLed ? <div className="projects-led"><div className="project-header"><h3>Project</h3> <h3>Tasks Due Today</h3> <h3>Tasks Due Soon</h3> <h3>Active Tasks</h3> <h3>Completed Tasks</h3> <h3>Complete %</h3> <h3>Team</h3></div> { projectsLed }</div> : null }
                    <h2>Projects</h2>
                    <div className="all-projects">
                        { projects ? <div className="project-header"><h3>Project</h3> <h3>Tasks Due Today</h3> <h3>Tasks Due Soon</h3> <h3>Team</h3> <h3>Project Lead</h3></div> : null }
                        { projects ? projects : <div className="empty">No Projects &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🤔'/></div> }
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
    

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        projects_led: state.projects_led
    }
}

export default connect(mapStateToProps, { amendActiveProject, amendActiveWorkspace })(MyProjectsContainer);