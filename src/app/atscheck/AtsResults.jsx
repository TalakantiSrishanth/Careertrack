"use client";
import React from "react";

const AtsResults = ({ analysis }) => {
  return (
    <div className="space-y-8">
      <div
        className={`p-6 rounded-xl text-center border ${
          analysis.match_score >= 80
            ? "bg-green-50 border-green-200"
            : analysis.match_score >= 60
            ? "bg-yellow-50 border-yellow-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="text-5xl font-bold mb-2">
          {analysis.match_score}%
        </div>
        <div className="text-sm text-gray-600">
          {analysis.analysis_type === "internship" ? "🎓 Internship" : "💼 Job"}{" "}
          Readiness Score
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border">
          <h3 className="font-semibold text-green-700 mb-3">
            Strengths ({analysis.strengths.length})
          </h3>
          <ul className="space-y-2 text-sm">
            {analysis.strengths.map((strength, i) => (
              <li key={i} className="flex items-start">
                <span className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <h3 className="font-semibold text-amber-700 mb-3">
            Weaknesses ({analysis.weaknesses.length})
          </h3>
          <ul className="space-y-2 text-sm">
            {analysis.weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start">
                <span className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-3"></span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-4">
          Recommendations to Improve
        </h3>
        <ol className="space-y-3 text-sm">
          {analysis.recommendations.map((rec, i) => (
            <li key={i} className="flex">
              <span className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3">
                {i + 1}
              </span>
              {rec}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AtsResults;
