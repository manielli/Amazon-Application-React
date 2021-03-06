import "../styles/App.css";
import React, { Component } from "react";
import ProductShowPage from "./ProductShowPage";
import ProductIndexPage from "./ProductIndexPage";
// import NewProductForm from "./NewProductForm";
import BootTable from "./BootTable";

import NavBar from "./NavBar";
import WelcomePage from "./WelcomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import productsData from "../productsData";
// import productData from "../productData";
// import tableData from "../tableData";

// import { Product } from "../requests";
import { Session } from "../requests";



// import Fa from "./Fa";

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAtom } from '@fortawesome/free-solid-svg-icons';
// library.add(faAtom);

// window.Product = Product;
// window.Session = Session;

import SignInPage from "./SignInPage";
import { User } from "../requests";
import ProductNewPage from "./ProductNewPage";
import AuthRoute from "./AuthRoute";

import NotFoundPage from "./NotFoundPage"

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            loading: true
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.destroySession = this.destroySession.bind(this);
    }

    destroySession() {
        this.setState({
            currentUser: null
        });

        Session.destroy();
    }

    getCurrentUser() {
        User.current().then(data => {
            const { current_user: currentUser } = data;

            if (currentUser) {
                this.setState({currentUser});
            }
            this.setState({loading: false});
        });
    }

    componentDidMount() {
        // Session
        // .create({email: "js@winterfell.gov", password: "daenerystargaryen"})
        // .then((user) => {
        //     this.setState({
        //         currentUser: user
        //     });
        // });

        this.getCurrentUser();
    }

    render () {
        const { currentUser, loading } = this.state;
        console.log(this.state.currentUser);
        return (
            <BrowserRouter>
                <div>
                    <NavBar currentUser={currentUser} onSignOut={this.destroySession} />

                    {/* <span style={{padding: "5px", fontSize: "32px"}}>
                        <FontAwesomeIcon icon="atom" />
                        
                        Amazon Application React Version
                        
                        <Fa kind={"canadian-maple-leaf"} size={"1x"} faSpin={true} />
                    </span> */}

                    {/* <BootTable tableData={tableData} striped={true} bordered={false} condensed={true} hover={false} /> */}
                    
                    {/* <ProductIndexPage products={productsData} /> */}
                    {/* <ProductIndexPage /> */}
                    {/* <ProductShowPage product={productData} /> */}
                    {/* <ProductShowPage /> */}
                    {
                        loading ? (
                            <main>
                                <h1>Loading...</h1>
                            </main>
                        ) : (
                            <Switch>
                                {/* <Route path="/products/new" component={NewProductForm} /> */}
                                <AuthRoute isAuth={currentUser} path="/products/new" component={ProductNewPage} />
                                <Route path="/" exact component={WelcomePage} />
                                <Route path="/products" exact component={ProductIndexPage} />
                                <Route path="/products/:id" exact component={ProductShowPage} />
                                {/* <Route path="/sign_in" component={SignInPage} /> */}
                                <Route path="/sign_in" render={routeProps => <SignInPage {...routeProps} onSignIn={this.getCurrentUser}  />} />
                                <Route path="/productstable" exact component={BootTable} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        )
                    }
                </div>
            </BrowserRouter>
        );
    }
};

export default App;