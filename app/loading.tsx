import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper text-espresso">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-14 w-44">
          <Image src="/images/logo.png" alt="café de A" fill className="object-contain" />
        </div>
        <p className="font-tempus text-sm text-espresso/70">Loading</p>
      </div>
    </div>
  )
}
