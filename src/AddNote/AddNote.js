import React from 'react'
import './AddNote.css'

class AddNote extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
        const { noteName } = this.state;
        console.log(`Note Name: `, noteName.name);

        // const url = `${config.API_ENDPOINT}/notes`;
        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify(folderName),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // };

        // fetch(url, options)
        //     .then(res => {
        //         if (!res.ok)
        //             return res.json().then(e => Promise.reject(e))
        //         return res.json()
        //     })
        //     .then(newFolder => {
        //         console.log(newFolder);
        //         this.context.addFolder(newFolder);
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error: err.message
        //         })
        //     })
    }
    render() {
        return (
            <div className="AddNote">
                <h2>Add a New Note</h2>
                <form className="AddNote__form">
                    <label htmlFor="note-name">Name</label>
                    <input type="text" id="note-name" name="note-name" />

                    <label htmlFor="note-content">Content</label>
                    <input type="text" id="note-content" name="note-content" />

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