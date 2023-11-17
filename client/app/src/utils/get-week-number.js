export function getWeekNumber(d) {
    d = new Date(d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return Math.ceil((((d - week1) / 86400000) + 1) / 7);
  }