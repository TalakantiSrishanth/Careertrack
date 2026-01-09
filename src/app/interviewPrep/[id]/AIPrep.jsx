"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
const AIPrep = ({ app }) => {
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
      <div className="p-6 text-center text-gray-500">
        ⏳ Loading personalized AI insights...
      </div>
    );

  if (!aiData)
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load AI suggestions.
      </p>
    );

  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-xl border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          AI Interview Preparation Guide
        </h1>
        <p className="text-sm text-gray-500">
          Tailored insights for {app.company} — {app.title}
        </p>
      </div>
      <section>
        <h2 className="text-lg font-semibold text-blue-700 mb-3">
          🔍 Likely Focus Areas
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {aiData?.focusAreas?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-green-700 mb-3">
          📚 AI-curated Resources
        </h2>
        <ul className="space-y-3">
          {aiData?.resources?.map((item, idx) => (
            <li
              key={idx}
              className="bg-white border p-3 rounded-lg hover:shadow-sm transition"
            >
              <Link
                href={item.url}
                target="_blank"
                className="text-blue-600 hover:underline font-medium"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            🏢 Company Culture
          </h3>
          <p className="text-gray-600 text-sm">{aiData?.companyInsights?.culture}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            🎙 Interview Style
          </h3>
          <p className="text-gray-600 text-sm">
            {aiData?.companyInsights?.interviewStyle}
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          ⚠️ Tips & Things to Watch Out For
        </h2>
        <ul className="space-y-2">
          {aiData?.warnings?.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3"></span>
              <p className="text-sm text-gray-700">{item}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AIPrep;
