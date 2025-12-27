export function getQuickStats(applications) {
  return applications.reduce(
    (acc, item) => {
      acc.Total += 1;
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    { Total: 0 }
  );
}
