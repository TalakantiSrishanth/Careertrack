import Link from "next/link";
import data from "./applications/data";
import { getQuickStats } from "./utils/Homepage.helpers";
export default function Home() {
  const QuickStatsData = getQuickStats(data);
  return (
    <div>
      <h1>Your Application Summary</h1>
      <div>
        <h1>Quick Stats</h1>
      </div>
      <div>
        <ul>
          <li>Total: {QuickStatsData?.Total ?? 0}</li>
          <li>Applied:{QuickStatsData?.applied}</li>
          <li>Interviews:{QuickStatsData?.interview}</li>
          <li>Offers:{QuickStatsData?.offer}</li>
          <li>Rejected:{QuickStatsData?.rejected}</li>
        </ul>
      </div>
      <div>
      <h1>Applications</h1>
      <div className="flex flex-col">
        <Link href="/applications/applied">Applied-{QuickStatsData?.applied}</Link>
        <Link href="/applications/interview">Interview-{QuickStatsData?.interview}</Link>
        <Link href="/applications/offer">Offer-{QuickStatsData?.offer}</Link>
        <Link href="/applications/rejected">Rejected-{QuickStatsData?.rejected}</Link>
      </div>
      </div>

    </div>
  );
}
