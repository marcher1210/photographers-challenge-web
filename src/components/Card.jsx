import React from 'react';

export class Card extends React.Component {

    image() {
        return (<img src="https://previews.123rf.com/images/titonz/titonz1810/titonz181000010/111510920-old-paper-textured-background-blank-sheet-of-ancient-parchment-.jpg" alt="Card"/>);
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