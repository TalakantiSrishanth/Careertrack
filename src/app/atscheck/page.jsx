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
  const [uploading, setUploading] = useState(false);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        "/api/extract-resume-text",
        formData
      );
      setResumeText(data.resumeText);
    } catch {
      alert("Failed to extract resume text");
    } finally {
      setUploading(false);
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
            Analyze how well your resume matches a job description
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
            <h2 className="text-sm font-semibold">Job Description</h2>
            <textarea
              placeholder="Paste job description here…"
              onChange={handleJd}
              value={jd}
              rows={10}
              className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isWordLimitExceeded && (
              <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 p-2 rounded">
                Long job descriptions may reduce ATS accuracy.  
                Remove legal or company policy sections if possible.
              </p>
            )}
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
            <h2 className="text-sm font-semibold">Resume</h2>

            <textarea
              placeholder="Paste your resume text here…"
              onChange={(e) => setResumeText(e.target.value)}
              value={resumetext}
              rows={7}
              className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="border border-dashed rounded-lg p-4 text-center bg-gray-50">
              <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
                {uploading ? "Extracting resume…" : "Upload resume file (PDF / TXT)"}
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400 mt-1">
                We’ll automatically extract the text for you
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Analyzing…"
              : uploading
              ? "Processing file…"
              : "Analyze Resume"}
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
