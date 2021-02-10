
var currentYear = NepaliFunctions.GetCurrentBsDate().year;
var currentMonth = NepaliFunctions.GetCurrentBsDate().month;

if (currentMonth.toString().length == 1) {
    currentMonth = "0" + currentMonth;
}

var currentDay = NepaliFunctions.GetCurrentBsDate().day;
if (currentDay.toString().length == 1) {
    currentDay = "0" + currentDay;
}

var unicodeCurrentYear = NepaliFunctions.ConvertToUnicode(currentYear);
var unicodeCurrentMonth = NepaliFunctions.ConvertToUnicode(currentMonth);
var unicodeCurrentDay = NepaliFunctions.ConvertToUnicode(currentDay);

var CurrentDateBs = currentYear + "-" + currentMonth + "-" + currentDay; //use in layout for current date
var CurrentDateBsUnicode = unicodeCurrentYear + "-" + unicodeCurrentMonth + "-" + unicodeCurrentDay;