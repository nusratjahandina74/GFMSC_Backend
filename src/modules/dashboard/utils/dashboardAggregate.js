export const monthlyAggregationPipeline = (
  match
) => [
  {
    $match: match,
  },
  {
    $group: {
      _id: {
        $month: "$createdAt",
      },
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
];