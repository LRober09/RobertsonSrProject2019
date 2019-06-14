import React from 'react';

const AppContext = React.createContext();

const AppContextConsumer = AppContext.Consumer;

class AppProvider extends React.Component {
    constructor(props) {
        super(props);

        this.setUser = (user) => {
            this.setState({user: user})
        };

        this.setProducts = (products) => {
            this.setState({products: products});
        };

        this.state = {
            user: {},
            products: [],
            setUser: this.setUser,
            setProducts: this.setProducts,
        };
    }

    render() {
        const {children} = this.props;

        return (
            <AppContext.Provider value={this.state}>
                {children}
            </AppContext.Provider>
        )
    }
}



export {AppContext, AppContextConsumer, AppProvider};