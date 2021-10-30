import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../actions';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ActiveProjectContainer = (props) => {
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    function returnProjectLeadName(team_id, project_id) {
        let team
        let project
        let project_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            project = team[0].projects.filter((project) => project.id === project_id)
            if (project[0]) {
                project_lead = team[0].members.filter((member) => member.id === project[0].lead_id)
                if (project_lead[0]) {
                    if (!project_lead[0].last_name) {
                        return project_lead[0].first_name
                    } else {
                        return (project_lead[0].first_name + ' ' + project_lead[0].last_name)
                    }
                }
            }
        }
    }

    function returnProjectLeadInitials(team_id, project_id) {
        let team
        let project
        let project_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            project = team[0].projects.filter((project) => project.id === project_id)
            if (project[0]) {
                project_lead = team[0].members.filter((member) => member.id === project[0].lead_id)
                if (project_lead[0]) {
                    if (!project_lead[0].last_name) {
                        return project_lead[0].first_name.charAt(0)
                    } else {
                        return (project_lead[0].first_name.charAt(0) + project_lead[0].last_name.charAt(0))
                    }
                }
            }
        }
    }

    function returnProjectLeadEmail(team_id, project_id) {
        let team
        let project
        let project_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            project = team[0].projects.filter((project) => project.id === project_id)
            if (project[0]) {
                project_lead = team[0].members.filter((member) => member.id === project[0].lead_id)
                if (project_lead[0]) {
                    if (project_lead[0]) {
                        return project_lead[0].email
                    }
                }
            }
        }
    }

    function returnProject(teams, active_team_id, active_project_id) {
        let team = teams.filter((team) => team.id === active_team_id)
        if (team[0]) {
            let project = team[0].projects.filter((project) => project.id === active_project_id)
            if (project[0]) {
                return project[0]
            }
        }
    }

    let project = returnProject(props.teams.all_teams, props.UI.activeWorkspace.workspace_id, props.UI.activeProject.project_id)
    console.log(project)

    return(
        <div className="active-project-container">
            <div className="project-tasks-container">
                <div className="project-tasks-container-header">
                    <h2>Overview</h2>
                </div>
                <div className="project-tasks-overview">
                    <div className="project-info">
                        <div className="project-info-item"><div className="project-info-item-header">Overdue</div><h3 className={project.tasks.overdue.length === 0 ? "grey" : 'red'}>{project.tasks.overdue.length}</h3></div>
                        <div className="project-info-item"><div className="project-info-item-header">Due Today</div><h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3></div>
                        <div className="project-info-item"><div className="project-info-item-header">Due Soon</div><h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3></div>
                        <div className="project-info-item"><div className="project-info-item-header">Active Tasks</div><h3>{project.tasks.all_tasks.length}</h3></div>
                        <div className="project-info-item"><div className="project-info-item-header">Completion</div><h3>{isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? <div style={{ width: 50, height: 50, margin: 'auto' }}><CircularProgressbar value={0} text={'0%'} /></div> : <div style={{ width: 50, height: 50, margin: 'auto' }}><CircularProgressbar value={(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100))} text={`${(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100))}%`} styles={buildStyles({rotation: 0.5})}/></div>}</h3></div>
                        <div className="project-info-item"><div className="project-info-item-header">Project Lead</div><div className="lead">
                        <div className="member-container"><div className="avatar">{returnProjectLeadInitials(props.UI.activeWorkspace.workspace_id, props.UI.activeProject.project_id)}</div><div className='team-member'>{returnProjectLeadName(props.UI.activeWorkspace.workspace_id, props.UI.activeProject.project_id)} <br /><span>{returnProjectLeadEmail(props.UI.activeWorkspace.workspace_id, props.UI.activeProject.project_id)}</span></div></div></div></div>
                    </div>
                </div>
                <div className="projects-tasks-container-tasks">
                    <h2>Tasks <span className='icon' onClick={() => props.toggleModal(true, 'createTask')}>{addIcon}</span></h2>
                </div>
            </div>
            <div className="project-task-details-container">

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        projects_led: state.projects_led,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { toggleModal })(ActiveProjectContainer);