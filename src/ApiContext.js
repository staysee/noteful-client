import React from 'react'

const ApiContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {}
})

export default ApiContext