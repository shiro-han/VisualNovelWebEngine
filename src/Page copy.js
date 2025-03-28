import React, { Component } from 'react';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello, World!'
        };
    }

    handleClick = () => {
        this.setState({ message: 'Button Clicked!' });
    };

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                    <button onClick={this.handleClick}>Click Me</button>
            </div>
        );
    }
}

export default Page;
