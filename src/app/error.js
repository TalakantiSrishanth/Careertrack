"use client";

export default function Error({ error, reset }) {
  console.error("PAGE ERROR:", error);

  return (
    <div className="w-full flex flex-col items-center mt-10 text-center">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>

      <p className="text-gray-700 mt-3">{error?.message}</p>

      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
