"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AIPrep({ app }) {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post("/api/interviewprep", {
          companyName: app.company,
          jobTitle: app.title,
        });
        setAiData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [app.company, app.title]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-8 text-gray-500 gap-2">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading personalized AI insights...
      </div>
    );

  if (!aiData)
    return (
      <p className="text-center text-red-500 font-medium py-4">
        Failed to load AI suggestions.
      </p>
    );

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>AI Interview Preparation Guide</CardTitle>
        <CardDescription>
          Tailored insights for {app.company} — {app.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">🔍 Likely Focus Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {aiData.focusAreas.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">📚 AI-curated Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiData.resources.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                target="_blank"
                className="block bg-white border p-3 rounded-lg hover:bg-gray-50 hover:shadow-sm transition text-blue-600 font-medium"
              >
                {item.title}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">🏢 Company Culture & 🎙 Interview Style</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Company Culture
              </h3>
              <p className="text-gray-600 text-sm">{aiData.companyInsights.culture}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Interview Style
              </h3>
              <p className="text-gray-600 text-sm">
                {aiData.companyInsights.interviewStyle}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg text-red-600">⚠️ Tips & Things to Watch Out For</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {aiData.warnings.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="h-2 w-2 bg-red-500 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}
