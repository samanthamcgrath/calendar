
export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export enum Day {
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

class Year {
  number: number;

  constructor(number: number) {
    this.number = number;
  }
}

export class MonthYear {
  month: Month;
  year: Year;

  constructor(month: Month, year: Year) {
    this.month = month;
    this.year = year;
  }

  getMonthName() {
    return Month[this.month];
  }

  numberOfDaysInMonth() {
    // get last day in previous month
    const daysInMonth = new Date(this.year.number, this.month, 0).getDate();
    console.log(this.month, daysInMonth);
    return daysInMonth;
  }

  *getDaysInMonth(start: number, end: number) {
    for (let i = start; i <= end; i++) {
      let day = new FullDate(i, this.month, this.year.number);
      yield day;
    }
  }

  getRelativeMonth(offset: number): MonthYear {
    let newMonth;

    let newMonthIndex = this.month + offset;
    let newYearIndex = this.year.number;
    //console.log("New month index:" + newMonthIndex + " New year index: " + newYearIndex);

    if(newMonthIndex > 12) {
      newMonthIndex = newMonthIndex - 12;
      newYearIndex++;
    } else if(newMonthIndex < 1) {
      newMonthIndex = newMonthIndex + 12;
      newYearIndex--;
    }

    return new MonthYear(newMonthIndex, new Year(newYearIndex));
  }


  getFirstDayOfMonth() {
    let firstDayOfMonth = new FullDate(new Date(this.year.number,this.month-1,1));
    //console.log("first day of month: ");
    //console.log(firstDayOfMonth);
    return firstDayOfMonth; 
  }
}

export class FullDate {
  day: number;
  monthYear: MonthYear;
  year: Year;

  constructor(...args: any[]) {
    if(args.length === 1) {
      if(args[0] instanceof Date) {
        this.day = args[0].getDate();
        this.year = new Year(args[0].getFullYear());
        this.monthYear = new MonthYear(args[0].getMonth()+1,this.year);
      } else {
        throw new Error("argument is not of type Date");
      }
    } else {
      this.day = args[0];
      this.year = new Year(args[2]);
      this.monthYear = new MonthYear(args[1],this.year);
    }
  }

  getDayOfTheWeek() {
    let dayOfWeek = new Date(this.year.number, this.monthYear.month-1, this.day).getDay();
    // I want Sun to be last day of the week, not first
    // console.log("day of week: " + dayOfWeek);
    if(dayOfWeek === 0) {
      dayOfWeek = 7;
    }
    return dayOfWeek;
  }

  isSameDay(otherDay: FullDate) {
    return (this.day===otherDay.day 
      && this.monthYear.month===otherDay.monthYear.month 
      && this.year.number===otherDay.year.number);
  }

}

