import React from 'react'

class ValidationError extends React.Component{
    render(){
        if (this.props.message){
            return (
                <div className="ValidationError">
                    {this.props.message}
                </div>
            )
        }
        return <></>
    }
}

export default ValidationError