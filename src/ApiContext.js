import React from 'react'

const ApiContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addFolder: () => {}
})

export default ApiContext