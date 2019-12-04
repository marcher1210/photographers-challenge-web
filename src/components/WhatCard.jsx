import React from 'react';
import Card from './Card'

export class WhatCard extends Card {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            caption: "What"
        };
    }
    image() {
        return (<div class="img word">
            <div class="text">{this.state.data}</div>
        </div>);
    }
}

export default WhatCard;