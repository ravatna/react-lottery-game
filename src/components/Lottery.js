import React, { Component } from 'react';

import './Lottery.css';
import Ball from './Ball';

export class Lottery extends Component {
    static defaultProps = {
        title: 'Lotto',
        numBalls: 6,
        maxNum: 40,
    };

    constructor(props) {
        super(props);
        this.state = { nums: Array.from({ length: this.props.numBalls }) };

        this.handleClick = this.handleClick.bind(this);
    }

    generate() {
        this.setState((state) => ({
            nums: state.nums.map(
                (number) => Math.floor(Math.random() * this.props.maxNum) + 1
            ),
        }));
    }

    handleClick() {
        this.generate();
    }

    render() {
        return (
            <section className="Lottery">
                <h1>{this.props.title}</h1>
                <div>
                    {this.state.nums.map((number, index) => (
                        <Ball key={index} num={number} />
                    ))}
                </div>
                <button onClick={this.handleClick}>
                    Generate Winning Numbers
                </button>
            </section>
        );
    }
}

export default Lottery;
