import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetUI, amendActiveTask, amendActiveProject } from '../../actions';
import Emoji from '../Emoji/Emoji';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const Body = (props) => {
    let bodyRef = useRef()

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTo(0, 0)
        }
    })

    function handleProjectSelect(project_id, project_name) {
        props.amendActiveProject(project_id, project_name)
    }

    function determineRender(active) {
        let recentlyAssigned
        let dueToday
        let upcoming
        let dueSoon
        let overdue
        let completed
        let projects
        let projectsLed

        function returnProjectName(project_id) {
            let project
            project = props.projects.filter((project) => project.id === project_id)
            if (project[0]) {
                return project[0].name
            }
        }

        function returnTaskAuthorName(team_id, creator_id) {
            let team
            let task_creator
            team = props.teams.filter((team) => team.id === team_id)
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
                checkbox = (<svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#007F00" onClick={(event) => handleTaskPatch(event)} ><rect fill="none" height="24" width="24" /><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>)
            } else {
                checkbox = (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--accent0)" onClick={(event) => handleTaskPatch(event)}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>)
            }
            return checkbox
        }

        function handleTaskSelect(event, task_id, task_name, project_id, project_name) {
            if (event.target.className !== 'complete-checkbox') {
                props.amendActiveTask(task_id, task_name, project_id, project_name)
            } 
        }

        function handleTaskPatch(event) {
            event.stopPropagation()
            console.log('patch task')
        }
        
        if (props.UI.activeSidebarOption === 'Dashboard') {
            if (props.tasks.overdue.length >= 1) {
                overdue = props.tasks.overdue.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id))}><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            }
            if (props.tasks.due_today.length >= 1) {
                dueToday = props.tasks.due_today.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id))}><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            }
        } else if (props.UI.activeSidebarOption === 'My Tasks') {
            if (props.tasks.recently_assigned.length >= 1) {
                recentlyAssigned = props.tasks.recently_assigned.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id))}><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            }
            if (props.tasks.due_soon.length >= 1) {
                dueSoon = props.tasks.due_soon.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id))}><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            } 
            if (props.tasks.upcoming.length >= 1) {
                upcoming = props.tasks.upcoming.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id))}><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            }
            if (props.tasks.completed.length >= 1) {
                completed = props.tasks.completed.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' } onClick={(event) => handleTaskSelect(event, task.id, task.title, task.project_id, returnProjectName(task.project_id))}><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            }
        } else if (props.UI.activeSidebarOption === 'My Projects') {
            if (props.projects_led.length >= 1) {
                projectsLed = props.projects_led.map(project => <div key={project.id} id={project.id} className='project-item' onClick={() => handleProjectSelect(project.id, project.name)}><h3>{project.name}</h3></div>)
            }
            if (props.projects_led.length >= 1) {
                projects = props.projects.map(project => <div key={project.id} id={project.id} className='project-item' onClick={() => handleProjectSelect(project.id, project.name)}><h3>{project.name}</h3></div>)
            }
        }

        let content;
        if (active === 'Dashboard') {
            content = (
                <div className="task-container" ref={bodyRef}>
                    <div className="tasks">
                        { overdue ? <h2>Overdue</h2> : null}
                        { overdue ? <div className="overdue"><div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> { overdue }</div> : null }
                        <h2>Tasks Due Today</h2>
                        <div className="due-today">
                            { dueToday ? <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> : null }
                            { dueToday ? dueToday : <div className="empty">No Tasks Due Today &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='👁️'/><Emoji symbol='👄'/><Emoji symbol='👁️'/></div>}
                        </div>
                    </div>
                    <div className="dashboard-favorites">
                        <h2>Favorite Projects</h2>
                        <div className="favorites">
                            
                        </div>
                    </div>
                </div>
            )
        } else if (active === 'My Tasks') {
            content = (
                <div className="task-container" ref={bodyRef}> 
                    <div className="tasks">
                        { recentlyAssigned ? <h2>Recently Assigned</h2> : null }
                        { recentlyAssigned ? <div className="recently-assigned"><div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> { recentlyAssigned }</div> : null }
                        <h2>Due Soon</h2>
                        <div className="due-soon">
                            { dueSoon ? <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> : null }
                            { dueSoon ? dueSoon : <div className="empty">No Tasks Due Soon &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🎉'/><Emoji symbol='🎈'/><Emoji symbol='🥳'/></div> }
                        </div>
                        <h2>Upcoming</h2>
                        <div className="upcoming">
                            { upcoming ? <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> : null }
                            { upcoming ? upcoming : <div className="empty">No Upcoming Tasks &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🤌'/><Emoji symbol='🤌'/><Emoji symbol='🤌'/></div> }
                        </div>
                        <h2>Completed</h2>
                        <div className="completed-tasks">
                            { completed ? <div className="task-header"><h4 className="complete-checkbox"></h4> <h3>Task</h3> <h3>Due Date</h3> <h3>Project</h3> <h3>Assigned By</h3></div> : null }
                            { completed ? completed : <div className="empty">No Completed Tasks, Better Get to Work &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🤡'/></div> }
                        </div>
                    </div>
                </div>
            )
        } else if (active === 'My Projects') {
            content = (
                <div className="projects-container" ref={bodyRef}> 
                    <div className="projects">
                        { projectsLed ? <h2>Projects Led</h2> : null }
                        { projectsLed ? <div className="projects-led"><div className="project-header"></div> { projectsLed }</div> : null }
                        <h2>All Projects</h2>
                        <div className="all-projects">
                            { projects ? <div className="project-header"></div> : null }
                            { projects ? projects : <div className="empty">No Projects &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='🎉'/><Emoji symbol='🎈'/><Emoji symbol='🥳'/></div> }
                        </div>
                    </div>
                </div>
            )
        }
        return content
    }

    function determineHeader(props) {
        let header
        if (props.activeSidebarOption === 'Dashboard' || props.activeSidebarOption === 'My Tasks' || props.activeSidebarOption === 'My Teams' || props.activeSidebarOption === 'My Projects') {
            header = props.activeSidebarOption
        } else {
            header = props.activeWorkspace.workspace_name
            if (props.activeProject) {
                header = header + ' > ' + props.activeProject.project_name
            }
            if (props.activeProject && props.activeTask) {
                header = header + ' > ' + props.activeTask.task_name
            }
        }
        return header
    }

    function resetUI() {
        props.resetUI()
    }

    const Content = determineRender(props.UI.activeSidebarOption)
    const Header = determineHeader(props.UI)

    return (
        <div className="body-content">
            <div className="header"><h2>{ Header }</h2><a href="http://localhost:3000/users/sign_out" onClick={() => resetUI()}>Logout</a> </div>
            { Content ? Content : null }
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        teams_led: state.teams_led,
        projects: state.projects,
        projects_led: state.projects_led,
        tasks: state.tasks,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { resetUI, amendActiveTask, amendActiveProject })(Body);