import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Screens/Home/Home";
import Detalle from "./Screens/Detalle/Detalle";
import Peliculas from "./Screens/Peliculas/Peliculas";
import Login from "./Screens/Login/Login";
import Favoritos from "./Screens/Favoritos/Favoritos";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
 
function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/detalle/:id" component={Detalle} />
          <Route path="/peliculas/:tipo" component={Peliculas} />
          <Route path="/login" component={Login} />
          <Route path="/favoritos" component={Favoritos} />
          
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
 
export default App;