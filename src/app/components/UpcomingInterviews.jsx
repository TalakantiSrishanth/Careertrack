import { Fragment } from "react";

const UpcomingInterviews = ({ data }) => {
  const interviewData = data?.filter((app) => {
    if (app.status !== "interview") return false;
    if (!app.interview?.date) return false;

    const interviewTime = new Date(app.interview.date).getTime();
    const now = Date.now();
    const oneWeekLater = now + 7 * 24 * 60 * 60 * 1000;

    return interviewTime >= now && interviewTime <= oneWeekLater;
  });

  return (
    <div className="space-y-4">
      {interviewData.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold">
            Upcoming Interviews
          </h2>

          <div className="space-y-3">
            {interviewData.map((app) => {
              const interviewDate = new Date(app.interview.date);
              const diffMs = interviewDate - Date.now();
              const diffDays = Math.floor(
                diffMs / (1000 * 60 * 60 * 24)
              );

              let statusText = "Interview • ";
              if (diffDays === 0) statusText += "Today";
              else if (diffDays === 1) statusText += "Tomorrow";
              else {
                statusText += interviewDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }

              const detailText = `${interviewDate.toLocaleString("en-US", {
                weekday: "short",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })} · ${app.interview.mode}`;

              return (
                <Fragment key={app._id}>
                  <div className="flex items-start rounded-xl border bg-white p-4 shadow-sm">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {app.company}
                        <span className="text-gray-500 font-normal">
                          {" "}– {app.title}
                        </span>
                      </h3>

                      <p className="text-xs font-medium text-blue-600">
                        {statusText}
                      </p>

                      <p className="text-xs text-gray-500">
                        {detailText}
                      </p>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-xl border bg-white p-4 text-sm text-gray-400">
          No upcoming interviews this week
        </div>
      )}
    </div>
  );
};

export default UpcomingInterviews;
