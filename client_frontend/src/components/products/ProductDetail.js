import React, {Component} from 'react';
import Container from "../layout/Container";
import Button from '../common/Button';
import Row from "../layout/Row";
import Col from '../layout/Col';
import Loader from '../common/Loader';

import TelemButton from '../common/TelemButton';
import {BUTTON_TELEMETRY} from "../../util/telemetryOptions";
import {AppContext} from "../Context";

import {formatUsd} from "../../util/format";
import store from "store";
import {addToUserCart, removeFromUserCart} from "../../requests/user";


class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isSubmitting: false,
        }
    }

    componentDidMount() {
        const url = 'http://localhost:8000/products/' + this.props.match.params.productId;
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({product: data})
        })
    }

    handleAddToCart = () => {
        const token = store.get('token');
        addToUserCart(token, this.state.product.id, (result) => {
            this.context.setUser(result);
        }, (err) => {
            console.error(err);
        }, () => {
            this.setState({isSubmitting: true});
        }, () => {
            this.setState({isSubmitting: false});
        });
    };

    handleRemoveFromCart = () => {
        const token = store.get('token');
        removeFromUserCart(token, this.state.product.id, (result) => {
            this.context.setUser(result);
        }, (err) => {
            console.error(err);
        }, () => {
            this.setState({isSubmitting: true});
        }, () => {
            this.setState({isSubmitting: false});
        });
    };

    render() {
        const {product} = this.state;
        return (
            <Container>
                {
                    product && this.context.user.profile ? (
                        <React.Fragment>
                            <Row>
                                <Col>
                                    <TelemButton color="secondary"
                                                 outline
                                                 type="link"
                                                 path="/products"
                                                 controlIdSuffix={product._id}
                                                 {...BUTTON_TELEMETRY.NAV_PRODUCTS_BUTTON}>
                                        <span className="oi oi-arrow-left"/> Back to Products
                                    </TelemButton>
                                </Col>
                            </Row>
                            <Row>
                                <div className="col-12 col-md-8">
                                    <div className="card h-100 text-center">
                                        <div className="card-header">
                                            <h2 className="display-4">{product.name}</h2>
                                        </div>
                                        <div className="card-body">
                                            <img src={product.imgUrl} alt={product.name} height={400}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Product
                                                    name: <strong>{product.name}</strong></li>
                                                <li className="list-group-item">Description: <strong>{product.description}</strong>
                                                </li>
                                                <li className="list-group-item">In
                                                    stock: <strong>{product.stock}</strong></li>
                                                <li className="list-group-item">Price: <strong>{formatUsd(product.price)}</strong>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <Button color="warning" disabled outline block><span
                                                className="oi oi-star"/> Save
                                                for Later</Button>
                                            {
                                                product.stock > 0 ? this.context.user.profile.cart.indexOf(product.id) !== -1 ? (
                                                    <Button color="danger" block onClick={this.handleRemoveFromCart}
                                                            outline disabled={this.state.isSubmitting}>
                                                        <span className="oi oi-x"/> Remove from Cart
                                                    </Button>
                                                ) : (
                                                    <Button color="primary" block onClick={this.handleAddToCart}
                                                            disabled={this.state.isSubmitting}><span
                                                        className="oi oi-cart"/> Add to Cart</Button>
                                                ) : (
                                                    <Button block color="danger" outline disabled>Out of Stock</Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </React.Fragment>
                    ) : (
                        <Row>
                            <Col w={12}>
                                <Loader/>
                            </Col>
                        </Row>
                    )
                }
            </Container>
        )
    }
}

ProductDetail.contextType = AppContext;

export default ProductDetail;