class Calendar {
	constructor(start_month, start_day, start_year) {
		this.start_month = start_month || new Date().getMonth();
		this.start_day = start_day || new Date().getDate();
		this.start_year = start_year || new Date().getFullYear();
		this.weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
		this.month_compare = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		this.compare_weekdays = [6, 0, 1, 2, 3, 4, 5];
		this.month = this.month_compare[new Date().getMonth()];

		this.container_DOM_element = '';
		this.prev_button = '';
		this.next_button = '';

		this.deleteSoon = null;

		this.display_date = null;
	}

	getThisMonthDays() {
		const date = new Date(this.start_year, this.start_month, 1);
		var days = [];
		while (date.getMonth() === this.start_month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	getPrevMonthDays() {
		let pm = this.start_month - 1;
		let y = this.start_year;

		if (pm === -1) {
			pm = 11;
			y--;
		}

		const date = new Date(y, pm, 1);
		const days = [];
		while (date.getMonth() === pm) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	getNextMonthDays() {
		let nm = this.start_month + 1;
		let y = this.start_year;

		if (nm > 11) {
			nm = 0;
			y++;
		}

		const date = new Date(y, nm, 1);

		const days = [];
		while (date.getMonth() === nm) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}

	daysBefore() {
		let pm = this.start_month - 1;
		let y = this.start_year;

		if (pm === -1) {
			pm = 11;
			y--;
		}

		const start_day = new Date(y, pm + 1, 1).getDay();

		const days_prev_r = this.getPrevMonthDays();
		days_prev_r.reverse();
		const days_to_render = [];
		for (var i = 0; i < this.compare_weekdays[start_day]; i++) {
			days_to_render.push(days_prev_r[i]);
		}
		return days_to_render.reverse();
	}

	render(DOMElement) {
		if (DOMElement) {
			this.container_DOM_element = DOMElement;
		}
		if (this.display_date) {
			const date_container = document.querySelector(this.display_date);
			date_container.innerHTML = '';
			date_container.innerHTML = `${this.month} ${this.start_year}`;
		}

		const calendar_container = document.querySelector(this.container_DOM_element);

		const previous = this.daysBefore();
		const current = this.getThisMonthDays();
		const next = this.getNextMonthDays();

		calendar_container.innerHTML = '';

		for (let i = 0; i < this.weekdays.length; i++) {
			calendar_container.innerHTML += `
			<div class="compactCalendar-weekday">
				<div class="day">${this.weekdays[i]}</div>
			</div>
		`;
		}

		for (let i = 0; i < previous.length; i++) {
			calendar_container.innerHTML += `
				<div class="previous_month_date compactCalendar-day">
					<div class="day">${previous[i].getDate()}</div>
				</div>
			`;
		}
		for (let i = 0; i < current.length; i++) {
			calendar_container.innerHTML += `
				<div class="current_month_date compactCalendar-day">
					<div class="day">${current[i].getDate()}</div>
				</div>
			`;
		}
		for (let i = 0; i < 42 - previous.length - current.length; i++) {
			calendar_container.innerHTML += `
				<div class="next_month_date compactCalendar-day">
					<div class="day">${next[i].getDate()}</div>
				</div>
			`;
		}
	}
	next() {
		if (this.start_month < 11) {
			this.start_month = this.start_month + 1;
		} else {
			this.start_month = 0;
			this.start_year = this.start_year + 1;
		}

		this.month = this.month_compare[this.start_month];

		this.render();
	}

	prev() {
		if (this.start_month > 0) {
			this.start_month = this.start_month - 1;
		} else {
			this.start_month = 11;
			this.start_year = this.start_year - 1;
		}

		this.month = this.month_compare[this.start_month];

		this.render();
	}

	initControls({ prevElement, nextElement }) {
		const prev_btn = document.querySelector(prevElement);
		const next_btn = document.querySelector(nextElement);

		if (prevElement) {
			prev_btn.addEventListener('click', () => this.prev());
		}
		if (nextElement) {
			next_btn.addEventListener('click', () => this.next());
		}
	}

	set dateDisplay(DOMElement) {
		this.display_date = DOMElement;
	}
	set calendarContainer(DOMElement) {
		this.container_DOM_element = DOMElement;
	}
}

class Timer {
	constructor({ seconds, minutes, hours, day, month, year }) {
		this.seconds = seconds || '';
		this.minutes = minutes || '';
		this.hours = hours || '';
		this.day = day || '';
		this.month = month || '';
		this.year = year || '';

		this.date = new Date();
		this.date.setSeconds(this.seconds);
		this.date.setMinutes(this.minutes);
		this.date.setHours(this.hours);
		this.date.setDate(this.day);
		this.date.setFullYear(this.year);
	}
	initCountdown(DOMElement) {
		const date = this.date;

		console.log(date);
		// setInterval(() => {
		// 	console.log(` ${date.getHours()} ${date.getMinutes()} ${date.getSeconds()}`);
		// 	// console.log(date);
		// 	date.setSeconds(date.getSeconds() - 1);
		// }, 1000);
	}
}

const timer = new Timer({
	seconds: 3,
	minutes: 2,
	hours: 4,
	day: 1,
	month: 6,
	year: new Date().getFullYear(),
});
timer.initCountdown();

const kalik = new Calendar();
kalik.calendarContainer = '.cal';

kalik.dateDisplay = '.date';
kalik.render();

kalik.initControls({
	prevElement: '.prev',
	nextElement: '.next',
});

// fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=00de6d2355084f93a19502689c461e6b')
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
