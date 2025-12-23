export function getStatusDistribution(applications) {
    const distribution = applications.reduce((acc, app) => {
        const status = app.status.charAt(0).toUpperCase() + app.status.slice(1);
        const existing = acc.find(item => item.status == status);
        if (existing)
            existing.count++;
        else
            acc.push({
                status
                , count: 1
            });
        return acc;
    }, []);

    const total = distribution.reduce(
        (sum, item) => sum + item.count,
        0
    );

    return distribution.map(item => ({
        ...item,
        percentage:
            total === 0
                ? 0
                : Number(((item.count / total) * 100).toFixed(1))
    }));
}
export function getApplicationsData(applications) {
    return applications.reduce((acc, app) => {
        const date = new Date(app.appliedAt).toISOString().split("T")[0];
        const existing = acc.find(item => item.date === date);
        if (existing) {
            existing.count++;
        } else {
            acc.push({ date, count: 1 });
        }
        return acc;
    }, []);
}
export function getFunnelData(applications) {
  const applied = applications.length;

  const interview = applications.filter(app =>
    app.status === "interview" || app.fromStatus === "interview"
  ).length;

  const offer = applications.filter(app =>
    app.status === "offer" || app.fromStatus === "offer"
  ).length;

  return [
    { stage: "Applied", count: applied },
    { stage: "Interview", count: interview },
    { stage: "Offer", count: offer }
  ];
}
