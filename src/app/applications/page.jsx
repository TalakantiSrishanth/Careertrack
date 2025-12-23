"use client";
import React, { useState } from 'react'
import data from './data';
import Card from '../components/Card';
import Column from "../components/Column"
import { arrayMove } from '@dnd-kit/sortable';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DragOverlay } from '@dnd-kit/core';
import Image from 'next/image';
import Link from 'next/link';
const applications = () => {
  const status = ["applied", "rejected", "interview", "offer"];
  const [activeCard, setActiveCard] = useState(null);
  const groupdata = () => status.reduce((acc, s) => {
    acc[s] = data.filter((item) => item.status == s);
    return acc;
  }, {})
  const [columns, setColumns] = useState(() => groupdata());
  console.log(columns);
  const handleDragEnd = ({ active, over }) => {
    setActiveCard(null);
    if (!over) return;
    const fromStatus = active.data.current?.status;
    const toStatus = over.data.current?.status;
    if (!fromStatus || !toStatus) return;
    setColumns(prev => {
      if (fromStatus === toStatus) {
        const oldIndex = prev[fromStatus].findIndex(
          item => item._id === active.id
        );
        const newIndex = prev[toStatus].findIndex(
          item => item._id === over.id
        );

        return {
          ...prev,
          [fromStatus]: arrayMove(prev[fromStatus], oldIndex, newIndex),
        };
      }
      const movedItem = prev[fromStatus].find(
        item => item._id === active.id
      );
      return {
        ...prev,
        [fromStatus]: prev[fromStatus].filter(
          item => item._id !== active.id
        ),
        [toStatus]: [
          ...prev[toStatus],
          { ...movedItem, status: toStatus },
        ],
      };
    });
  };
  const handleDragStart = ({ active }) => {
    setActiveCard(active);
  };
  const findCardById = (id, status) => {
    return columns[status]?.find(item => item._id == id);
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center font-bold text-2xl">
          Applications
        </div>

        <Link href="/applications/add">
          <button className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition">
            <Image
              src="/addButton.svg"
              width={34}
              height={34}
              alt="Add Button"
            />
            <span className="text-sm font-medium">
              Add Application
            </span>
          </button>
        </Link>
      </div>


      <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className='grid grid-cols-2 gap-2'>
          <Column status="applied" title="Applied">
            <SortableContext
              items={columns.applied.map(app => app._id)}
              strategy={verticalListSortingStrategy}
            >
              {columns.applied.map(app => (
                <Card key={app._id} app={app} />
              ))}
            </SortableContext>
          </Column>

          <Column status="rejected" title="Rejected">
            <SortableContext
              items={columns.rejected.map(app => app._id)}
              strategy={verticalListSortingStrategy}
            >
              {columns.rejected.map(app => (
                <Card key={app._id} app={app} />
              ))}
            </SortableContext>
          </Column>

          <Column status="interview" title="Interview">
            <SortableContext
              items={columns.interview.map(app => app._id)}
              strategy={verticalListSortingStrategy}
            >
              {columns.interview.map(app => (
                <Card key={app._id} app={app} />
              ))}
            </SortableContext>
          </Column>

          <Column status="offer" title="Offer">
            <SortableContext
              items={columns.offer.map(app => app._id)}
              strategy={verticalListSortingStrategy}
            >
              {columns.offer.map(app => (
                <Card key={app._id} app={app} />
              ))}
            </SortableContext>
          </Column>

        </div>
        <DragOverlay dropAnimation={{
          duration: 250,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)"
        }}>
          {activeCard ? (
            <Card app={findCardById(activeCard.id, activeCard.data.current.status)} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default applications;

