import React, { useEffect, useRef, useMemo, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { toggleModal, amendActiveProject } from '../../../actions';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { selectTeam } from '../../../reducers';

const override = css`
  display: block;
  margin: auto;
`;

const ActiveTeamContainer = (props) => {
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    function returnTeamLeadName() {
        let team_lead = props.team.members.find((member) => member.id === props.team.lead_id)
        if (!team_lead.last_name) {
            return team_lead.first_name
        } else {
            return (team_lead.first_name + ' ' + team_lead.last_name)
        }
    }

    function returnTeamLeadEmail() {
        let team_lead = props.team.members.find((member) => member.id === props.team.lead_id)
        if (team_lead) {
            return (team_lead.email)
        }
    }

    function returnTeamLeadInitials() {
        let team_lead = props.team.members.find((member) => member.id === props.team.lead_id)
        if (team_lead) {
            if (!team_lead.last_name) {
                return team_lead.first_name.charAt(0)
            } else {
                return (team_lead.first_name.charAt(0) + team_lead.last_name.charAt(0))
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

    function returnProjectLeadName(project_lead_id) {
        let project_lead = props.team.members.find((member) => member.id === project_lead_id)
        if (project_lead) {
            return (project_lead.first_name + ' ' + project_lead.last_name)
        }
    }

    function returnProjectLeadInitials(project_lead_id) {
        let project_lead = props.team.members.find((member) => member.id === project_lead_id)
        if (project_lead) {
            return (project_lead.first_name.charAt(0) + project_lead.last_name.charAt(0))
        }
    }

    function renderTeam() {
        let team = props.team
        return(
            <Fragment>
                <div className="overview-item-container"><h3>Tasks Overdue</h3><div className="overview-item"><h4 className={team.tasks.overdue.length === 0 ? 'grey' : 'red'}>{team.tasks.overdue.length}</h4></div></div>
                <div className="overview-item-container"><h3>Tasks Due Today</h3><div className="overview-item"><h4 className={team.tasks.due_today.length === 0 ? 'grey' : 'red'}>{team.tasks.due_today.length}</h4></div></div>
                <div className="overview-item-container"><h3>Tasks Due Soon</h3><div className="overview-item"><h4 className={team.tasks.due_soon.length === 0 ? 'grey' : 'orange'}>{team.tasks.due_soon.length}</h4></div></div>
                <div className="overview-item-container"><h3>Active Projects</h3><div className="overview-item"><h4 className='active-grey'>{team.projects.length}</h4></div></div>
            </Fragment>
        )         
    }

    function renderMembers() {
        let MembersArray = props.team.members.filter((member) => member.id !== props.team.lead_id)
        return MembersArray.map(member => <div className="member-container" key={member.id} id={member.id}><div className="avatar">{returnInitials(member.first_name, member.last_name)}</div><div className='team-member'>{member.first_name + ' ' + member.last_name} <br /><span>{member.email}</span></div></div>)
    }

    function renderProjects() {
        return (props.team.projects.map(project => 
            <div key={project.id} id={project.id} className='active-team-project-item' onClick={() => props.amendActiveProject(project.id, project.name, {workspace_id: project.team_id, workspace_name: props.UI.activeWorkspace.workspace_name} )}>
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
    
    const Team = useMemo(() => renderTeam(), [props.team, props.UI.activeWorkspace.workspace_id])
    const Projects = useMemo(() => renderProjects(), [props.team, props.UI.activeWorkspace.workspace_id])
    const Members = useMemo(() => renderMembers(), [props.team, props.UI.activeWorkspace.workspace_id])

    if (Team && Projects && Members) {
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
                                    <div className="avatar">{returnTeamLeadInitials()}</div>
                                    <div className='team-member'>{returnTeamLeadName()} <br /><span>{returnTeamLeadEmail()}</span></div>
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
    } else {
        return <ClipLoader color={'#ff8851'} loading={true} css={override} size={50} />
    }
}
    

const mapStateToProps = (state) => {
    let Team = selectTeam(state.teams.all_teams, state.UI.activeWorkspace.workspace_id)
    return { 
        team: Team,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { toggleModal, amendActiveProject })(ActiveTeamContainer);