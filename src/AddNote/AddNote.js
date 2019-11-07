import React from 'react'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'
import './AddNote.css'

class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state = {
            noteFolder: {
                folderId: '',
                touched: false
            },
            noteName: {
                name: '',
                touched: false
            },
            noteContent: {
                content: '',
                touched: false
            }
        }
    }

    setNoteName = name => {
        this.setState({
            noteName: {
                name: name,
                touched: true
            }
        })
    }

    setNoteContent = content => {
        this.setState({
            noteContent: {
                content: content,
                touched: true
            }
        })
    }

    setNoteFolder = folderId => {
        this.setState({
            noteFolder: {
                folderId: folderId,
                touched: true
            }
        })
    }

    validateNoteName = fieldValue => {
        const name = this.state.noteName.name.trim();
        if (name.length === 0) {
            return 'Name is required.'
        } else if (name.length < 2){
            return 'Name must be at least 2 characters'
        }
    }
    
    validateNoteContent = fieldValue => {
        const content = this.state.noteContent.content.trim();
        if (content.length === 0){
            return 'Content is required.'
        }
    }

    validateNoteFolder = fieldValue => {
        const folderId = this.state.noteFolder.folderId.trim();
        if (folderId.length === 0){
            return 'Folder is required'
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('adding a new note');
        const { noteFolder, noteName, noteContent } = this.state;
        console.log(`Note Name: `, noteName.name);
        console.log(`Content: `, noteContent.content);
        console.log(`In Folder: `, noteFolder.folderId);

        const newNote = {
            name: this.state.noteName.name,
            content: this.state.noteContent.content,
            folderId: this.state.noteFolder.folderId,
            modified: new Date()
        }

        const url = `${config.API_ENDPOINT}/notes`;
        const options = {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        }

        fetch(url, options)
            .then(res => {
                if (!res.ok){
                    console.log('An error did occur. Let\'s throw an error');
                    throw new Error('Something went wrong')
                }
                return res
            })
            .then(res => res.json())
            .then(newNote => {
                console.log(newNote);
                this.context.addNote(newNote);
            })
            .catch(err => {
                console.log('Handling error here', err);
                this.setState({
                    error: err.message
                })
            })
    }

    render() {
        const { folders } = this.context;
        const noteNameError = this.validateNoteName;
        const noteContentError = this.validateNoteContent;
        const noteFolderIdError = this.validateNoteFolder;
        
        return (
            <div className="AddNote">
                <h2>Add a New Note</h2>
                <form className="AddNote__form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="note-name">Name</label>
                        <input type="text" id="note-name" name="note-name" onChange={e => this.setNoteName(e.target.value)} />
                        {this.state.noteName.touched && (
                            <ValidationError message={noteNameError} />
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="note-content">Content</label>
                        <input type="text" id="note-content" name="note-content" onChange={e => this.setNoteContent(e.target.value)} />
                        {this.state.noteContent.touched && (
                            <ValidationError message={noteContentError} />
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="note-folder">Folder</label>
                        <select id="note-folder" onChange={e => this.setNoteFolder(e.target.value)} >
                            <option value={null}>...</option>
                            {folders.map(folder => 
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                        {this.state.noteFolder.touched && (
                            <ValidationError message={noteFolderIdError} />
                        )}
                    </div>

                    <button 
                        type="submit"
                        className="AddNote__button"
                        disabled={
                            this.validateNoteName() ||
                            this.validateNoteContent() ||
                            this.validateNoteFolder()
                        }
                    >
                        Add Note
                    </button>
                </form>
            </div>
        )
    }
}

export default AddNote