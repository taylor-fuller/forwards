import React from 'react';

const CreateProjectForm = (props) => {
    return (
        <div className="form">
            <h2>Create A Project</h2>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Project Name"
                        autoComplete="off"
                        autoFocus="autofocus"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Project Description</label>
                    <textarea 
                        id="description"
                        name="description"
                        placeholder="Project Description"
                        autoComplete="off"
                        row="30"
                        cols="150"
                    />
                </div>
                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProjectForm;