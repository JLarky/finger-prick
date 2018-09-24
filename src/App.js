import React, { Component } from "react";
import "./App.css";
import hand from "./hand-hold-svgrepo-com.svg";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

class App extends Component {
    state = {
        counter: parseInt(localStorage.counter) || 0,
        slider: parseInt(localStorage.slider) || 0,
        position: localStorage.last || "[0,0]",
    };
    onRef = ref => {
        this.swipeRef = ref;
        if (ref) {
            const swiper = new Swiper(ref, {
                initialSlide: this.state.slider,
                on: {
                    slideChange: a => {
                        if (swiper) {
                            localStorage.slider = swiper.activeIndex;
                            this.setState({ slider: swiper.activeIndex });
                        }
                    },
                },
            });
        }
    };
    onClick = e => {
        localStorage.last = JSON.stringify([e.clientX, e.clientY]);
        this.setState(
            state => ({ position: localStorage.last, counter: state.counter + 1 }),
            () => {
                localStorage.counter = this.state.counter;
            }
        );
    };
    newNeedle = e => {
        e.preventDefault();
        this.setState({ counter: 0 }, () => {
            localStorage.counter = this.state.counter;
        });
    };
    render() {
        const [left, top] = JSON.parse(this.state.position);
        return (
            <div className="App">
                <div class="swiper-container" ref={this.onRef} onClick={this.onClick}>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img alt="left hand" className="hand left" src={hand} />
                        </div>
                        <div class="swiper-slide">
                            <img alt="right hand" className="hand" src={hand} />
                        </div>
                    </div>
                </div>
                <div class="full-circle" style={{ "--left": left, "--top": top }} />
                {/* {this.state.position} */}
                <div style={{ marginLeft: 10 }}>{"Needle: " + this.state.counter}</div>
                <div style={{ marginLeft: 10 }} onClick={this.newNeedle}>
                    <a href="#">New needle</a>
                </div>
            </div>
        );
    }
}

export default App;
