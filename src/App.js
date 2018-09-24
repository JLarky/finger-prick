import React, { Component } from "react";
import "./App.css";
import hand from "./hand-hold-svgrepo-com.svg";

class App extends Component {
    render() {
        return (
            <div className="App">
                <img className="hand" src={hand} />
            </div>
        );
    }
}

export default App;
