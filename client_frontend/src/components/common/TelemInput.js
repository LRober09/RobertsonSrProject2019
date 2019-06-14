import React, {Component} from 'react';
import {withTelemetry} from '../../telemetry/components/withTelemetry';

class TelemFormInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            timer: new Date(),
        }
    }

    fireTimer = () => {

    };

    onChange = (e) => {
        this.setState({value: e.target.value, timer: new Date().getTime()});
        this.fireTimer();
        this.props.handler && this.props.handler(e);
    };

    render() {
        const {handler, onInteraction, ...otherProps} = this.props;
        return (
            <input onChange={this.onChange} {...otherProps}/>
        )
    }
}


export default withTelemetry(TelemFormInput);