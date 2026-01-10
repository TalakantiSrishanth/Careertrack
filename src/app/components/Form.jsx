"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Form = ({ app }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    company: app?.company ?? "",
    title: app?.title ?? "",
    description: app?.description ?? "",
    status: app?.status ?? "applied",
    interview: app?.interview ?? null,
    offer: app?.offer ?? null,
  });

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
                mode: "Online",
                notes: "",
              },
          };
        }
        return { ...prev, status: value, interview: null, offer: null };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleInterviewChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      interview: { ...prev.interview, [name]: value },
    }));
  };

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      offer: { ...prev.offer, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      interview: form.interview
        ? { ...form.interview, date: new Date(form.interview.date || Date.now()) }
        : undefined,
      offer: form.offer ? { ...form.offer, decidedAt: new Date() } : undefined,
    };

    try {
      if (app?._id) {
        await axios.patch(`/api/applications/${app._id}`, payload);
        toast.success("Updated Successfully");
      } else {
        await axios.post(`/api/applications`, payload);
        toast.success("Saved successfully");
      }
      router.push("/applications");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6">
      <CardHeader>
        <CardTitle>{app ? "Edit Application" : "Add Application"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm font-medium">Company</label>
            <Input name="company" value={form.company} onChange={handleChange} required />
          </div>

          <div>
            <label className="text-sm font-medium">Job Title</label>
            <Input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea name="description" value={form.description} onChange={handleChange} rows={3} />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={form.status} onValueChange={(v) => handleChange({ target: { name: "status", value: v } })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.status === "interview" && (
            <div className="space-y-3 border-t pt-4">
              <h3 className="text-sm font-semibold">Interview Details</h3>

              <div>
                <label className="text-sm">Interview Date</label>
                <Input
                  type="datetime-local"
                  name="date"
                  value={form.interview?.date ?? ""}
                  onChange={handleInterviewChange}
                />
              </div>

              <div>
                <label className="text-sm">Round</label>
                <Input
                  name="round"
                  value={form.interview?.round ?? ""}
                  onChange={handleInterviewChange}
                  placeholder="Technical / HR / System Design"
                />
              </div>

              <div>
                <label className="text-sm">Mode</label>
                <select
                  name="mode"
                  value={form.interview?.mode}
                  onChange={handleInterviewChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Online">Online</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Notes</label>
                <Textarea
                  name="notes"
                  value={form.interview?.notes ?? ""}
                  onChange={handleInterviewChange}
                  rows={2}
                />
              </div>
            </div>
          )}

          {form.status === "offer" && (
            <div className="space-y-3 border-t pt-4">
              <h3 className="text-sm font-semibold">Offer Details</h3>

              <div>
                <label className="text-sm">Decision</label>
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
                <label className="text-sm">Notes</label>
                <Textarea
                  name="notes"
                  value={form.offer?.notes ?? ""}
                  onChange={handleOfferChange}
                  rows={2}
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            Save
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
