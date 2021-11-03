import React, { useState, useEffect } from 'react';
import { clearErrors } from '../../actions';
import "flatpickr/dist/themes/material_orange.css";
import Flatpickr from "react-flatpickr";
import { connect } from 'react-redux';
import { selectTeam } from '../../reducers';

const CreateTaskForm = (props) => {
    const [taskAssignee, setTaskAssignee] = useState(props.task.lead_id)
    const [taskTitle, setTaskTitle] = useState(props.task.title)
    const [taskDescription, setTaskDescription] = useState(props.task.description)
    const [dueDate, setDueDate] = useState(new Date(props.task.due_date))
    const [errors, setErrors] = useState({})

    useEffect(() => {
        return () => {
            props.clearErrors()
        }
    }, [])

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors)
        }
    }, [props.errors])

    function renderErrors(errors) {
        if (errors) {
            let Errors = errors.map((error, index) => <li key={index} className='error-text'>{error}</li> )
            return (<ul>{Errors}</ul>)
        } else {
            return null
        }
    }

    function determineSelects() {
        let members = props.team.members.map(member => <option key={member.id} value={member.id} label={member.first_name + ' ' + member.last_name} id={member.id}>{ member.first_name + ' ' + member.last_name }</option>)
        return members
    }

    function returnPrettyDate(time) {
        if (time) {
            let day = time.toLocaleDateString("en-US")
            let hour = time.getHours()
            let minutes = time.getMinutes()

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

            return day + ' by ' + hour + minutes + am_pm
        }
    }

    return (
        <div className="form">
            <h2>Edit {props.task.title}</h2>
            <form onSubmit={props.onSubmit}>
                <div className="title-description">
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            placeholder="Task Title"
                            autoComplete="off"
                            autoFocus="autofocus"
                            value={taskTitle}
                            className={errors.title ? 'error' : null}
                            onChange={(event) => setTaskTitle(event.target.value)}
                        />
                        { renderErrors(errors.title) }
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Task Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={taskDescription}
                            autoComplete="off"
                            onChange={(event) => setTaskDescription(event.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="assignee_id">Assignee</label>
                    <select name="assignee_id" value={taskAssignee} id="assignee_id" onChange={(event) => setTaskAssignee(event.target.value)} readOnly>
                        <option value='' disabled hidden>Select an Assignee</option>
                        { determineSelects() }
                    </select>
                </div>
                <div className="form-group-date">
                    <label htmlFor="due_date">Due Date</label>
                    <Flatpickr
                        options={{
                            enableTime: true,
                            altInput: true,
                            altFormat: "F j, Y h:i K",
                            minDate: new Date(dueDate),
                            defaultHour: 17,
                            defaultMinute: 0,
                            dateFormat: "Z",
                            position: 'above center',
                            onChange: function(dateStr) {
                                () => {
                                    setDueDate(new Date(dateStr))
                                }
                            }
                        }}
                        id="due_date"
                        name="due_date"
                        value={dueDate}
                    />
                </div>
                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    let Team = selectTeam(state.teams.all_teams, state.UI.activeWorkspace.workspace_id) || null
    let Task = Team.tasks.all_tasks.find((task) => task.id === state.UI.activeTask.task_id)

    return { 
        team: Team,
        task: Task,
        UI: state.UI,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {clearErrors})(CreateTaskForm);