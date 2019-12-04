import React from 'react';
var request = require("request");

export class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    image() {
        return (<img src="https://previews.123rf.com/images/titonz/titonz1810/titonz181000010/111510920-old-paper-textured-background-blank-sheet-of-ancient-parchment-.jpg"/>);
    }

    caption(){
        return(
            <div class="caption">{this.state.caption}</div>
        );
    }

    render() {
        return (
            <div class="item">
                <div class="polaroid">
                    {this.image()}
                    {this.caption()}
                </div>
            </div>
        );
    }
}

export default Card;