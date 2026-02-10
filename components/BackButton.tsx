import Link from "next/link";

export default function BackButton() {
  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
      >
        ← Back
      </Link>
    </div>
  );
}
