import React from 'react';
import Card from './Card'

export class WhereCard extends Card {
    constructor(props) {
        super(props);
        this.state = {
            point: {
                x: props.x,
                y: props.y
            },
            src: "https://photographerschallenge.azurewebsites.net/map"+(props.local ? "local" : "overview")+"?lon="+props.x+"&lat="+props.y,
            href: "http://www.google.com/maps/place/"+props.y+","+props.x,
            caption: "Where"
        };
    }
    image() {
        return (<img src={this.state.src}/>);
    }
    caption() {
        return (
            <div>
                <div class="caption">Where</div>
                <div class="smallcaption">
                    <a href={this.state.href} target="_blank">
                        ({this.state.point.x},{this.state.point.y})
                    </a>
                </div>
            </div>
        );
    }
}

export default WhereCard;