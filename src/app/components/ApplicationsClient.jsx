"use client";
import dynamic from "next/dynamic";
const ApplicationsHome = dynamic(
  () => import("./ApplicationsHome"),
  { ssr: false }
);

export default function ApplicationsClient({ data }) {
  return <ApplicationsHome data={data} />;
}
