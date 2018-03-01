import React, { Component } from 'react';
import { Container} from 'reactstrap';

class NotFound extends Component {
    render() {
        return (
            <Container>
                <div className="hgroup">
                    <h1><span><strong>4</strong></span><span><strong>0</strong></span><span><strong>4</strong></span></h1>
                    <h2>Error ! <span>Page Not Found</span></h2>
                </div>
                <p>For Some Reason The Page You Requested Could Not Be Found On Our Server</p>
            </Container>
        );
    }
}

export default (NotFound)
