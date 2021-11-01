import React, { useEffect, useRef, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleModal, amendActiveProject } from '../../../actions';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ActiveTeamContainer = (props) => {
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    function returnTeamLeadName() {
        if (props.UI.activeWorkspace) {
            let team_lead = props.UI.activeWorkspace.members.filter((member) => member.id === props.UI.activeWorkspace.lead_id)
            if (!team_lead[0].last_name) {
                return team_lead[0].first_name
            } else {
                return (team_lead[0].first_name + ' ' + team_lead[0].last_name)
            }
        } else {
            return null
        }
    }

    function returnTeamLeadEmail() {
        if (props.UI.activeWorkspace) {
            let team_lead = props.UI.activeWorkspace.members.filter((member) => member.id === props.UI.activeWorkspace.lead_id)
            return (team_lead[0].email)
        }  else {
            return null
        }
    }

    function returnTeamLeadInitials() {
        if (props.UI.activeWorkspace) {
            let team_lead = props.UI.activeWorkspace.members.filter((member) => member.id === props.UI.activeWorkspace.lead_id)
            if (!team_lead[0].last_name) {
                return team_lead[0].first_name
            } else {
                return (team_lead[0].first_name.charAt(0) + team_lead[0].last_name.charAt(0))
            }
        } else {
            return null
        }
    }

    function returnInitials(first_name, last_name=null) {
        if (!last_name) {
            return first_name.charAt(0)
        } else {
            return first_name.charAt(0) + last_name.charAt(0)
        }
    }

    function returnProjectLeadName(project_lead_id) {
        if (props.UI.activeWorkspace) {
            let project_lead = props.UI.activeWorkspace.members.filter((member) => member.id === project_lead_id)
            return (project_lead[0].first_name + ' ' + project_lead[0].last_name)
        } else {
            return null
        }
    }

    function returnProjectLeadInitials(project_lead_id) {
        if (props.UI.activeWorkspace) {
            let project_lead = props.UI.activeWorkspace.members.filter((member) => member.id === project_lead_id)
            return (project_lead[0].first_name.charAt(0) + project_lead[0].last_name.charAt(0))
        } else {
            return null
        }
    }

    function renderTeam() {
        if (props.UI.activeWorkspace) {
            let team = props.UI.activeWorkspace
            return(
                <Fragment>
                    <div className="overview-item-container"><h3>Overdue</h3><div className="overview-item"><h4 className={team.tasks.overdue.length === 0 ? 'grey' : 'red'}>{team.tasks.overdue.length}</h4></div></div>
                    <div className="overview-item-container"><h3>Tasks Due Today</h3><div className="overview-item"><h4 className={team.tasks.due_today.length === 0 ? 'grey' : 'red'}>{team.tasks.due_today.length}</h4></div></div>
                    <div className="overview-item-container"><h3>Tasks Due Soon</h3><div className="overview-item"><h4 className={team.tasks.due_soon.length === 0 ? 'grey' : 'orange'}>{team.tasks.due_soon.length}</h4></div></div>
                    <div className="overview-item-container"><h3>Active Projects</h3><div className="overview-item"><h4 className='active-grey'>{team.projects.length}</h4></div></div>
                </Fragment>
            )         
        } else {
            return(
                <Fragment>
                    <div className="overview-item-container"><h3>Overdue</h3><div className="overview-item"><h4 className='grey'></h4></div></div>
                    <div className="overview-item-container"><h3>Tasks Due Today</h3><div className="overview-item"><h4 className='grey'></h4></div></div>
                    <div className="overview-item-container"><h3>Tasks Due Soon</h3><div className="overview-item"><h4 className='grey'></h4></div></div>
                    <div className="overview-item-container"><h3>Active Projects</h3><div className="overview-item"><h4 className='active-grey'></h4></div></div>
                </Fragment>
            )
        }
    }

    function renderMembers() {
        if (props.UI.activeWorkspace) {
            let team = props.UI.activeWorkspace
            let membersArray = team.members.filter((member) => member.id !== team.lead_id)
            if (membersArray) {
                return membersArray.map(member => <div className="member-container" key={member.id} id={member.id}><div className="avatar">{returnInitials(member.first_name, member.last_name)}</div><div className='team-member'>{member.first_name + ' ' + member.last_name} <br /><span>{member.email}</span></div></div>)
            } else {
                return null
            }
        } else {
            return null
        }
    }

    function renderProjects() {
        if (props.UI.activeWorkspace) {
            let team = props.UI.activeWorkspace
            let projectsArray = team.projects
            if (projectsArray) {
                return (projectsArray.map(project => 
                    <div key={project.id} id={project.id} className='active-team-project-item' onClick={() => props.amendActiveProject(project, team)}>
                        <h2>{project.name}</h2>
                        <div className="project-info">
                            <div className="project-info-item"><div className="project-info-item-header">Overdue</div><h3 className={project.tasks.overdue.length === 0 ? "grey" : 'red'}>{project.tasks.overdue.length}</h3></div>
                            <div className="project-info-item"><div className="project-info-item-header">Due Today</div><h3 className={project.tasks.due_today.length === 0 ? "grey" : 'red'}>{project.tasks.due_today.length}</h3></div>
                            <div className="project-info-item"><div className="project-info-item-header">Due Soon</div><h3 className={project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{project.tasks.due_soon.length}</h3></div>
                            <div className="project-info-item"><div className="project-info-item-header">Active Tasks</div><h3>{project.tasks.all_tasks.length}</h3></div>
                            <div className="project-info-item"><div className="project-info-item-header">Completion</div><h3>{isNaN(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100)) ? <div style={{ width: 50, height: 50, margin: 'auto' }}><CircularProgressbar value={0} text={'0%'} /></div> : <div style={{ width: 50, height: 50, margin: 'auto' }}><CircularProgressbar value={(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100))} text={`${(Math.round((project.tasks.completed.length/project.tasks.all_tasks.length)*100))}%`} styles={buildStyles({rotation: 0.5})}/></div>}</h3></div>
                            <div className="project-info-item"><div className="project-info-item-header">Lead</div><h3 className="avatar" title={returnProjectLeadName(project.lead_id)}>{returnProjectLeadInitials(project.lead_id)}</h3></div>
                        </div>
                    </div>
                ))
            }
        }
    }
    
    const Team = useMemo(() => renderTeam(), [props.UI.activeWorkspace])
    const Projects = useMemo(() => renderProjects(), [props.UI.activeWorkspace])
    const Members = useMemo(() => renderMembers(), [props.UI.activeWorkspace])

    return(
        <div className="active-team-container">
            <div className="active-team-overview-and-members">
                <div className="active-team-overview">
                    <h2>Overview</h2>
                    <div className="overview-container">
                        <div className="overview">
                            { Team }
                        </div>
                    </div>
                </div>
                <div className="active-team-lead">
                    <div className="team-lead">
                        <h2>Team Lead</h2>
                        <div className="lead">
                            <div className="member-container">
                                <div className="avatar">{returnTeamLeadInitials(props.UI.activeWorkspace.id)}</div>
                                <div className='team-member'>{returnTeamLeadName(props.UI.activeWorkspace.id)} <br /><span>{returnTeamLeadEmail(props.UI.activeWorkspace.id)}</span></div>
                            </div>                                
                        </div>
                    </div>
                </div>
                <div className="active-team-members">
                    <h2>Members <span className='icon' onClick={() => props.toggleModal(true, 'addTeamMember')}>{addIcon}</span></h2>
                    <div className="team-members">
                        { (Members && Members.length >= 1) ? Members : 'No Additional Team Members'}
                    </div>
                </div>
            </div>
            <div className="active-team-projects">
                <h2>Projects <span className='icon' onClick={() => props.toggleModal(true, 'createProject')}>{addIcon}</span></h2>
                <div className="team-projects-container">
                    { (Projects && Projects.length) >= 1 ? Projects : <div className="empty-projects">No Active Projects</div> }
                </div>
            </div>
        </div>
    )
}
    

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { toggleModal, amendActiveProject })(ActiveTeamContainer);