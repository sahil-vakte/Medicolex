import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="container grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <Mark uid="404" className="mx-auto w-28" />
        <h1 className="mt-8 text-4xl">Page not found</h1>
        <p className="mt-3 text-lg text-navy/70">The page you are looking for has moved or no longer exists.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Go to the homepage</Link>
          <Link href="/instruct" className="btn-outline">Instruct an expert</Link>
        </div>
      </div>
    </section>
  );
}
