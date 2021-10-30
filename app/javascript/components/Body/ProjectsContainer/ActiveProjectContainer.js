import React, { useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { toggleModal, amendActiveTask, toggleTaskComplete } from '../../../actions';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ActiveProjectContainer = (props) => {
    let taskRef = useRef(null)
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    useEffect(() => {
        if (props.UI.activeTask) {
            taskRef.current.scrollIntoView() 
        }
    }, [])

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

    function returnTaskAuthorName(team_id, creator_id) {
        let team
        let task_creator
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            task_creator = team[0].members.filter((creator) => creator.id === creator_id)
            if (!task_creator[0].last_name) {
                return task_creator[0].first_name
            } else {
                return (task_creator[0].first_name + ' ' + task_creator[0].last_name)
            }
        }
    }

    function returnTaskAssigneeName(team_id, task_assignee_id) {
        let team
        let task_assignee
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            task_assignee = team[0].members.filter((member) => member.id === task_assignee_id)
            if (!task_assignee[0].last_name) {
                return task_assignee[0].first_name
            } else {
                return (task_assignee[0].first_name + ' ' + task_assignee[0].last_name)
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

    function renderTasks(project) {
        let tasks
        if (project.tasks.all_tasks.length > 1) {
            tasks = project.tasks.all_tasks.map(task => <div key={task.id} id={task.id} className={ (task.completed ? 'task-item completed' : 'task-item') + (task.id === props.UI.activeTask.task_id ? ' active' : '')} onClick={(event) => handleTaskSelect(event, task.id, task.title)} ref={props.UI.activeTask.task_id === task.id ? taskRef : null}><h4 className="complete-checkbox" title={'Toggle Complete'}>{returnCheckbox(task)}</h4> <h3 title={task.title}>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3 title={returnTaskAssigneeName(task.team_id, task.assignee_id)}>{returnTaskAssigneeName(task.team_id, task.assignee_id)}</h3> <h3 title={returnTaskAuthorName(task.team_id, task.creator_id)}>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            return(<div className="project-tasks"><div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Assigned To</h3> <h3>Assigned By</h3></div> <div className="project-tasks-list">{ tasks }</div></div>)
        } else {
            return <div className='empty-tasks'>No Active Tasks</div>
        }
    }

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


    function handleTaskSelect(event, task_id, task_name) {
        if (event.target.className !== 'complete-checkbox') {
            props.amendActiveTask(task_id, task_name, props.UI.activeProject.project_id, props.UI.activeProject.project_name, {workspace_id: props.UI.activeWorkspace.workspace_id, workspace_name: props.UI.activeWorkspace.workspace_name})
        } 
    }

    let project = returnProject(props.teams.all_teams, props.UI.activeWorkspace.workspace_id, props.UI.activeProject.project_id)
    
    if (project) {
        const Tasks = useMemo(() => renderTasks(project), [project.tasks.all_tasks, props.UI.activeTask])
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
                            { Tasks }
                    </div>
                </div>
                <div className="project-task-details-container">
                    
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
        projects_led: state.projects_led,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { toggleModal, amendActiveTask, toggleTaskComplete })(ActiveProjectContainer);