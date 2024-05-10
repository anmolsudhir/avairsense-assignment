import TodoBody from "@/components/TodoBody";
import TodoTitle from "@/components/TodoTitle";

export default function Todo() {
  return (
    <div className="w-96 flex flex-col items-center justify-center gap-4">
      <TodoTitle />
      <TodoBody />
    </div>
  );
}
