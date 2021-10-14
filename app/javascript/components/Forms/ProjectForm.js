import React from 'react';

const ProjectForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="form-group">
                <label htmlFor="title"></label>
                <input 
                    type="text" 
                    id="title"
                    name="title"
                    placeholder="Project Title"
                    autoComplete="off"
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
    )
}

export default ProjectForm;