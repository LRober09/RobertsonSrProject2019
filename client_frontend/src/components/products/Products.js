import React, {Component} from 'react';

import {AppContext, AppContextConsumer} from "../Context";
import {fetchProducts} from "../../requests/products";

import Container from '../layout/Container';
import Row from '../layout/Row';
import Col from '../layout/Col';
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            hasError: false,
        }
    }

    componentDidMount() {
        fetchProducts((result) => {
            this.context.setProducts(result);
        }, (err) => {
            console.error("Error:", err);
        });
    }

    render() {
        return (
            <AppContextConsumer>
                {({products}) => (
                    <Container>
                        <Row>
                            <Col>
                                <h2 className="display-4">All Products</h2>
                            </Col>
                        </Row>
                        <Row>
                            {
                                products.length > 0 ? products.map((product, i) => {
                                    return (
                                        <Col w={4} key={i}>
                                            <ProductCard product={product}/>
                                        </Col>
                                    )
                                }) : (
                                    <Col w={12}>
                                        <Loader/>
                                    </Col>
                                )
                            }
                        </Row>
                    </Container>
                )}
            </AppContextConsumer>
        )
    }
}

Products.contextType = AppContext;

export default Products;