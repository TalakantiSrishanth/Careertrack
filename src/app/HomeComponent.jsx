import Link from "next/link";
import { getQuickStats } from "./utils/Homepage.helpers";
import UpcomingInterviews from "./components/UpcomingInterviews";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, CalendarCheck, Handshake, XCircle } from "lucide-react";

export default function HomeComponent({ data }) {
  const QuickStatsData = getQuickStats(data);

  return (
    <div className="min-h-full bg-gray-100 p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Application Summary</h1>
          <p className="text-sm text-gray-500">Overview of your job search progress</p>
        </div>

        <QuickStatsCard stats={QuickStatsData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Status-wise breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatusCard
              href="/applications/applied"
              label="Applied"
              value={QuickStatsData.applied}
              icon={<Briefcase className="h-6 w-6 text-blue-600" />}
            />

            <StatusCard
              href="/applications/interview"
              label="Interviews"
              value={QuickStatsData.interview}
              icon={<CalendarCheck className="h-6 w-6 text-purple-600" />}
            />

            <StatusCard
              href="/applications/offer"
              label="Offers"
              value={QuickStatsData.offer}
              icon={<Handshake className="h-6 w-6 text-green-600" />}
            />

            <StatusCard
              href="/applications/rejected"
              label="Rejected"
              value={QuickStatsData.rejected}
              icon={<XCircle className="h-6 w-6 text-red-600" />}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>Next scheduled interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <UpcomingInterviews data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

function QuickStatsCard({ stats }) {
  return (
    <Card className="w-full md:w-64">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>High-level overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Total</span><span>{stats.Total ?? 0}</span></div>
        <div className="flex justify-between"><span>Applied</span><span>{stats.applied ?? 0}</span></div>
        <div className="flex justify-between"><span>Interviews</span><span>{stats.interview ?? 0}</span></div>
        <div className="flex justify-between"><span>Offers</span><span>{stats.offer ?? 0}</span></div>
        <div className="flex justify-between"><span>Rejected</span><span>{stats.rejected ?? 0}</span></div>
      </CardContent>
    </Card>
  );
}

function StatusCard({ href, label, value, icon }) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer hover:bg-gray-50 transition shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          {icon}
          <CardTitle className="text-sm text-gray-500">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{value ?? 0}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
