import React, {Component} from 'react';

import Jumbotron from "../common/Jumbotron";
import Container from "../layout/Container";
import Col from '../layout/Col';
import Row from '../layout/Row';

import {BUTTON_TELEMETRY} from '../../util/telemetryOptions';

import TelemButton from '../common/TelemButton';

class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col w={12}>
                        <Jumbotron>
                            <div className="text-center">
                                <h2 className="display-4 text-info">Welcome to the Store!</h2>
                                <p className="lead">This site was built to take your data- have fun!</p>
                                <TelemButton type="link" path="/products" size="lg" {...BUTTON_TELEMETRY.NAV_PRODUCTS_BUTTON}>
                                    Go to Products
                                </TelemButton>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;