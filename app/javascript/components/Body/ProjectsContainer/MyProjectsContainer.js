import React, { useEffect, useRef, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { amendActiveProject, amendActiveWorkspace } from '../../../actions';
import Emoji from '../../Emoji/Emoji';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MyProjectsContainer = (props) => {
    let homeRef = useRef()

    function handleProjectSelect(project_id, project_name, team_id, team_name) {
        props.amendActiveProject(project_id, project_name, {workspace_id: team_id, workspace_name: team_name})
    }

    function returnTeamName(team_id) {
        let team
        team = props.teams.all_teams.find((team) => team.id === team_id)
        if (team) {
            return team.name
        }
    }

    function returnProjectLeadName(team_id, project_lead_id) {
        let team
        let project_lead
        team = props.teams.all_teams.find((team) => team.id === team_id)
        if (team) {
            project_lead = team.members.find((member) => member.id === project_lead_id)
            if (project_lead) {
                return (project_lead.first_name + ' ' + project_lead.last_name)
            }
        }
    }

    function renderProjectsLed() {
        let projectsLed
        if (props.projects_led && props.projects_led.length >= 1) {
            projectsLed = props.projects_led.map(project => <div key={project.id} id={project.id} className='project-item' onClick={() => handleProjectSelect(project.id, project.name, project.team_id, returnTeamName(project.team_id))}><h3 title={project.name}>{project.name}</h3> <h3 className={project.tasks.overdue.length === 0 ? "grey" : 'red'}>{project.tasks.overdue.length}</h3> <h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3> <h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3> <h3 className={project.tasks.all_tasks.length-project.tasks.completed.length === 0 ? "grey" : null}>{project.tasks.all_tasks.length-project.tasks.completed.length}</h3> <h3>{isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? <div style={{ width: 30, height: 30, margin: 'auto' }}><CircularProgressbar value={0} text={'0%'} /></div> : <div style={{ width: 30, height: 30, margin: 'auto' }}><CircularProgressbar value={(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100))} text={`${(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100))}%`} styles={buildStyles({rotation: 0.5})}/></div>}</h3> <h3 title={returnTeamName(project.team_id)}>{returnTeamName(project.team_id)}</h3></div>)
            return(
                <Fragment>
                    <h2>Projects Led</h2>
                    <div className="projects-led"><div className="project-header"><h3>Project</h3> <h3>Overdue</h3> <h3>Tasks Due Today</h3> <h3>Tasks Due Soon</h3> <h3>Active Tasks</h3> <h3>Complete %</h3> <h3>Team</h3></div> { projectsLed }</div>
                </Fragment>
            )
        } else {
            return null
        }
    }

    function renderProjects() {
        let projects
        if (props.projects.all_projects && props.projects.all_projects.length >= 1) {
            projects = props.projects.others_projects.map(project => <div key={project.id} id={project.id} className='project-item' onClick={() => handleProjectSelect(project.id, project.name, project.team_id, returnTeamName(project.team_id))}><h3 title={project.name}>{project.name}</h3> <h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3> <h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3> <h3 title={returnTeamName(project.team_id)}>{returnTeamName(project.team_id)}</h3> <h3 title={returnProjectLeadName(project.team_id, project.lead_id)}>{returnProjectLeadName(project.team_id, project.lead_id)}</h3> </div>)
            return(
                <Fragment>
                    <div className="project-header"><h3>Project</h3> <h3>Tasks Due Today</h3> <h3>Tasks Due Soon</h3> <h3>Team</h3> <h3>Project Lead</h3></div>
                    { projects }
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <div className="empty">No Projects &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🤔'/></div>
                </Fragment>
            )
        }
    }

    
    const Projects = useMemo(() => renderProjects(), [props.projects.all_projects])
    const ProjectsLed = useMemo(() => renderProjectsLed(), [props.projects_led])

    return(
        <div className="projects-container" ref={homeRef}> 
            <div className="projects">
                { ProjectsLed }
                <h2>Projects</h2>
                <div className="all-projects">
                    { Projects}
                </div>
            </div>
        </div>
    )
}
    

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        projects_led: state.projects_led
    }
}

export default connect(mapStateToProps, { amendActiveProject, amendActiveWorkspace })(MyProjectsContainer);