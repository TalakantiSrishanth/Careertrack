"use client";
import axios from "axios";
import React, { useState } from "react";
import AtsResults from "./AtsResults";

const Page = () => {
  const [jd, setJd] = useState("");
  const [isWordLimitExceeded, setIsWordLimitExceeded] = useState(false);
  const [resumetext, setResumeText] = useState("");
  const [atsdata, setAtsData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleJd = (e) => {
    const value = e.target.value;
    setJd(value);
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    setIsWordLimitExceeded(wordCount > 400);
  };

  const handleAnalyze = async () => {
    if (!resumetext.trim()) {
      alert("Paste resume text first");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/ats", {
        resumeText: resumetext,
        jobDescription: jd,
        type: "internship",
      });
      setAtsData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            ATS Resume Checker
          </h1>
          <p className="text-sm text-gray-500">
            Check how well your resume matches a job description
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
            <h2 className="font-semibold text-sm">Job Description</h2>
            <textarea
              placeholder="Paste job description here…"
              onChange={handleJd}
              value={jd}
              rows={10}
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isWordLimitExceeded && (
              <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 p-2 rounded">
                Long job descriptions may reduce ATS accuracy.
                Consider removing legal or policy sections.
              </p>
            )}
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
            <h2 className="font-semibold text-sm">Resume Text</h2>
            <textarea
              placeholder="Paste your resume text here…"
              onChange={(e) => setResumeText(e.target.value)}
              value={resumetext}
              rows={10}
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Analyze Resume"}
          </button>
        </div>
        {Object.keys(atsdata).length > 0 && (
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <AtsResults analysis={atsdata} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
