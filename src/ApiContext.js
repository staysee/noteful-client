import React from 'react'

const ApiContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {}
})

export default ApiContext