import React, { Fragment, useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { amendActiveTask, toggleTaskComplete } from '../../../actions';
import Emoji from '../../Emoji/Emoji';

const MyTasksContainer = (props) => {
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
        project = props.projects.all_projects.filter((project) => project.id === project_id)
        if (project[0]) {
            return project[0].name
        }
    }

    function returnTeamName(team_id) {
        let team
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            return team[0].name
        }
    }

    function returnTaskAuthorName(team_id, creator_id) {
        let team
        let task_creator
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            task_creator = team[0].members.filter((creator) => creator.id === creator_id)
            if (task_creator[0]) {
                return (task_creator[0].first_name + ' ' + task_creator[0].last_name)
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

    function renderRecentlyAssigned() {
        let recentlyAssigned
        if (props.tasks.recently_assigned && props.tasks.recently_assigned.length >= 1) {
            recentlyAssigned = props.tasks.recently_assigned.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id), task.team_id, returnTeamName(task.team_id))}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3 title={task.title}>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3 title={returnProjectName(task.project_id)}>{returnProjectName(task.project_id)}</h3> <h3 title={returnTaskAuthorName(task.team_id, task.creator_id)}>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(
                <Fragment>
                    <h2>Recently Assigned</h2>
                    <div className="recently-assigned"><div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> { recentlyAssigned }</div>
                </Fragment>
            )
        } else {
            return null
        }
    }

    function renderDueSoon() {
        if (props.tasks.due_soon && props.tasks.due_soon.length >= 1) {
            let dueSoon
            dueSoon = props.tasks.due_soon.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id), task.team_id, returnTeamName(task.team_id))}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3 title={task.title}>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3 title={returnProjectName(task.project_id)}>{returnProjectName(task.project_id)}</h3> <h3 title={returnTaskAuthorName(task.team_id, task.creator_id)}>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(
                <Fragment>
                    <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div>
                    { dueSoon }
                </Fragment>
            )
        } else {
            return(
                <div className="empty">No Tasks Due Soon &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🎉'/><Emoji symbol='🎈'/><Emoji symbol='🥳'/></div>
            )
        }
    }

    function renderUpcoming() {
        if (props.tasks.upcoming && props.tasks.upcoming.length >= 1) {
            let upcoming
            upcoming = props.tasks.upcoming.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id), task.team_id, returnTeamName(task.team_id))}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3 title={task.title}>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3 title={returnProjectName(task.project_id)}>{returnProjectName(task.project_id)}</h3> <h3 title={returnTaskAuthorName(task.team_id, task.creator_id)}>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(
                <Fragment>
                    <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div>
                    { upcoming }
                </Fragment>
            )
        } else {
            return(
                <div className="empty">No Upcoming Tasks &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🤌'/><Emoji symbol='🤌'/><Emoji symbol='🤌'/></div>
            )
        }
    }

    function renderCompleted() {
        if (props.tasks.completed && props.tasks.completed.length >= 1) {
            let completed
            completed = props.tasks.completed.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id), task.team_id, returnTeamName(task.team_id))}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3 title={task.title}>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3 title={returnProjectName(task.project_id)}>{returnProjectName(task.project_id)}</h3> <h3 title={returnTaskAuthorName(task.team_id, task.creator_id)}>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(
                <Fragment>
                    <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div>
                    { completed }
                </Fragment>
            )
        } else {
            return(
                <div className="empty">No Completed Tasks, Better Get to Work &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🤡'/></div>
            )
        }
    }

    const RecentlyAssigned = useMemo(() => renderRecentlyAssigned(), [props.tasks.recently_assigned])
    const Upcoming = useMemo(() => renderDueSoon(), [props.tasks.due_soon])
    const DueSoon = useMemo(() => renderUpcoming(), [props.tasks.upcoming])
    const Completed = useMemo(() => renderCompleted(), [props.tasks.completed])

    return(
        <div className="task-container" ref={homeRef}> 
            <div className="tasks">
                { RecentlyAssigned }
                <h2>Due Soon</h2>
                <div className="due-soon">
                    { DueSoon }
                </div>
                <h2>Upcoming</h2>
                <div className="upcoming">
                    { Upcoming }
                </div>
                <h2>Completed</h2>
                <div className="completed-tasks">
                    { Completed }
                </div>
            </div>
        </div>
    )
}
    

const mapStateToProps = state => {
    return {
        teams: state.teams,
        projects: state.projects,
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { amendActiveTask, toggleTaskComplete })(MyTasksContainer);