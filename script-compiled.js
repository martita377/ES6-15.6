class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.watch);
        }
    }

    zero() {
        if (!this.running) {
            this.reset();
            this.print();
        }
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    save() {
        this.addTimeToList(this.format(this.times), resultList);
    }

    addTimeToList(time, resultList) {
        let element = document.createElement('li');
        element.innerText = time;
        resultList.appendChild(element);
    }

    clear() {
        if (this.running) {
            this.stop();
            this.zero();
        }
        this.clearList(resultList);
    }

    clearList(resultList) {
        resultList.innerText = '';
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('zero');
resetButton.addEventListener('click', () => stopwatch.zero());

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());

var resultList = document.querySelector('.results');
