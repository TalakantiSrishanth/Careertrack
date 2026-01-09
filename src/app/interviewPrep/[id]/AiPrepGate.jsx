"use client";
import { useState } from "react";
import AIPrep from "./AIPrep";

export default function AIPrepGate({ app }) {
  const [showAI, setShowAI] = useState(false);

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
      <h2 className="font-semibold text-xl text-gray-800">
        🎯 AI Preparation Assistant
      </h2>

      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Generate AI Interview Prep
        </button>
      )}

      {showAI && (
        <div className="mt-4">
          <AIPrep app={app} />
        </div>
      )}
    </section>
  );
}
