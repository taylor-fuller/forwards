import React, { useState, useEffect } from 'react';
import "flatpickr/dist/themes/material_orange.css";
import Flatpickr from "react-flatpickr";
import { connect } from 'react-redux';

const CreateTaskForm = (props) => {
    const [teamMember, setTeamMember] = useState('')
    const [dueDate, setDueDate] = useState(null)

    function determineSelects() {
        let team = props.teams.all_teams.filter((team) => team.id === props.UI.activeWorkspace.workspace_id)
        let Members

        if (team[0]) {
            Members = team[0].members.map(member => <option key={member.id} value={member.id} label={member.first_name + ' ' + member.last_name} id={member.id}>{ member.first_name + ' ' + member.last_name }</option>)
            return (
                Members
            )
        }
    }
    return (
        <div className="form">
            <h2>Create A Task</h2>
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
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Task Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Task Description"
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="assignee_id">Assignee</label>
                    <select name="assignee_id" value={teamMember} id="assignee_id" onChange={(event) => setTeamMember(event.target.value)} readOnly>
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
                            minDate: "today",
                            defaultHour: 17,
                            defaultMinute: 0,
                            dateFormat: "Z",
                            value: dueDate,
                            position: 'auto center',
                            onChange: function(dateStr) {
                                () => {setDueDate(dateStr)}
                            }
                        }}
                        placeholder="Select a Due Date"
                        id="due_date"
                        name="due_date"
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
    return { 
        teams: state.teams,
        UI: state.UI
    }
}

export default connect(mapStateToProps)(CreateTaskForm);