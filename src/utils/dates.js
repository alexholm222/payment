

export function handleMonth(n) {
    const date = new Date();
    date.setMonth(date.getMonth() + n);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    let fMonth;
    switch (month){
      case 0: fMonth = "январь"; break;
      case 1: fMonth="февраль"; break;
      case 2: fMonth="март"; break;
      case 3: fMonth="апрель"; break;
      case 4: fMonth="май"; break;
      case 5: fMonth="июнь"; break;
      case 6: fMonth="июль"; break;
      case 7: fMonth="август"; break;
      case 8: fMonth="сентябрь"; break;
      case 9: fMonth="октябрь"; break;
      case 10: fMonth="ноябрь"; break;
      case 11: fMonth="декабрь"; break;
      default:
  }

  return {date: `${year}-${month + 1 < 10 ? '0': ''}${month + 1}-${day < 10 ? '0': ''}${day}`, month: fMonth}
}
