import { useDroppable } from "@dnd-kit/core";

function Column({ status, title, children }) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { status }
  });

  return (
    <div ref={setNodeRef}>
      <h1 className="text-center text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
export default Column;