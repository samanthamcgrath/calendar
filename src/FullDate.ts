const monthNames = ["January","February","March","April","May","June","July",
                    "August","September","October","November","December"];
const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

class Year {
  number: number;

  constructor(number: number) {
    this.number = number;
  }
}

export class Month {
  index: number;
  year: Year;

  constructor(month: number, year: Year) {
    this.index = month;
    this.year = year;
  }

  getMonthName() {
    return monthNames[this.index-1];
  }

  numberOfDaysInMonth() {
    const daysInMonth = new Date(this.year.number, this.index, 0).getDate();
    return daysInMonth;
  }

  *getDaysInMonth() {
    for (let i = 1; i <= this.numberOfDaysInMonth(); i++) {
      let day = new FullDate(i, this.index, this.year.number);
      yield day;
    }
  }

}

export class FullDate {
  day: number;
  month: Month;
  year: Year;

  constructor(...args: any[]) {
    if(args.length === 1) {
      if(args[0] instanceof Date) {
        this.day = args[0].getDate();
        this.year = new Year(args[0].getFullYear());
        this.month = new Month(args[0].getMonth()+1,this.year);
      } else {
        throw new Error("argument is not of type Date");
      }
    } else {
      this.day = args[0];
      this.year = new Year(args[2]);
      this.month = new Month(args[1],this.year);
    }
  }
}

