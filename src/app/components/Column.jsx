import { useDroppable } from "@dnd-kit/core";

function Column({ status, title, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border transition-colors ${
        isOver ? "bg-blue-50 border-blue-300" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="px-4 py-3 border-b bg-white rounded-t-2xl sticky top-0 z-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600 text-center">
          {title}
        </h2>
      </div>

      <div className="p-3 space-y-3 min-h-30">
        {children}
      </div>
    </div>
  );
}

export default Column;
