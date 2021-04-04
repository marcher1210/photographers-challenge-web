import React from 'react';
import Card from './Card'

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export class WhereCard extends Card {
    constructor(props) {
        super(props);

        var date = new Date(props.data);
        var firstDayOfMonth = (new Date(date.getFullYear(), date.getMonth(), 1).getDay()+6)%7;
        var monthName = monthNames[date.getMonth()];
        var year = date.getFullYear();

        var calX = (date.getDay()+6)%7;
        var calY = Math.floor((date.getDate()+firstDayOfMonth-1)/7);
        var top = 42 + calY * 11.5;
        var left = 3  + calX * 14;

        this.state = {
            data: props.data,
            caption: "When",
            left: left + "%",
            top: top + "%",
            monthName: monthName,
            year: year,
        };
    }
    image() {
        return (
            <div class="img calendar"
                style={{
                    position: "relative",
                    backgroundImage: "url('https://blankcalendarpages.com/printable_calendar/monday1/" + this.state.monthName + "-" + this.state.year + "-calendar-monday-start1.jpg')"
                }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Red_X_Freehand.svg" alt="Calendar"
                    style={{
                        position: "absolute",
                        width: "10%",
                        height: "10%",
                        left: this.state.left,
                        top: this.state.top
                    }} />
                <div class="text">{this.state.data}</div>
            </div>);
    }
}

export default WhereCard;