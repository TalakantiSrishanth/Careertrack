"use client";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

const Card = ({ app, dragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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
      className={`rounded-xl border bg-white shadow-sm transition-all ${
        dragging ? "opacity-70 scale-[1.02]" : "hover:shadow-md"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab flex items-center gap-2 px-3 py-2 border-b bg-gray-50 text-xs text-gray-500 rounded-t-xl"
      >
        <GripVertical size={14} />
        Drag
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{app.company}</h3>

          <Link
            href={`/applications/${app._id}/delete`}
            className="text-gray-400 hover:text-red-600 transition"
          >
            <Trash2 size={16} />
          </Link>
        </div>

        <Link href={`/applications/${app._id}`}>
          <p className="text-xs text-gray-600 hover:underline cursor-pointer">
            {app.title}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
