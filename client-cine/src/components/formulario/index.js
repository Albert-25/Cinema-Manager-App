 import React, { Component } from 'react'


class Formulario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",


        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.firstName} ${this.state.lastName}  Registered Successfully !!!!`)
        console.log(this.state);
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: '',
        })
     event.preventDefault()
        
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h1>REGISTER</h1>
                    <label>FirstName :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..." /><br />
                    <label>LastName :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName..." /><br />
                    <label>Password :</label> <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password..." /><br />
                    <label>Email :</label> <input type="email" value={this.state.email} onChange={this.emailhandler} placeholder="email..." /><br />
                        
                    <br />
                    <input type="submit" value="Submit" />
                </form>

            </div>
            
        )
    }
}

export default Formulario