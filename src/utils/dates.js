

export function handleMonth(n) {
  const date = new Date();
  const date2 = new Date();
  const monthNum = date2.getMonth();
  date.setMonth(date.getMonth() + n, 1);
  const day = date.getDate();

  const year = date.getFullYear();
  const yearNow = date2.getFullYear();
  const month = date.getMonth();

  const monthCurrent = date2.getMonth();

  const dayCurrent = date2.getDate();
  const lastDayDate = new Date(date2.getFullYear(), date2.getMonth() + 1, 0);
  const lastDay = lastDayDate.getDate();

  let fMonth;
  switch (month) {
    case 0: fMonth = "январь"; break;
    case 1: fMonth = "февраль"; break;
    case 2: fMonth = "март"; break;
    case 3: fMonth = "апрель"; break;
    case 4: fMonth = "май"; break;
    case 5: fMonth = "июнь"; break;
    case 6: fMonth = "июль"; break;
    case 7: fMonth = "август"; break;
    case 8: fMonth = "сентябрь"; break;
    case 9: fMonth = "октябрь"; break;
    case 10: fMonth = "ноябрь"; break;
    case 11: fMonth = "декабрь"; break;
    default:
  }

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июня"; break;
    case 6: fMonth2 = "июля"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  let fMonthNow;
  switch (monthNum) {
    case 0: fMonthNow = "января"; break;
    case 1: fMonthNow = "февраля"; break;
    case 2: fMonthNow = "марта"; break;
    case 3: fMonthNow = "апреля"; break;
    case 4: fMonthNow = "мая"; break;
    case 5: fMonthNow = "июня"; break;
    case 6: fMonthNow = "июля"; break;
    case 7: fMonthNow = "августа"; break;
    case 8: fMonthNow = "сентября"; break;
    case 9: fMonthNow = "октября"; break;
    case 10: fMonthNow = "ноября"; break;
    case 11: fMonthNow = "декабря"; break;
    default:
  }


  return {
    date: `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`,  month: fMonth, monthNum: monthNum, yearNow: yearNow, month2: fMonth2, monthNameNow: fMonthNow, lastDay: lastDay, year: year, day: day
  }
}

export function handleSubscriptionDate(n, m) {
  const date = new Date(n);
  date.setDate(date.getDate() - m)
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июня"; break;
    case 6: fMonth2 = "июля"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  return { month: month, day: day, monthName: fMonth2, year: year }
}

export function handlePayPeriod(m) {
  let state = false;
  const date = new Date();
  const day = date.getDate();

  if (day > 0 && day <= m) {
    state = true;
  } else {
    state = false;
  }
  return state
}


export function handleDifDate(n) {
  const date = new Date(n);
  const month = date.getMonth() < 11 ? date.getMonth() : 0;

  let fMonth2;
  switch (month) {
    case 0: fMonth2 = "января"; break;
    case 1: fMonth2 = "февраля"; break;
    case 2: fMonth2 = "марта"; break;
    case 3: fMonth2 = "апреля"; break;
    case 4: fMonth2 = "мая"; break;
    case 5: fMonth2 = "июня"; break;
    case 6: fMonth2 = "июля"; break;
    case 7: fMonth2 = "августа"; break;
    case 8: fMonth2 = "сентября"; break;
    case 9: fMonth2 = "октября"; break;
    case 10: fMonth2 = "ноября"; break;
    case 11: fMonth2 = "декабря"; break;
    default:
  }

  return fMonth2;

}

export function handleDay(n) {
  const data = new Date(n)
  const day = data.getDate();
  return day;
}

export function handleDatesForActs(n) {
  const date = new Date();
  const date2 = new Date(n);
  const year = date.getFullYear();
  const month = date2.getMonth();

  let fMonth;
  switch (month) {
    case 0: fMonth = "январь"; break;
    case 1: fMonth = "февраль"; break;
    case 2: fMonth = "март"; break;
    case 3: fMonth = "апрель"; break;
    case 4: fMonth = "май"; break;
    case 5: fMonth = "июнь"; break;
    case 6: fMonth = "июль"; break;
    case 7: fMonth = "август"; break;
    case 8: fMonth = "сентябрь"; break;
    case 9: fMonth = "октябрь"; break;
    case 10: fMonth = "ноябрь"; break;
    case 11: fMonth = "декабрь"; break;
    default:
  }
  return { year, fMonth }
}