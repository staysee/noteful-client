import React from 'react'

class AddFolder extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        console.log('handling submit')
        const folderName = event.target.name.value;
        console.log(`Folder Name: `, folderName);
    }

    render() {
        return (
            <div className="AddFolder">
                <h2>Create a folder</h2>
                <form className="add-folder" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="folder-name">Name</label>
                    <input type="text" id="folder-name" name="folder-name" />

                    <button type="submit">
                        Add folder
                    </button>
                </form>
            </div>

        )
    }
}

export default AddFolder

//captures name of new folder from user
//form should submit name of new folder to POST /folders endpoint on server
//ensure any errors properly handled
//add button to the navigation to invoke new form