import {BUTTON_TELEMETRY} from "./telemetryOptions";
import TelemButton from "../components/common/TelemButton";
import Button from '../components/common/Button';
import React from "react";

const buttonA = () => (
    <TelemButton color="primary"
                 block
                 handler={this.handleAdd}
                 disabled={this.state.isSubmitting}
                 {...BUTTON_TELEMETRY.PROD_ADD_CART_BUTTON}>
        <span className="oi oi-cart"/> Add to Cart
    </TelemButton>
);


const buttonB = () => (
    <Button color="primary"
                 block
                 onClick={this.handleAdd}
                 disabled={this.state.isSubmitting}>
        <span className="oi oi-cart"/> Add to Cart
    </Button>
);



let a = buttonA;
let b = buttonB;