import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleModal, amendActiveTask, toggleTaskComplete, unsetActiveTask } from '../../../actions';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { selectTeam } from '../../../reducers';

const override = css`
  display: block;
  margin: auto;
`;

const ActiveProjectContainer = (props) => {
    const [screenSmallSize, setScreenSmallSize] = useState(window.matchMedia('(max-width: 1400px)').matches)

    let taskRef = useRef(null)
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    useEffect(() => {
        if (props.UI.activeTask && taskRef.current) {
            taskRef.current.scrollIntoView() 
        }

        window.matchMedia("(max-width: 1400px)").addEventListener('change', () => {
            setScreenSmallSize(window.matchMedia('(max-width: 1400px)').matches)
        });
    }, [])

    function returnProjectLeadName() {
        let team = props.team
        let project = props.project
        let project_lead = team.members.find((member) => member.id === project.lead_id)
        if (!project_lead.last_name) {
            return project_lead.first_name
        } else {
            return (project_lead.first_name + ' ' + project_lead.last_name)
        }
    }

    function returnProjectLeadInitials() {
        let team = props.team
        let project = props.project
        let project_lead = team.members.find((member) => member.id === project.lead_id)
        if (!project_lead.last_name) {
            return project_lead.first_name.charAt(0)
        } else {
            return (project_lead.first_name.charAt(0) + project_lead.last_name.charAt(0))
        }
    }

    function returnProjectLeadEmail() {
        let team = props.team
        let project = props.project
        let project_lead = team.members.find((member) => member.id === project.lead_id)
        return project_lead.email
    }

    function returnTaskAuthorName(creator_id) {
        let task_creator = props.team.members.find((creator) => creator.id === creator_id)
        if (!task_creator.last_name) {
            return task_creator.first_name
        } else {
            return (task_creator.first_name + ' ' + task_creator.last_name)
        }
    }

    function returnTaskAuthorInitials(creator_id) {
        let task_creator = props.team.members.find((creator) => creator.id === creator_id)
        if (!task_creator.last_name) {
            return task_creator.first_name.charAt(0)
        } else {
            return (task_creator.first_name.charAt(0) + task_creator.last_name.charAt(0))
        }
    }

    function returnTaskAuthorEmail(creator_id) {
        let task_creator = props.team.members.find((creator) => creator.id === creator_id)
        return task_creator.email
    }

    function returnTaskAssigneeName(task_assignee_id) {
        let task_assignee = props.team.members.find((member) => member.id === task_assignee_id)
        if (task_assignee) {
            if (!task_assignee.last_name) {
                return task_assignee.first_name
            } else {
                return (task_assignee.first_name + ' ' + task_assignee.last_name)
            }
        } else {
            return (
                <p className='grey'>Unassigned</p>
            )
        }
    }

    function returnTaskAssigneeInitials(task_assignee_id) {
        let task_assignee = props.team.members.find((member) => member.id === task_assignee_id)
        if (task_assignee) {
            if (!task_assignee.last_name) {
                return task_assignee.first_name
            } else {
                return (task_assignee.first_name.charAt(0) + task_assignee.last_name.charAt(0))
            }
        } else {
            return null
        }
    }

    function returnTaskAssigneeEmail(task_assignee_id) {
        let task_assignee = props.team.members.find((member) => member.id === task_assignee_id)
        if (task_assignee) {
            return task_assignee.email
        } else {
            return null
        }
    }

    function renderTasks() {
        if (props.project) {
            if (props.project.tasks.all_tasks.length >= 1) {
                let tasks = props.project.tasks.all_tasks.map(task => <div key={task.id} id={task.id} className={ (task.completed ? 'task-item completed' : 'task-item') + (task.id === props.UI.activeTask.task_id ? ' active' : '')} onClick={(event) => handleTaskSelect(event, task.id, task.title)} ref={props.UI.activeTask.task_id === task.id ? taskRef : null}><h3 title={task.title}>{task.title}</h3> <h3 className={task.due_date ? null : 'grey'}>{ task.due_date ? new Date(task.due_date).toLocaleDateString("en-US") : 'N/A' }</h3> <h3 title={task.assignee_id ? returnTaskAssigneeName(task.assignee_id) : null}>{returnTaskAssigneeName(task.assignee_id)}</h3> <h3 title={returnTaskAuthorName(task.creator_id)}>{returnTaskAuthorName(task.creator_id)}</h3></div>)
                return(<div className="project-tasks"><div className="task-header"><h3>Task</h3> <h3>Due Date</h3> <h3>Assigned To</h3> <h3>Assigned By</h3></div> <div className="project-tasks-list">{ tasks }</div></div>)
            } else {
                return <div className='empty-tasks'>No Active Tasks</div>
            }
        } else {
            return null
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

    function returnPrettyDate(time) {
        if (time) {
            let day = new Date(time).toLocaleDateString("en-US")
            let date = new Date(time)
            let hour = date.getHours()
            let minutes = date.getMinutes()

            if (minutes < 10) {
                minutes = ':0' + minutes
            } else if (minutes === 0) {
                minutes = ''
            } else {
                minutes = ':' + minutes
            }

            let am_pm = 'AM'
            if (hour > 12) {
                hour -= 12
                am_pm = 'PM'
            }

            return (<Fragment>{day} <span className='date'>{' by ' + hour + minutes + am_pm}</span></Fragment>)
        } else {
            return (
                <p className='grey'>N/A</p>
            )
        }
        
    }

    function determineButton(completed) {
        if (!completed) {
            return (
                <div className="detail-item-complete">
                    <div className="complete-button" onClick={(event) => toggleTaskComplete(event, props.task.id, props.task.completed)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--darkdarkGrey)"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                        <h2>Mark Complete</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="detail-item-complete">
                    <div className="complete-button" onClick={(event) => toggleTaskComplete(event, props.task.id, props.task.completed)}>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--darkdarkGrey)"><g><rect fill="none" height="24" width="24"/></g><g><path d="M4.84,1.98L3.43,3.39l10.38,10.38l-1.41,1.41l-4.24-4.24l-1.41,1.41l5.66,5.66l2.83-2.83l6.6,6.6l1.41-1.41L4.84,1.98z M18.05,12.36L23,7.4L21.57,6l-4.94,4.94L18.05,12.36z M17.34,7.4l-1.41-1.41l-2.12,2.12l1.41,1.41L17.34,7.4z M1.08,12.35 l5.66,5.66l1.41-1.41l-5.66-5.66L1.08,12.35z"/></g></svg>
                        <h2>Mark Uncomplete</h2>
                    </div>
                </div>
            )
        }
    }

    function renderTaskDetail() {
        if (props.task) {
            return (
                <Fragment>
                    <div className="project-task-details-container-header">
                        <h2>{props.task.title} <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--fontBlack)" onClick={() => props.toggleModal(true, 'patchTask')}><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg></span></h2>
                    </div>
                    <div className="project-task-details-body">
                        <div className="detail-item">
                            <h2>Description</h2>
                            <div className="task-detail-item">
                                {props.task.description ? props.task.description : <p className='grey'>N/A</p>}
                            </div>
                        </div>
                        <div className="detail-item">
                            <h2>Assigned To</h2>
                            <div className="task-detail-item">
                                <div className="member-container">
                                    {props.task.assignee_id ? <div className="avatar">{returnTaskAssigneeInitials(props.task.assignee_id)}</div> : null}
                                    <div className='team-member'>{returnTaskAssigneeName(props.task.assignee_id)} <br /><span>{returnTaskAssigneeEmail(props.task.assignee_id)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-item">
                            <h2>Due Date</h2>
                            <div className="task-detail-item">
                                { returnPrettyDate(props.task.due_date) }
                            </div>
                        </div>
                        <div className="detail-item">
                            <h2>Assigned By</h2>
                            <div className="task-detail-item">
                                <div className="member-container">
                                    <div className="avatar">{returnTaskAuthorInitials(props.task.creator_id)}</div>
                                    <div className='team-member'>{returnTaskAuthorName(props.task.creator_id)} <br /><span>{returnTaskAuthorEmail(props.task.creator_id)}</span></div>
                                </div>
                            </div>
                        </div>
                        { determineButton(props.task.completed) }
                    </div>
                </Fragment>
            )
        } else {
            return null
        }
    }

    function renderProject() {
        return (
            <div className="project-tasks-overview">
                <div className="project-info">
                    <div className="project-info-item"><div className="project-info-item-header">Overdue</div><h3 className={props.project.tasks.overdue.length === 0 ? "grey" : 'red'}>{props.project.tasks.overdue.length}</h3></div>
                    <div className="project-info-item"><div className="project-info-item-header">Due Today</div><h3 className={props.project.tasks.due_today.length === 0 ? "grey" : 'red'}>{props.project.tasks.due_today.length}</h3></div>
                    <div className="project-info-item"><div className="project-info-item-header">Due Soon</div><h3 className={props.project.tasks.due_soon.length === 0 ? "grey" : 'orange'}>{props.project.tasks.due_soon.length}</h3></div>
                    <div className="project-info-item"><div className="project-info-item-header">Active Tasks</div><h3>{props.project.tasks.all_tasks.length-props.project.tasks.completed.length}</h3></div>
                    <div className="project-info-item"><div className="project-info-item-header">Completion</div><h3>{isNaN(Math.round((props.project.tasks.completed.length/props.project.tasks.all_tasks.length)*100)) ? <div style={{ width: 50, height: 50, margin: 'auto' }}><CircularProgressbar value={0} text={<tspan dy={needDominantBaselineFix ? -10 : 0}>0</tspan>} /></div> : <div style={{ width: 50, height: 50, margin: 'auto' }}><CircularProgressbar value={(Math.round((props.project.tasks.completed.length/props.project.tasks.all_tasks.length)*100))} text={<tspan dy={needDominantBaselineFix ? -10 : 0}>{(Math.round((props.project.tasks.completed.length/props.project.tasks.all_tasks.length)*100))}</tspan>} styles={buildStyles({rotation: 0.5})}/></div>}</h3></div>
                    <div className="project-info-item"><div className="project-info-item-header">Project Lead</div><div className="lead">
                    <div className="member-container"><div className="avatar">{returnProjectLeadInitials()}</div><div className='team-member'>{returnProjectLeadName()} <br /><span>{returnProjectLeadEmail()}</span></div></div></div></div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <div>{props.project.description ? props.project.description : <p className='grey'>N/A</p>}</div>
                </div>
            </div>
        )
    }

    const Project = useMemo(() => renderProject(), [props.team, props.UI.activeProject])
    const Tasks = useMemo(() => renderTasks(), [props.team, props.UI.activeTask])
    const TaskDetail = useMemo(() => renderTaskDetail(), [props.team, props.task])
    
    if (props.project) {
        if (screenSmallSize) {
            if (props.task) {
                return(
                    <Fragment>
                        <div className="back-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base2)" onClick={() => props.unsetActiveTask()}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></div>
                        <div className="project-task-details-container">
                            { TaskDetail }
                        </div>
                    </Fragment>
                )
            } else {
                return (
                    <div className="active-project-container">
                        <div className="project-tasks-container">
                            <div className="project-tasks-container-header">
                                <h2>Overview</h2>
                            </div>
                             { Project }
                            <div className="projects-tasks-container-tasks">
                                <h2>Tasks <span className='icon' onClick={() => props.toggleModal(true, 'createTask')}>{addIcon}</span></h2>
                                    { Tasks }
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="active-project-container">
                    <div className="project-tasks-container">
                        <div className="project-tasks-container-header">
                            <h2>Overview</h2>
                        </div>
                            { Project }
                        <div className="projects-tasks-container-tasks">
                            <h2>Tasks <span className='icon' onClick={() => props.toggleModal(true, 'createTask')}>{addIcon}</span></h2>
                                { Tasks }
                        </div>
                    </div>
                    <div className="project-task-details-container">
                        { TaskDetail }
                    </div>
                </div>
            )
        }
    } else {
        return <ClipLoader color={'#ff8851'} loading={true} css={override} size={50} />
    }
}

const mapStateToProps = state => {
    let Team = selectTeam(state.teams.all_teams, state.UI.activeWorkspace.workspace_id)
    let Project = Team.projects.find((project) => project.id === state.UI.activeProject.project_id)
    let Task = Project.tasks.all_tasks.find((task) => task.id === state.UI.activeTask.task_id)
    
    return { 
        team: Team,
        project: Project,
        task: Task,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { toggleModal, amendActiveTask, toggleTaskComplete, unsetActiveTask })(ActiveProjectContainer);