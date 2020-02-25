import React from 'react';
import './Calendar.css';


interface DayProps {date: Date}

class Day extends React.Component<DayProps> {
  render() {
    return(
      <button className="day">
        {this.props.date.getDate()}
      </button>
    );
  }
}

class MonthCalendar extends React.Component {
  renderDay(date: Date) {
    return <Day date={date} key={date.getDate()} />
  }

  renderMonth(year: number, month: number) {
    const monthToRender = [];

    //get number of days in current month
    const daysInMonth = new Date(year, month, 0).getDate();
    console.log(daysInMonth);

    
    for (let i = 1; i <= daysInMonth; i++) {
      let day = new Date(year, month, i);
      console.log(day);
      monthToRender.push(this.renderDay(day));
    }
    console.log()
    return monthToRender;
  }

  render() {
    let currentDate = new Date();
    console.log(currentDate);
    return (
      <div className="days">
        {this.renderMonth(currentDate.getFullYear(),currentDate.getMonth()+1)}
      </div>
    );
  }
}

class Calendar extends React.Component {
  render() {
    return (
      <div className="calendar">
        <h2>Calendar</h2>
        <div className="monthly-calendar">
          <MonthCalendar/>
        </div>
      </div>
    );
  }
}

export default Calendar;
