"use client";
import React, { useState } from "react";
import Card from "../components/Card";
import Column from "../components/Column";
import { arrayMove } from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const ApplicationsHome = ({ data }) => {
  const status = ["applied", "rejected", "interview", "offer"];
  const [activeCard, setActiveCard] = useState(null);

  const groupdata = () =>
    status.reduce((acc, s) => {
      acc[s] = data.filter((item) => item.status === s);
      return acc;
    }, {});

  const [columns, setColumns] = useState(() => groupdata());

  const UpdateStatus = async (id, toStatus) => {
    try {
      await axios.patch(`/api/applications/${id}`, { status: toStatus });
    } catch (e) {
      console.log("Error occurred", e.message);
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveCard(null);
    if (!over) return;

    const fromStatus = active.data.current?.status;
    const toStatus = over.data.current?.status;
    if (!fromStatus || !toStatus) return;

    setColumns((prev) => {
      if (fromStatus === toStatus) {
        const oldIndex = prev[fromStatus].findIndex(
          (item) => item._id === active.id
        );
        const newIndex = prev[toStatus].findIndex(
          (item) => item._id === over.id
        );

        return {
          ...prev,
          [fromStatus]: arrayMove(prev[fromStatus], oldIndex, newIndex),
        };
      }

      const movedItem = prev[fromStatus].find(
        (item) => item._id === active.id
      );

      return {
        ...prev,
        [fromStatus]: prev[fromStatus].filter(
          (item) => item._id !== active.id
        ),
        [toStatus]: [...prev[toStatus], { ...movedItem, status: toStatus }],
      };
    });

    UpdateStatus(active.id, toStatus);
  };

  const handleDragStart = ({ active }) => {
    setActiveCard(active);
  };

  const findCardById = (id, status) => {
    return columns[status]?.find((item) => item._id === id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Applications
        </h1>

        <Link href="/applications/add">
          <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 transition">
            <Image src="/addButton.svg" width={18} height={18} alt="Add" />
            Add Application
          </button>
        </Link>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {status.map((s) => (
            <Column key={s} status={s} title={s.toUpperCase()}>
              <SortableContext
                items={columns[s].map((app) => app._id)}
                strategy={verticalListSortingStrategy}
              >
                {columns[s].map((app) => (
                  <Card key={app._id} app={app} />
                ))}
              </SortableContext>
            </Column>
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <Card
              app={findCardById(
                activeCard.id,
                activeCard.data.current.status
              )}
              dragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ApplicationsHome;
