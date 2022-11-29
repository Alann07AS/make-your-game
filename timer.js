let minute = 0;
let second = 0;
let cron;

function start() {
    pause();
    cron = setInterval(() => { timer(); }, 1000);
}

function pause() {
    clearInterval(cron);
}

function timer() {
    if ((second += 1)== 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
    }
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
    return input > 9 ? input : `0${input}`
}

// function reset() {
//     minute = 0;
//     second = 0;
//     document.getElementById('minute').innerText = '00';
//     document.getElementById('second').innerText = '00';
// }

// end of timer part
