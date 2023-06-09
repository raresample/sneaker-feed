import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-orange-500 py-4 z-10">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-white font-bold text-2xl">sneaker FEED</Link>
      </div>
    </nav>
  );
}
