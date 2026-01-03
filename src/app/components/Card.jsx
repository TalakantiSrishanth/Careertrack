"use client";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ app, dragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: app._id,
    data: { status: app.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-white shadow-sm ${
        dragging ? "opacity-80" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab px-3 py-2 border-b text-xs text-gray-500 bg-gray-50 rounded-t-lg"
      >
        ⠿ Drag
      </div>
      <Link href={`/applications/${app._id}`}>
        <div className="p-4 space-y-1 cursor-pointer hover:bg-gray-50 transition rounded-b-lg">
          <h3 className="text-sm font-semibold text-gray-900">
            {app.company}
          </h3>
          <p className="text-xs text-gray-600">
            {app.title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
