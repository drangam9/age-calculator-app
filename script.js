function func() {
    const today = new Date();
    const present = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    }
    const age = {
        year: 0,
        month: 0,
        day: 0,
    }
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    dayInput.style.border = "";
    dayInput.previousElementSibling.style.color = "";
    dayInput.nextElementSibling.innerHTML = "";

    monthInput.style.border = "";
    monthInput.previousElementSibling.style.color = "";
    monthInput.nextElementSibling.innerHTML = "";

    yearInput.style.border = "";
    yearInput.previousElementSibling.style.color = "";
    yearInput.nextElementSibling.innerHTML = "";


    const day = Number(dayInput["value"]);
    const month = Number(monthInput["value"]);
    const year = Number(yearInput["value"]);
    const inputDate = new Date(year, month - 1, day);
    const msDay = 24 * 60 * 60 * 1000;
    const msMonth = 30 * msDay;
    const msYear = 365 * msDay;
    const dateDiff = today - inputDate;

    age.year = Math.floor(dateDiff / msYear);
    age.month = Math.floor(dateDiff % msYear / msMonth);
    age.day = Math.floor(dateDiff % msYear % msMonth / msDay);

    globalThis.DateOk = true;
    let isOk = true;
    if (inputDate >= today) {
        error(dayInput, "Must be in the past");
        error(monthInput);
        error(yearInput);
    }
    if (month > 12 || isNaN(month) || month < 1)
        error(monthInput, "Must be a valid month");
    if (isNaN(day) || day < 1)
        error(dayInput, "Must be a valid day");
    if (isNaN(year) || year < 0)
        error(yearInput, "Must be a valid year");

    if (day == "")
        error(dayInput, "This field is required");
    if (month == "")
        error(monthInput, "This field is required");
    if (year == "")
        error(yearInput, "This field is required");

    if (month < 13) {
        if (month % 2 == 0) {
            if (month < 8) {
                if (day > 30)
                    isOk = false;
            }
            else {
                if (day > 31)
                    isOk = false;
            }
        }
        else {
            if (month < 8) {
                if (day > 31)
                    isOk = false;
            }
            else {
                if (day > 30)
                    isOk = false;
            }
        }
    }
    else
        error(monthInput, "Must be a valid month");
    if (!isOk)
        error(dayInput, "Must be a valid day");
    if (globalThis.DateOk) {
        animate(age);
    }
}
function error(object, message = "") {
    object.style.border = "1px solid red";
    object.previousElementSibling.style.color = "red";
    object.nextElementSibling.innerHTML = message;
    globalThis.DateOk = false;
}
function animate(age) {
    let yearCount = 0;
    let monthCount = 0;
    let dayCount = 0;
    time = 500;
    setInterval(() => {
        if (yearCount <= age.year)
            document.getElementById("years").innerHTML = `${yearCount++}`;
    }, time / age.year);

    setInterval(() => {
        setInterval(() => {
            if (monthCount <= age.month)
                document.getElementById("months").innerHTML = `${monthCount++}`;
        }, time / age.month);

    }, time + 100);

    setInterval(() => {
        setInterval(() => {
            if (dayCount <= age.day)
                document.getElementById("days").innerHTML = `${dayCount++}`;
        }, time / age.day);

    }, 2 * time + 200);
}