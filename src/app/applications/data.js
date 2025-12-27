const data = [
  {
    _id: "app_001",
    userId: "user_001",
    company: "Google",
    title: "Software Engineer Intern",
    description: "Technical interview scheduled.",
    status: "interview",
    fromStatus: null,
    interview: {
      date: new Date("2025-12-24T23:00:00"),
      round: "Technical",
      mode: "Online",
      notes: ""
    },
    appliedAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-17")
  },
  {
    _id: "app_002",
    userId: "user_001",
    company: "Amazon",
    title: "SDE I",
    description: "Rejected after online assessment.",
    status: "rejected",
    fromStatus: "applied",
    appliedAt: new Date("2025-11-28"),
    updatedAt: new Date("2025-12-02")
  },
  {
    _id: "app_003",
    userId: "user_001",
    company: "Microsoft",
    title: "Program Manager",
    description: "Interview feedback was mixed.",
    status: "rejected",
    fromStatus: "interview",
    appliedAt: new Date("2025-11-28"),
    updatedAt: new Date("2025-09-20")
  },
  {
    _id: "app_004",
    userId: "user_001",
    company: "Stripe",
    title: "Backend Engineer",
    description: "Offer received. Negotiation pending.",
    status: "offer",
    fromStatus: "interview",
    offer: {
      decision: "pending", 
      decidedAt: null,
      notes: ""
    },
    appliedAt: new Date("2025-06-05"),
    updatedAt: new Date("2025-06-18")
  },
  {
    _id: "app_005",
    userId: "user_001",
    company: "Netflix",
    title: "UI Designer",
    description: "Resume under review.",
    status: "applied",
    fromStatus: null,
    appliedAt: new Date("2025-12-18"),
    updatedAt: new Date("2025-12-18")
  },
  {
    _id: "app_006",
    userId: "user_001",
    company: "Meta",
    title: "Product Manager",
    description: "Rejected during resume screening.",
    status: "rejected",
    fromStatus: "applied",
    appliedAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-22")
  },
  {
    _id: "app_007",
    userId: "user_001",
    company: "Tesla",
    title: "Autopilot Engineer",
    description: "Onsite interview next week.",
    status: "interview",
    fromStatus: null,
    interview: {
      date: new Date("2025-12-19T14:00:00"),
      round: "Onsite",
      mode: "Onsite",
      notes: "System design + behavioral rounds"
    },
    appliedAt: new Date("2025-12-05"),
    updatedAt: new Date("2025-12-12")
  },
  {
    _id: "app_008",
    userId: "user_001",
    company: "Startup XYZ",
    title: "Fullstack Developer",
    description: "Early-stage startup, first call pending.",
    status: "applied",
    fromStatus: null,
    appliedAt: new Date("2025-12-20"),
    updatedAt: new Date("2025-12-20")
  }
];

export default data;
