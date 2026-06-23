export const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatMonthlyData = (
  data
) => {

  return data.map((item) => ({

    month:
      MONTHS[item._id],

    count:
      item.count,

  }));

};