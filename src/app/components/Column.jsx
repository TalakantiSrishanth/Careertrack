import { useDroppable } from "@dnd-kit/core";

function Column({ status, title, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status },
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col rounded-xl border bg-gray-50
        transition-colors
        ${isOver ? "bg-blue-50 border-blue-300" : "border-gray-200"}
      `}
    >
      <div className="px-4 py-3 border-b bg-white rounded-t-xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600 text-center">
          {title}
        </h2>
      </div>
      <div className="p-3 space-y-3 min-h-35">
        {children}
      </div>
    </div>
  );
}

export default Column;
