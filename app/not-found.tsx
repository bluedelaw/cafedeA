import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-espresso">
      <div className="mx-auto max-w-md text-center">
        <div className="relative mx-auto mb-8 h-14 w-44">
          <Image src="/images/logo.png" alt="café de A" fill className="object-contain" />
        </div>
        <h1 className="font-tempus text-5xl">404</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-espresso/75">That page is not on this site.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-semibold">
          <Link href="/" className="underline underline-offset-4">
            Home
          </Link>
          <Link href="/menu" className="underline underline-offset-4">
            Menu
          </Link>
          <Link href="/location" className="underline underline-offset-4">
            Location
          </Link>
        </div>
      </div>
    </div>
  )
}
