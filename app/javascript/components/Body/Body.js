import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../assets/stylesheets/Body'
import { connect } from 'react-redux';
import { resetUI } from '../../actions';
import Emoji from '../Emoji/Emoji';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const Body = (props) => {
    function determineRender(active) {
        let recentlyAssigned
        let dueToday
        let allTasks
        let upcoming
        let dueSoon
        let overdue

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
                checkbox = (<input type="checkbox" checked />)
            } else {
                checkbox = (<input type="checkbox" />)
            }
            return checkbox
        }
        
        if (props.tasks.all_tasks) {
            if (props.UI.activeSidebarOption === 'Dashboard') {
                if (props.tasks.overdue.length >= 1) {
                    overdue = props.tasks.overdue.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' }><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
                }
                if (props.tasks.due_today.length >= 1) {
                    dueToday = props.tasks.due_today.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' }><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
                }
            } else if (props.UI.activeSidebarOption === 'My Tasks') {
                recentlyAssigned = props.tasks.recently_assigned.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' }><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
                dueSoon = props.tasks.due_soon.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' }><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
                upcoming = props.tasks.upcoming.map(task => <div key={task.id} id={task.id} className={ task.completed ? 'task-item completed' : 'task-item' }><h4 className="complete-checkbox">{returnCheckbox(task)}</h4> <h3>{task.title}</h3> <h3>{new Date(task.due_date).toLocaleDateString("en-US")}</h3> <h3>{returnProjectName(task.project_id)}</h3> <h3>{returnTaskAuthorName(task.team_id, task.creator_id)}</h3></div>)
            }
            
        } else {
            recentlyAssigned = <div className="empty">No Tasks</div>
            dueToday = <div className="empty">No Tasks</div>
            allTasks = <div className="empty">No Tasks</div>
            dueSoon = <div className="empty">No Tasks</div>
        }

        let content;
        if (active === 'Dashboard') {
            content = (
                <div className="dashboard-container">
                    <div className="dashboard-tasks">
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
                <div className="task-container">
                    <div className="task-list">   
                        <div className="tasks">
                            <h2>Recently Assigned</h2>
                            <div className="recently-assigned">
                                { recentlyAssigned }
                            </div>
                            <h2>Due Soon</h2>
                            <div className="due-soon">
                                { dueSoon }
                            </div>
                            <h2>Upcoming</h2>
                            <div className="upcoming">
                                { upcoming }
                            </div>
                        </div>
                    </div>
                    <div className="task-detail-container">
                        <h2>Details</h2>
                        <div className="task-detail">
                        
                        </div>
                    </div>
                </div>
            )
        }
        return content
    }

    function determineHeader(props) {
        let header
        if (props.activeSidebarOption === 'Dashboard' || props.activeSidebarOption === 'My Tasks') {
            header = props.activeSidebarOption
        } else {
            header = props.activeWorkspace.workspace_name
            if (props.activeProject) {
                header = header + '  >  ' + props.activeProject.project_name
            } else if (props.activeTask) {
                header = header + '  >  ' + props.activeTask
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
        projects: state.projects,
        tasks: state.tasks,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { resetUI })(Body);