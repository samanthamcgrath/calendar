import React from 'react';
import './Calendar.css';
import {FullDate, Month} from './FullDate';



class MonthPicker extends React.Component {
  render() {
    return(
      <h2>Month name goes here</h2>
    );
  }
}

interface DayProps {date: FullDate, selected: boolean, selectDay: (day: FullDate) => void}

class Day extends React.Component<DayProps> {
  render() {
    let selected: any = {};
    if(this.props.selected) {
      selected.backgroundColor = "red";
    }
    return(
      <button className="day" style={selected} onClick={() => {this.props.selectDay(this.props.date)}}>
        {this.props.date.day}
      </button>
    );
  }
}

interface MonthProps {
  selectedDate: FullDate, selectDay: (day: FullDate) => void
}

class MonthCalendar extends React.Component<MonthProps> {
  renderDay(date: FullDate, selected: boolean): JSX.Element {
    return <Day date={date} selected={selected} selectDay={this.props.selectDay} key={date.day} />
  }

  renderMonth(date: FullDate): JSX.Element[] {
    return Array.from(date.month.getDaysInMonth(), d => this.renderDay(d,date.day===d.day));
  }

  render() {


    return (
      <div className="days">
        {this.renderMonth(this.props.selectedDate)}
      </div>
    );
  }
}

interface CalendarState {
  selectedDate: FullDate;
}

interface CalendarProps {
  currentDate: Date;
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = {selectedDate: new FullDate(props.currentDate)}
  }

  render() {
    return (
      <div className="calendar">
        <h2>Calendar</h2>
        <div className="month-picker">
          <MonthPicker/>
        </div>
        <div className="monthly-calendar">
          <MonthCalendar selectedDate={this.state.selectedDate} selectDay={(selectedDate) => {this.setState({selectedDate})}}/>
        </div>
      </div>
    );
  }
}

export default Calendar;
