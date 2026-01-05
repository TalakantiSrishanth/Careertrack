const ATSSchema = {
  description: "ATS analysis of resume against job description",
  type: "object",
  additionalProperties: false,
  properties: {
    match_score: {
      type: "number",
      description: "Overall match score from 0 to 100",
      minimum: 0,
      maximum: 100,
    },
    strengths: {
      type: "array",
      description: "What the resume does well",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "string",
      },
    },
    weaknesses: {
      type: "array",
      description: "Areas needing improvement",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "string",
      },
    },
    recommendations: {
      type: "array",
      description: "Actionable steps to improve score",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "string",
      },
    },
    analysis_type: {
      type: "string",
      description: "Type of analysis performed",
      enum: ["internship", "fulltime", "general"],
    },
  },
  required: [
    "match_score",
    "strengths",
    "weaknesses",
    "recommendations",
    "analysis_type",
  ],
};

export default ATSSchema;
