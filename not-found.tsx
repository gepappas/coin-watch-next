import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
      <h1 className="font-mono text-6xl font-bold text-primary">404</h1>
      <p className="font-mono text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="font-mono text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
