import React from 'react';
import './Calendar.css';
import {FullDate, Month, MonthYear, Day} from './FullDate';


interface MonthPickerProps {
  selectedDate: FullDate
}

class MonthPicker extends React.Component<MonthPickerProps> {
  render() {
    return(
      <button className="current-month">{this.props.selectedDate.monthYear.getMonthName()}</button>
    );
  }
}

interface YearPickerProps {
  selectedDate: FullDate
}

class YearPicker extends React.Component<YearPickerProps> {
  render() {
    return(
      <button className="current-year">{this.props.selectedDate.year.number}</button>
    );
  }
}

interface DayButtonProps {date: FullDate, selected: boolean, selectDay: (day: FullDate) => void}

class DayButton extends React.Component<DayButtonProps> {
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
    return <DayButton date={date} selected={selected} selectDay={this.props.selectDay} key={date.day+date.monthYear.getMonthName()} />
  }

  renderMonth(date: FullDate): JSX.Element[] {
    let month = date.monthYear;
    let daysInMonth = month.numberOfDaysInMonth();
    let daysBeforeMonth = month.getFirstDayOfMonth().getDayOfTheWeek() - 1;
    let daysAfterMonth = (daysInMonth + daysBeforeMonth)%7;
    console.log("days after: " + daysAfterMonth);

    let prevMonth = month.getRelativeMonth(-1);
    let nextMonth = month.getRelativeMonth(1);
    let daysInPrevMonth = prevMonth.numberOfDaysInMonth();

    return (
      Array.from(prevMonth.getDaysInMonth(daysInPrevMonth - daysBeforeMonth + 1, daysInPrevMonth), d => this.renderDay(d, d.isSameDay(date)))
      .concat(Array.from(month.getDaysInMonth(1, daysInMonth), d => this.renderDay(d, d.isSameDay(date))))
      .concat(Array.from(nextMonth.getDaysInMonth(1, 7 - daysAfterMonth), d => this.renderDay(d, d.isSameDay(date))))
    );
  }

  renderDaysOfWeek() {
    return Object.keys(Day)
            .filter(k => typeof Day[k as any] === "number")
            .map(name => <div key={name}>{name}</div>);
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

interface MonthNavigationProps {
  selectedDate: FullDate, navigateMonth: (day: FullDate) => void
}

class MonthNavigation extends React.Component<MonthNavigationProps> {
  render() {
    let currentMonth = this.props.selectedDate.monthYear;
    let startPrevMonth = currentMonth.getRelativeMonth(-1).getFirstDayOfMonth();
    let startNextMonth = currentMonth.getRelativeMonth(1).getFirstDayOfMonth();
    return (
      <div>
        <button className="prev-month" onClick={() => {this.props.navigateMonth(startPrevMonth)}}>Prev</button>
        <button className="next-month" onClick={() => {this.props.navigateMonth(startNextMonth)}}>Next</button>
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
     + " " + this.state.selectedDate.monthYear.month
     + " " + this.state.selectedDate.year.number);
    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <div className="date-picker">
          <div className="month-navigation">
            <MonthNavigation selectedDate={this.state.selectedDate} navigateMonth={(selectedDate) => {this.setState({selectedDate})}}/>
          </div>
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
