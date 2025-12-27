"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Form = ({ app }) => {
    const router = useRouter();
    const [form, setForm] = useState({
        company: app?.company ?? "",
        title: app?.title ?? "",
        desc: app?.description ?? "",
        status: app?.status ?? "",
        interview: app?.interview ?? null,
        offer: app?.offer ?? null
    })
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name === "status") {
                if (value === "offer") {
                    return {
                        ...prev,
                        status: value,
                        offer:
                            prev.offer ?? {
                                decision: "pending",
                                decidedAt: "",
                                notes: "",
                            },
                    };
                }
                if (value === "interview") {
                    return {
                        ...prev,
                        status: value,
                        interview:
                            prev.interview ?? {
                                date: "",
                                round: "",
                                mode: "online",
                                notes: "",
                            },
                    };
                }

                return {
                    ...prev,
                    status: value,
                    interview: null,
                    offer: null
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const handleInterviewChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            interview: {
                ...prev.interview,
                [name]: value,
            },
        }));
    };
    const handleOfferChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            offer: {
                ...prev.offer,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //add logic needed,send the data to backend and add create an api endpoint

        router.push("/applications");

    };
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl space-y-4 bg-gray-100 mx-auto p-6 rounded-xl shadow"
        >
            <h2 className="text-xl font-semibold">
                {app ? "Edit Application" : "Add Application"}
            </h2>
            <div>
                <label className="block text-sm font-medium">Company</label>
                <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            {form.status === "interview" && (
                <div className="border-t pt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-600">
                        Interview Details
                    </h3>
                    <div>
                        <label className="block text-sm">Interview Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={form.interview?.date ?? ""}
                            onChange={handleInterviewChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Round</label>
                        <input
                            type="text"
                            name="round"
                            value={form.interview?.round}
                            onChange={handleInterviewChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Technical / HR / System Design"
                        />
                    </div>

                    <div>
                        <label className="block text-sm">Mode</label>
                        <select
                            name="mode"
                            value={form.interview?.mode}
                            onChange={handleInterviewChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="online">Online</option>
                            <option value="onsite">Onsite</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm">Notes</label>
                        <textarea
                            name="notes"
                            value={form.interview?.notes ?? ""}
                            onChange={handleInterviewChange}
                            className="w-full border rounded px-3 py-2"
                            rows={2}
                        />
                    </div>
                </div>
            )}
            {form.status === "offer" && (
                <div className="border-t pt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-600">
                        Offer Details
                    </h3>
                    <div>
                        <label className="block text-sm">Decision</label>
                        <select
                            name="decision"
                            value={form.offer?.decision}
                            onChange={handleOfferChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="accepted">Accept</option>
                            <option value="rejected">Reject</option>
                            <option value="pending">Not yet decided</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm">Notes</label>
                        <textarea
                            name="notes"
                            value={form.offer?.notes ?? ""}
                            onChange={handleOfferChange}
                            className="w-full border rounded px-3 py-2"
                            rows={2}
                        />
                    </div>
                </div>
            )}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Save
            </button>
        </form>
    );
}

export default Form
