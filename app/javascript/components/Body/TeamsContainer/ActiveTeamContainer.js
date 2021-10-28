import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../actions';

const ActiveTeamContainer = (props) => {
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    function returnTeam(teams, active_team_id) {
        let team = teams.filter((team) => team.id === active_team_id)
        return team[0]
    }

    function returnTasksDueTodayForTeam(team_id) {
        let team
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            return team[0].tasks.due_today.length
        }
    }

    function returnTasksDueSoonForTeam(team_id) {
        let team
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            return team[0].tasks.due_soon.length
        }
    }

    function returnTeamLeadName(team_id) {
        let team
        let team_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            team_lead = team[0].members.filter((member) => member.id === team[0].lead_id)
            if (team_lead[0]) {
                return (team_lead[0].first_name + ' ' + team_lead[0].last_name)
            }
        }
    }

    function returnTeamLeadEmail(team_id) {
        let team
        let team_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            team_lead = team[0].members.filter((member) => member.id === team[0].lead_id)
            if (team_lead[0]) {
                return (team_lead[0].email)
            }
        }
    }

    function returnTeamLeadInitials(team_id) {
        let team
        let team_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            team_lead = team[0].members.filter((member) => member.id === team[0].lead_id)
            if (team_lead[0]) {
                return (team_lead[0].first_name.charAt(0) + team_lead[0].last_name.charAt(0))
            }
        }
    }

    function returnInitials(first_name, last_name=null) {
        if (!last_name) {
            return first_name.charAt(0)
        } else {
            return first_name.charAt(0) + last_name.charAt(0)
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

    function returnProjectLeadInitials(team_id, project_lead_id) {
        let team
        let project_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            project_lead = team[0].members.filter((member) => member.id === project_lead_id)
            if (project_lead[0]) {
                return (project_lead[0].first_name.charAt(0) + project_lead[0].last_name.charAt(0))
            }
        }
    }

    function returnProjectLeadEmail(team_id, project_lead_id) {
        let team
        let project_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            project_lead = team[0].members.filter((member) => member.id === project_lead_id)
            if (project_lead[0]) {
                return (project_lead[0].email)
            }
        }
    }

    function handleProjectSelect(project_id, project_name, team_id, team_name) {
        props.amendActiveProject(project_id, project_name, {workspace_id: team_id, workspace_name: team_name})
    }

    function renderProjects(team) {
        let projectsArray = team.projects
        console.log(projectsArray)
        if (projectsArray) {
            return (projectsArray.map(project => 
                <div key={project.id} id={project.id} className='active-team-project-item' onClick={() => handleProjectSelect(project.id, project.name, project.team_id, props.UI.activeWorkspace.workspace_name)}>
                    <div className="project-name-and-lead">
                        <h2>{project.name}</h2>
                        <div className="member-container">
                            <div className='dark-grey'>Project Lead</div>
                            <div className="avatar-name-container">
                                <div className="avatar-small">{returnProjectLeadInitials(props.UI.activeWorkspace.workspace_id, project.lead_id)}</div>
                                <div className='team-member'>{returnProjectLeadName(props.UI.activeWorkspace.workspace_id, project.lead_id)} <br /><span>{returnProjectLeadEmail(props.UI.activeWorkspace.workspace_id, project.lead_id)}</span></div>
                            </div>
                        </div>   
                    </div>
                    <div className="project-info">
                        <h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3>
                        <h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3>
                        <h3 className={project.tasks.all_tasks.length === 0 ? "grey" : null}>{project.tasks.all_tasks.length}</h3>
                        <h3 className={project.tasks.completed.length === 0 ? "grey" : null}>{project.tasks.completed.length}</h3>
                        <h3 className={isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? 'grey' : null}>{isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? 'N/A' : (Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100) + '%')}</h3>
                    </div>
                </div>
            ))
        }
    }

    let team = returnTeam(props.teams.all_teams, props.UI.activeWorkspace.workspace_id)
    let membersArray = team.members.filter((member) => member.id !== team.lead_id)
    let projects = renderProjects(team)

    if (team) {
        const members = membersArray.map(member => <div className="member-container"><div className="avatar">{returnInitials(member.first_name, member.last_name)}</div><div key={member.id} id={member.id} className='team-member'>{member.first_name + ' ' + member.last_name} <br /><span>{member.email}</span></div></div>)
        return(
            <div className="active-team-container">
                <div className="active-team-overview-and-members">
                    <div className="active-team-overview">
                        <h2>Overview</h2>
                        <div className="overview-container">
                            <div className="overview-header">
                                <h3>Tasks Due Today</h3>
                                <h3>Tasks Due Soon</h3>
                                <h3>Active Projects</h3>
                            </div>
                            <div className="overview">
                                <div className="overview-item"><h4 className={returnTasksDueTodayForTeam(props.UI.activeWorkspace.workspace_id) === 0 ? 'grey' : 'red'}>{returnTasksDueTodayForTeam(props.UI.activeWorkspace.workspace_id)}</h4></div>
                                <div className="overview-item"><h4 className={returnTasksDueSoonForTeam(props.UI.activeWorkspace.workspace_id) === 0 ? 'grey' : 'orange'}>{returnTasksDueSoonForTeam(props.UI.activeWorkspace.workspace_id)}</h4></div>
                                <div className="overview-item"><h4 className='active-grey'>{team.projects.length}</h4></div>
                            </div>
                        </div>
                    </div>
                    <div className="active-team-lead">
                        <div className="team-lead">
                            <h2>Team Lead</h2>
                            <div className="lead">
                                <div className="member-container">
                                    <div className="avatar">{returnTeamLeadInitials(props.UI.activeWorkspace.workspace_id)}</div>
                                    <div className='team-member'>{returnTeamLeadName(props.UI.activeWorkspace.workspace_id)} <br /><span>{returnTeamLeadEmail(props.UI.activeWorkspace.workspace_id)}</span></div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="active-team-members">
                        <h2>Members <span className='icon' onClick={() => props.toggleModal(true, 'addTeamMember')}>{addIcon}</span></h2>
                        <div className="team-members">
                            { members.length >= 1 ? members : 'No Additional Team Members'}
                        </div>
                    </div>
                </div>
                <div className="active-team-projects">
                    <h2>Projects <span className='icon' onClick={() => props.toggleModal(true, 'createProject')}>{addIcon}</span></h2>
                    <div className="team-projects-container">
                        { projects }
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
        UI: state.UI
    }
}

export default connect(mapStateToProps, {toggleModal})(ActiveTeamContainer);