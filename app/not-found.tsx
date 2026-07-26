import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950">This page didn&apos;t make the cut</h1>
      <p className="mt-4 max-w-md text-ink-500">
        The page you&apos;re looking for may have been moved, renamed, or never existed. Let&apos;s get you back on
        track.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
