import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MovieSec from "./Components/MovieSection/MovieSection";


function App() {
  return (
    <body>
      <Header />
      <main>
        <MovieSec />
      </main>
      <Footer />

    </body>
  );
}

export default App;