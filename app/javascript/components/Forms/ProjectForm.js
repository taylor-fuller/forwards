import React from 'react';

const ProjectForm = (props) => {
    return (
        <div className="form">
            <h2>Create A Project</h2>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name"></label>
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
                    <label htmlFor="description"></label>
                    <input 
                        type="textarea" 
                        id="description"
                        name="description"
                        placeholder="Project Description"
                        autoComplete="off"
                    />
                </div>
                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ProjectForm;