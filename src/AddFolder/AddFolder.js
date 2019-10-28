import React from 'react'
import config from '../config'
import ValidationError from '../ValidationError/ValidationError'
import './AddFolder.css'


class AddFolder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            folderName: {
                name: '',
                touched: false
            }
        }
    }

    updateFolderName = folderName => {
        this.setState({folderName: {name: folderName, touched: true}})
    }

    validateFolderName = fieldValue => {
        const folderName = this.state.folderName.name.trim();
        if (folderName.length === 0){
            return 'Folder name is required';
        } else if (folderName.length < 2){
            return 'Name must be at least 2 characters long';
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { folderName } = this.state;
        console.log(`Folder Name: `, folderName.name);

        const url = `${config.API_ENDPOINT}/folders`;
        const options = {
            method: 'POST',
            body: JSON.stringify(folderName),
            headers: {
                'content-type': 'application/json'
            }
        };

        fetch(url, options)
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(newFolder => {
                console.log(newFolder);
                this.context.addFolder(newFolder);
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }

    render() {
        const folderNameError = this.validateFolderName();

        return (
            <div className="AddFolder">
                <h2>Create a folder</h2>
                <form className="AddFolder__form" onSubmit={this.handleSubmit}>
                    <label htmlFor="folder-name">Name</label>
                    <input type="text" id="folder-name" name="folder-name" onChange={e => this.updateFolderName(e.target.value)} />
                    {this.state.folderName.touched && (
                        <ValidationError message={folderNameError} />
                    )}
                    <button 
                        type="submit"
                        className="AddFolder__button"
                        disabled={
                            this.validateFolderName()
                        }>
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