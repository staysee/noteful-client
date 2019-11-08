import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state = {
            folderId: '',
            name: '',
            content: ''
        }
    }

    setNoteName = noteName => {
        this.setState({
            name: noteName
        })
    }

    setNoteContent = noteContent => {
        this.setState({
            content: noteContent
        })
    }

    setNoteFolder = noteFolderId => {
        this.setState({
            folderId: noteFolderId
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('adding a new note');
        const { folderId, name, content } = this.state;
        console.log(`Note Name: `, name);
        console.log(`Content: `, content);
        console.log(`In Folder: `, folderId);

        const newNote = {
            name: this.state.name,
            content: this.state.content,
            folderId: this.state.folderId,
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
        
        return (
            <div className="AddNote">
                <h2>Add a New Note</h2>
                <form className="AddNote__form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="note-name">Note Name</label>
                        <input 
                            type="text" 
                            id="note-name" 
                            name="note-name"
                            aria-required="true"
                            aria-label="note name"
                            aria-describedby="noteNameDescription"
                            onChange={e => this.setNoteName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="note-content">Content</label>
                        <input 
                            type="text" 
                            id="note-content" 
                            name="note-content"
                            aria-required="true"
                            aria-label="note content"
                            aria-describedby="noteContentDescription" 
                            onChange={e => this.setNoteContent(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="note-folder">Folder</label>
                        <select 
                            id="note-folder"
                            aria-required="true"
                            aria-label="note folder"
                            aria-describedBy="noteFolderDescription" 
                            onChange={e => this.setNoteFolder(e.target.value)} >
                            <option value={null}>...</option>
                            {folders.map(folder => 
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </div>

                    <button 
                        type="submit"
                        className="AddNote__button"
                    >
                        Add Note
                    </button>
                    
                    <div id="noteNameDescription">Enter a name for your new note.</div>
                    <div id="noteContentDescription">Enter the content for your new note.</div>
                    <div id="noteFolderDescription">Select a folder for your note.</div>
                </form>
            </div>
        )
    }
}

export default AddNote