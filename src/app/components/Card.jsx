"use client";
import Link from 'next/link'
import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
const Card = ({ app }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: app._id, data: {
      status: app.status,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
  <div ref={setNodeRef} style={style} className="mb-4 border rounded">
  <div
    {...attributes}
    {...listeners}
    className="cursor-grab bg-gray-100 p-2 text-sm"
  >
    ⠿ Drag
  </div>
  <Link href={`/applications/${app._id}`}>
    <div className="p-4 cursor-pointer">
      <h2 className="text-xl">
        {app.company} – {app.title}
      </h2>
    </div>
  </Link>

</div>

  )
}

export default Card
