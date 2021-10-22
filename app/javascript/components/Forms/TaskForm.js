import React, { useState, useEffect } from 'react';
import "flatpickr/dist/themes/material_orange.css";
import Flatpickr from "react-flatpickr";

const TaskForm = (props) => {
    return (
        <div className="form">
            <h2>Create A Task</h2>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="title"></label>
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
                    <label htmlFor="description"></label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Task Description"
                        autoComplete="off"
                        row="10"
                        cols="70"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="due_date"></label>
                    <Flatpickr
                        options={{
                            enableTime: true,
                            altInput: true,
                            altFormat: "F j, Y h:i K",
                            minDate: "today",
                            defaultHour: 17,
                            defaultMinute: 0,
                            dateFormat: "Z",
                            inline: true
                        }}
                        placeholder="Select a Due Date"
                        id="due_date"
                    />
                </div>
                
                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;