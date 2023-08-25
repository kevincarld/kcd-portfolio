import Link from "next/link";
import { Button } from "./(components)/ui/button";

export default function NotFoundPage() {
  return (
    <section className="container">
      <div className="grid min-h-[70vh] px-4 place-content-center">
        <div className="text-center">
          <h1 className="text-9xl">404</h1>

          <p className="text-2xl font-bold tracking-tight  sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 ">We can't find that page.</p>

          <Link className="block mt-6" href="/">
            <Button variant="default">Back to homepage</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
