const InterviewPrepSchema = {
  type: "object",
  additionalProperties: false,
  required: ["focusAreas", "resources", "companyInsights", "warnings"],

  properties: {
    focusAreas: {
      type: "array",
      description: "List of key interview focus areas.",
      minItems: 1,
      maxItems: 5,
      items: { type: "string" }
    },

    resources: {
      type: "array",
      description: "List of resource objects with title and URL.",
      minItems: 1,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "url"],
        properties: {
          title: { type: "string" },
          url: { type: "string" }
        }
      }
    },

    companyInsights: {
      type: "object",
      additionalProperties: false,
      required: ["culture", "interviewStyle"],
      properties: {
        culture: { type: "string" },
        interviewStyle: { type: "string" }
      }
    },

    warnings: {
      type: "array",
      description: "List of short warnings.",
      maxItems: 3,
      items: { type: "string" }
    }
  }
};
export default InterviewPrepSchema;
