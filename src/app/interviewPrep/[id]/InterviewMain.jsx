import AIPrepGate from "./AIPrepGate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function InterviewMain({ app }) {
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
    (interviewDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📅 Interview Details</CardTitle>
          <CardDescription>
            Upcoming interview schedule & AI preparation checklist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg font-semibold">
            {app.company} — {app.title}
          </p>

          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4" />
            {interviewDate} at {interviewTime} •{" "}
            <span className="capitalize">{app.interview.mode}</span>
          </div>

          <div className="flex items-center gap-2 text-blue-700 font-medium">
            <Clock className="h-4 w-4" />
            In {remainingDays <= 0 ? "0" : remainingDays} day
            {remainingDays !== 1 ? "s" : ""}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm">{app.description}</p>
        </CardContent>
      </Card>

      <AIPrepGate app={app} />
    </div>
  );
}
