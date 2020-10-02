import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      dishes: DISHES
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar key="nav" dark color="primary">
          <div className="container">
            <NavbarBrand key="navbrand" href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu key="menu" dishes={this.state.dishes} />
      </div>
      
    );
  }
}

export default App;