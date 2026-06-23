export const formatChartData = (
  data,
  labelKey,
  valueKey = "count"
) => {

  return data.map((item) => ({

    [labelKey]: item._id,

    [valueKey]: item.count,

  }));

};