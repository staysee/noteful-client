import React from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError/ValidationError'
import './AddFolder.css'


class AddFolder extends React.Component {
    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state = {
            folderName: {
                name: '',
                touched: false
            }
        }
    }

    setFolderName = folderName => {
        this.setState({
            folderName: {
                name: folderName, 
                touched: true
            }
        })
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
                if (!res.ok){
                    console.log('An error did occur. Let\'s throw an error');
                    throw new Error('Something went wrong')
                }
                return res
            })
            .then(res => res.json())
            .then(newFolder => {
                console.log(newFolder);
                this.context.addFolder(newFolder);
            })
            .catch(err => {
                console.log('Handling error here', err);
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
                    <div className="form-group">
                        <label htmlFor="folder-name">Name</label>
                        <input 
                            type="text" 
                            id="folder-name" 
                            name="folder-name"
                            aria-required="true"
                            aria-describedby="newFolderDescription"
                            aria-label="Enter New Folder Name" 
                            onChange={e => this.setFolderName(e.target.value)} />
                        {this.state.folderName.touched && (
                            <ValidationError message={folderNameError} />
                        )}
                        <div id="newFolderDescription">Enter a new folder name</div>
                    </div>
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