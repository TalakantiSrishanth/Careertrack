"use client";

import { useState } from "react";
import ApplicationCard from "../../components/ApplicationCard";

const OfferHelper = ({data}) => {
    const [applications, setApplications] = useState(data);
    const offerData = applications.filter(
        (item) => item.status === "offer"
    );

    const handleDecision = (id, decision) => {
        setApplications((prev) =>
            prev.map((app) =>(
                app._id === id
                    ? {
                        ...app,
                        offer: {
                            ...app.offer,
                            decision,
                        },
                    }
                    : app)
            )
        );
    };

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 sm:gap-2 gap-1 p-3 bg-gray-100 min-h-full items-start">
            {offerData.map((app) => (
                <ApplicationCard
                    key={app._id}
                    company={app.company}
                    title={app.title}
                    statusText="Offer received"
                    detailText={
                        app.offer.decision !== "pending"
                            ? `Decision: ${app.offer.decision}`
                            : null
                    }
                >
                    {app.offer.decision === "pending" ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleDecision(app._id, "accepted")}
                                className="flex-1 bg-green-600 text-white text-sm py-2 rounded-md hover:bg-green-700 transition"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => handleDecision(app._id, "rejected")}
                                className="flex-1 border border-red-500 text-red-500 text-sm py-2 rounded-md hover:bg-red-50 transition"
                            >
                                Reject
                            </button>
                        </div>
                    ) : (
                        <p className="text-sm font-medium text-gray-700">
                            {app.offer.decision === "accepted"
                                ? "✅ Offer accepted"
                                : "❌ Offer rejected"}
                        </p>
                    )}
                </ApplicationCard>
            ))}
        </div>
    );
};

export default OfferHelper;
