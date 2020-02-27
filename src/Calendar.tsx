import React from 'react';
import './Calendar.css';
import {FullDate, Month, dayNames} from './FullDate';


interface MonthPickerProps {
  selectedDate: FullDate
}

class MonthPicker extends React.Component<MonthPickerProps> {
  render() {
    return(
      <div className="current-month">{this.props.selectedDate.month.getMonthName()}</div>
    );
  }
}

interface YearPickerProps {
  selectedDate: FullDate
}

class YearPicker extends React.Component<YearPickerProps> {
  render() {
    return(
      <div className="current-year">{this.props.selectedDate.year.number}</div>
    );
  }
}

interface DayProps {date: FullDate, selected: boolean, selectDay: (day: FullDate) => void}

class Day extends React.Component<DayProps> {
  render() {
    let selected: any = {};
    if(this.props.selected) {
      selected.backgroundColor = "pink";
    }
    return(
      <button className="day-button" style={selected} onClick={() => {this.props.selectDay(this.props.date)}}>
        {this.props.date.day}
      </button>
    );
  }
}

interface MonthCalendarProps {
  selectedDate: FullDate, selectDay: (day: FullDate) => void
}

class MonthCalendar extends React.Component<MonthCalendarProps> {
  renderDay(date: FullDate, selected: boolean): JSX.Element {
    return <Day date={date} selected={selected} selectDay={this.props.selectDay} key={date.day+date.month.getMonthName()} />
  }

  renderMonth(date: FullDate): JSX.Element[] {
    let daysInMonth = date.month.numberOfDaysInMonth();
    let daysBeforeMonth = date.month.getFirstDayOfMonth() - 1;
    let daysAfterMonth = (daysInMonth + daysBeforeMonth)%7 ;
    console.log("days after: " + daysAfterMonth);

    let prevMonth = date.month.getRelativeMonth(-1);
    let nextMonth = date.month.getRelativeMonth(1);

    return (
      Array.from(prevMonth.getDaysInMonth(prevMonth.numberOfDaysInMonth() - daysBeforeMonth + 1, prevMonth.numberOfDaysInMonth()), d => this.renderDay(d,(date.day===d.day && date.month.index===d.month.index)))
      .concat(Array.from(date.month.getDaysInMonth(1, date.month.numberOfDaysInMonth()), d => this.renderDay(d,(date.day===d.day && date.month.index===d.month.index))))
      .concat(Array.from(nextMonth.getDaysInMonth(1, 7 - daysAfterMonth), d => this.renderDay(d,(date.day===d.day && date.month.index===d.month.index))))
    );
  }

  renderDaysOfWeek() {
    return dayNames.map(name => <div key={name}>{name}</div>);
  }

  render() {
    return (
      <div>
        <div className="day-names">
          {this.renderDaysOfWeek()}
        </div>
        <div className="days">
          {this.renderMonth(this.props.selectedDate)}
        </div>
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
    console.log("State: " + this.state.selectedDate.day
     + " " + this.state.selectedDate.month.index
     + " " + this.state.selectedDate.year.number);
    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <div className="date-picker">
          <div className="month-picker">
            <MonthPicker selectedDate={this.state.selectedDate}/>
          </div>
          <div className="year-picker">
            <YearPicker selectedDate={this.state.selectedDate}/>
          </div>
        </div>
        <div className="monthly-calendar">
          <MonthCalendar selectedDate={this.state.selectedDate} selectDay={(selectedDate) => {this.setState({selectedDate})}}/>
        </div>
      </div>
    );
  }
}

export default Calendar;
