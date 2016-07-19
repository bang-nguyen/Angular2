import React from 'react';

import {Link} from 'react-router';

export default class CreateUser extends React.Component {
    static get contextTypes() {
        return {
            root: React.PropTypes.string
        };
    }
    
    render() {
        return (
            <section className="app-content">
                <header className="section-header">
                    <h3 className="title">Hello</h3>
                    <Link className="link" to={this.context.root}>&#171; Home</Link>
                </header>
            </section>
        );
    }
}
