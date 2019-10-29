import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state = {
            note: {
                folderId: '',
                name: '',
                content: ''
            }
        }
    }

    setNoteName = noteName => {
        this.setState({
            note: {
                name: noteName
            }
        })
    }

    setNoteContent = noteContent => {
        this.setState({
            note: {
                content: noteContent
            }
        })
    }

    setNoteFolder = noteFolderId => {
        this.setState({
            note: {
                folderId: noteFolderId
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('adding a new note');
        const { folderId, name, content } = this.state;
        console.log(`Note Name: `, name);
        console.log(`Content: `, content);
        console.log(`In Folder: `, folderId);
    }

    render() {
        const { folders } = this.context;
        
        return (
            <div className="AddNote">
                <h2>Add a New Note</h2>
                <form className="AddNote__form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="note-name">Name</label>
                        <input type="text" id="note-name" name="note-name" onChange={e => this.setNoteName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="note-content">Content</label>
                        <input type="text" id="note-content" name="note-content" onChange={e => this.setNoteContent(e.target.value)} />
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
                    </div>

                    <button 
                        type="submit"
                        className="AddNote__button"
                    >
                        Add Note
                    </button>
                </form>
            </div>
        )
    }
}

export default AddNote