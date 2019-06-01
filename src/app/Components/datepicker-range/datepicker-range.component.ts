import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FlatsViewCurrentComponent} from '../flats-view-current/flats-view-current.component';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css']
})
export class DatepickerRangeComponent implements OnInit {

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  totalPrice: number;
  today: NgbDate;
  fromDateSec: Date = new Date;
  toDateSec: Date = new Date;

  constructor(calendar: NgbCalendar, private flatsCurrent: FlatsViewCurrentComponent) {
    this.today = calendar.getToday();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.toDate != null && this.fromDate != null) {
      this.fromDateSec.setFullYear(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      this.toDateSec.setFullYear(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      this.totalPrice = Math.round((this.toDateSec.getTime() - this.fromDateSec.getTime()) / 86400000 * this.flatsCurrent.flat.price);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit(): void {
  }

}
