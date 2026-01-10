"use client";
import axios from "axios";
import React, { useState } from "react";
import AtsResults from "./AtsResults";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

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
    if (!resumetext.trim()) return;

    try {
      setLoading(true);
      const { data } = await axios.post("/api/ats", {
        resumeText: resumetext,
        jobDescription: jd,
        type: "internship",
      });
      setAtsData(data);
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
      const { data } = await axios.post("/api/extract-resume-text", formData);
      setResumeText(data.resumeText);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ATS Resume Checker</h1>
          <p className="text-sm text-gray-500">Analyze how well your resume matches a job description</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold">Job Description</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                placeholder="Paste job description…"
                onChange={handleJd}
                value={jd}
                rows={10}
                className="w-full border rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500"
              />
              {isWordLimitExceeded && (
                <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 p-2 rounded">
                  Long job descriptions may reduce ATS accuracy.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold">Resume</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                placeholder="Paste your resume text…"
                onChange={(e) => setResumeText(e.target.value)}
                value={resumetext}
                rows={7}
                className="w-full border rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="flex flex-col items-center border border-dashed rounded-lg p-4 bg-gray-50 cursor-pointer">
                <UploadCloud className="text-blue-600 mb-2" />
                <span className="text-sm text-blue-600">
                  {uploading ? "Extracting…" : "Upload resume file (PDF / TXT)"}
                </span>
                <input type="file" accept=".pdf,.txt" onChange={handleFileUpload} className="hidden" />
                <p className="text-xs text-gray-400 mt-1">
                  We’ll automatically extract the text
                </p>
              </label>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={loading || uploading}
            className="px-6 py-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <FileText size={18} />
            )}
            <span className="ml-2">
              {loading ? "Analyzing…" : uploading ? "Processing…" : "Analyze Resume"}
            </span>
          </Button>
        </div>

        {Object.keys(atsdata).length > 0 && (
          <Card>
            <CardContent className="p-6">
              <AtsResults analysis={atsdata} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Page;
