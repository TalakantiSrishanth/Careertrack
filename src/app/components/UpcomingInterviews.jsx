import Link from "next/link";
import { Fragment } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export default function UpcomingInterviews({ data }) {
  const interviewData = data?.filter((app) => {
    if (app.status !== "interview") return false;
    if (!app.interview?.date) return false;

    const interviewTime = new Date(app.interview.date).getTime();
    const now = Date.now();
    const oneWeekLater = now + 7 * 24 * 60 * 60 * 1000;

    return interviewTime >= now && interviewTime <= oneWeekLater;
  });

  if (!interviewData.length) {
    return (
      <Card className="text-sm text-gray-500">
        <CardContent className="p-4">
          No upcoming interviews this week
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Upcoming Interviews</h2>

      <div className="space-y-3">
        {interviewData.map((app) => {
          const interviewDate = new Date(app.interview.date);
          const diffMs = interviewDate - Date.now();
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

          let statusText = "Interview • ";
          if (diffDays === 0) statusText += "Today";
          else if (diffDays === 1) statusText += "Tomorrow";
          else
            statusText += interviewDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

          const detailText = `${interviewDate.toLocaleString("en-US", {
            weekday: "short",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })} · ${app.interview.mode}`;

          return (
            <Fragment key={app._id}>
              <InterviewCard
                company={app.company}
                title={app.title}
                statusText={statusText}
                detailText={detailText}
                id={app._id}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function InterviewCard({ company, title, statusText, detailText, id }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex items-start justify-between p-4">
        <div className="space-y-1">
          <CardTitle className="text-sm font-semibold">
            {company}
            <span className="text-gray-500 font-normal"> – {title}</span>
          </CardTitle>

          <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
            <Calendar className="h-3 w-3" />
            {statusText}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {detailText}
          </div>
        </div>

        <Link href={`/interviewPrep/${id}`}>
          <Button size="sm">Prepare</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
