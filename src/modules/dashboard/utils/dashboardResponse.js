export const dashboardResponse = ({
    counters = {},
    charts = {},
    recentActivities = [],
}) => {
    return {
        counters,
        charts,
        recentActivities,
        generatedAt: new Date(),
    };
};