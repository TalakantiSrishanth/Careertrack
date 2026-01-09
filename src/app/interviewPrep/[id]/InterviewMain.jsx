import AIPrepGate from "./AiPrepGate";

const InterviewMain = ({ app }) => {
  if (!app?.interview?.date) return null;

  const interviewDateObj = new Date(app.interview.date);

  const interviewDate = interviewDateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const interviewTime = interviewDateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const remainingDays = Math.ceil(
    (interviewDateObj.getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl border shadow-sm space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          📅 Interview Details
        </h1>
        <p className="text-sm text-gray-500">
          Upcoming interview schedule & AI preparation checklist
        </p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-800">
          {app.company} — {app.title}
        </h2>

        <p className="text-gray-600 mt-1">
          {interviewDate} at {interviewTime} •{" "}
          <span className="capitalize">{app.interview.mode}</span>
        </p>

        <p className="mt-2 text-blue-700 font-medium">
          ⏳ In {remainingDays <= 0 ? "0" : remainingDays} day
          {remainingDays !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="bg-white p-5 rounded-lg border shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-1">Job Description</h3>
        <p className="text-gray-600 text-sm">{app.description}</p>
      </div>
      <AIPrepGate app={app} />
    </div>
  );
};

export default InterviewMain;
