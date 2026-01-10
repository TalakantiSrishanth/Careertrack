"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApplicationCard from "../../components/ApplicationCard";

const OfferHelper = ({ data }) => {
  const [applications, setApplications] = useState(data);

  const offerData = applications.filter((item) => item.status === "offer");

  const handleDecision = async (id, decision) => {
    try {
      await axios.patch(`/api/applications/${id}`, {
        offer: { decision }
      });

      toast.success(
        decision === "accepted"
          ? "Offer accepted!"
          : "Offer rejected."
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, offer: { ...app.offer, decision } }
            : app
        )
      );
    } catch (err) {
      toast.error("Failed to update decision");
    }
  };

  if (offerData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-xl border shadow-sm m-4">
        No offers yet
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-3 bg-gray-100 min-h-full items-start">
      {offerData.map((app) => (
        <ApplicationCard
          key={app._id}
          company={app.company}
          title={app.title}
          status="offer"
          statusText="Offer received"
          detailText={`Decision: ${app.offer.decision}`}
        >
          {app.offer.decision === "pending" && (
            <div className="flex gap-2 w-full">
              <button
                onClick={() => handleDecision(app._id, "accepted")}
                className="flex-1 bg-green-600 text-white text-sm py-2 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => handleDecision(app._id, "rejected")}
                className="flex-1 border border-red-500 text-red-500 text-sm py-2 rounded"
              >
                Reject
              </button>
            </div>
          )}

          {app.offer.decision === "accepted" && (
            <p className="text-green-700 text-sm font-semibold">✔ Offer accepted</p>
          )}

          {app.offer.decision === "rejected" && (
            <p className="text-red-700 text-sm font-semibold">❌ Offer rejected</p>
          )}
        </ApplicationCard>
      ))}
    </div>
  );
};

export default OfferHelper;
