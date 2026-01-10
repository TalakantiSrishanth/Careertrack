"use client";
import { useState } from "react";
import AIPrep from "./AIPrep";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AIPrepGate({ app }) {
  const [showAI, setShowAI] = useState(false);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>🎯 AI Preparation Assistant</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!showAI && (
          <Button onClick={() => setShowAI(true)}>
            Generate AI Interview Prep
          </Button>
        )}

        {showAI && (
          <div className="mt-2">
            <AIPrep app={app} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
