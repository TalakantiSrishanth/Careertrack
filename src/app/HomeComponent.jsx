import Link from "next/link";
import { getQuickStats } from "./utils/Homepage.helpers";
import UpcomingInterviews from "./components/UpcomingInterviews";

export default function HomeComponent({data}) {
  const QuickStatsData = getQuickStats(data);

  return (
    <div className="min-h-full bg-gray-100 p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your Application Summary
          </h1>
          <p className="text-sm text-gray-500">
            Overview of your job search progress
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-5 w-full md:w-65">
          <h2 className="text-lg font-semibold mb-3">Quick Stats</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Total</span>
              <span className="font-medium">{QuickStatsData?.Total ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Applied</span>
              <span>{QuickStatsData?.applied ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Interviews</span>
              <span>{QuickStatsData?.interview ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Offers</span>
              <span>{QuickStatsData?.offer ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Rejected</span>
              <span>{QuickStatsData?.rejected ?? 0}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/applications/applied"
            className="rounded-xl border p-4 hover:bg-gray-50 transition"
          >
            <p className="text-sm text-gray-500">Applied</p>
            <p className="text-2xl font-bold">
              {QuickStatsData?.applied ?? 0}
            </p>
          </Link>

          <Link
            href="/applications/interview"
            className="rounded-xl border p-4 hover:bg-gray-50 transition"
          >
            <p className="text-sm text-gray-500">Interviews</p>
            <p className="text-2xl font-bold">
              {QuickStatsData?.interview ?? 0}
            </p>
          </Link>

          <Link
            href="/applications/offer"
            className="rounded-xl border p-4 hover:bg-gray-50 transition"
          >
            <p className="text-sm text-gray-500">Offers</p>
            <p className="text-2xl font-bold">
              {QuickStatsData?.offer ?? 0}
            </p>
          </Link>

          <Link
            href="/applications/rejected"
            className="rounded-xl border p-4 hover:bg-gray-50 transition"
          >
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold">
              {QuickStatsData?.rejected ?? 0}
            </p>
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
        <UpcomingInterviews data={data} />
      </div>

    </div>
  );
}
