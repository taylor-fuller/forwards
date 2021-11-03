import React, { useEffect, useRef, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { amendActiveTask, toggleTaskComplete } from '../../../actions';
import Emoji from '../../Emoji/Emoji';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

const DashboardContainer = (props) => {
    let homeRef = useRef()

    function toggleTaskComplete(event, task_id, task_completed) {
        event.stopPropagation()
        let bool
        if (task_completed === false) {
            bool = true
        } else {
            bool = false
        }
        props.toggleTaskComplete(task_id, bool)
    }

    function handleTaskSelect(event, task_id, task_name, project_id, project_name, team_id, team_name) {
        if (event.target.className !== 'complete-checkbox') {
            props.amendActiveTask(task_id, task_name, project_id, project_name, {workspace_id: team_id, workspace_name: team_name})
        } 
    }

    function returnProjectName(project_id) {
        let project
        project = props.projects.all_projects.find((project) => project.id === project_id)
        if (project) {
            return project.name
        }
    }

    function returnTeamName(team_id) {
        let team
        team = props.teams.all_teams.find((team) => team.id === team_id)
        if (team) {
            return team.name
        }
    }

    function returnTaskAuthorName(team_id, creator_id) {
        let team
        let task_creator
        team = props.teams.all_teams.find((team) => team.id === team_id)
        if (team) {
            task_creator = team.members.find((creator) => creator.id === creator_id)
            if (!task_creator.last_name) {
                return task_creator.first_name
            } else {
                return (task_creator.first_name + ' ' + task_creator.last_name)
            }
        }
    }

    function returnCheckbox(task) {
        let checkbox
        if (task.completed === true) {
            checkbox = (<svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#007F00" onClick={(event) => toggleTaskComplete(event, task.id, task.completed)} ><rect fill="none" height="24" width="24" /><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>)
        } else {
            checkbox = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--accent0)" onClick={(event) => toggleTaskComplete(event, task.id, task.completed)}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>)
        }
        return checkbox
    }

    function renderOverdue() {
        let overdue
        if (props.tasks.overdue && props.tasks.overdue.length >= 1) {
            overdue = props.tasks.overdue.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id), task.team_id, returnTeamName(task.team_id))}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(
                <Fragment>
                    <h2>Overdue</h2>
                    <div className="overdue"><div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> { overdue }</div>
                </Fragment>
            )
        } else {
            return null
        }
    }

    function renderDueToday() {
        let dueToday
        if (props.tasks.due_today && props.tasks.due_today.length >= 1) {
            dueToday = props.tasks.due_today.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id), task.team_id, returnTeamName(task.team_id))}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(
                <Fragment>
                    <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div>
                    { dueToday }
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    <div className="empty">No Tasks Due Today &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='👁️'/><Emoji symbol='👄'/><Emoji symbol='👁️'/></div>
                </Fragment>
            )
        }
    }

    const Overdue = useMemo(() => renderOverdue(), [props.tasks.overdue])
    const DueToday = useMemo(() => renderDueToday(), [props.tasks.due_today])

    return(
        <div className="task-container" ref={homeRef}>
            <div className="tasks">
                { Overdue }
                <h2>Tasks Due Today</h2>
                <div className="due-today">
                    { DueToday }
                </div>
            </div>
            {/* <div className="dashboard-favorites">
                <h2>Favorite Projects</h2>
                <div className="favorites">
                    
                </div>
            </div> */}
        </div>
    )
}
    

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        tasks: state.tasks,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { amendActiveTask, toggleTaskComplete })(DashboardContainer);