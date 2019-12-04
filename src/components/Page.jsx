import React from 'react';
import LimitCard from './LimitCard';
import Card from './Card'
import WhatCard from './WhatCard'
import WhenCard from './WhenCard'
import WhereCard from './WhereCard'

export class Page extends React.Component {

    render() {
        var point = JSON.parse(this.props.where);
        return (
            <div class="page">
                <h1>{this.props.when}</h1>
                <p>&nbsp;</p>
                <WhatCard data={this.props.what} />
                <WhenCard data={this.props.when} />
                <WhereCard x={point[0]} y={point[1]} />
                <WhereCard x={point[0]} y={point[1]} local={true} />

                <div class="notes">
                    <div class="caption">Notes</div>
                </div>
            </div>
        );
    }
}

export default Page;