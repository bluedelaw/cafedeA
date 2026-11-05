"use client"

import Link from "next/link"
import Image from "next/image"
import FeaturedSpecials from "@/components/FeaturedSpecials"

const plates = [
  { src: "/images/Home/plates/fried-rice.jpg", name: "Salted fish fried rice", zh: "鹹魚炒飯", href: "/menu" },
  { src: "/images/Home/plates/beef-brisket-mein.jpg", name: "Beef brisket noodles", zh: "牛腩撈麵", href: "/menu" },
  { src: "/images/Home/plates/baked-chicken.jpg", name: "Baked chicken", zh: "白汁焗雞", href: "/menu" },
]

const roast = [
  { zh: "明爐燒鴨", en: "Roast duck" },
  { zh: "蜜汁叉燒", en: "Char siu" },
  { zh: "脆皮燒肉", en: "Crispy pork belly" },
  { zh: "玫瑰豉油雞", en: "Soy sauce chicken" },
]

export default function Home() {
  return (
    <div className="bg-[#f2ead9] text-[#1c1410]">
      <section className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-end px-6 pb-12 pt-28 sm:px-10 lg:px-14 lg:pb-16">
          <p className="font-chinese text-sm text-[#c41e3a]">油尖旺冰室</p>
          <h1 className="mt-2 font-tempus text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            café de A
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-snug">
            Hong Kong café in Ironwood Plaza.
            <br />
            8:00 AM – 10:00 PM, every day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href="/menu" className="bg-[#c41e3a] px-6 py-2.5 text-white hover:bg-[#a31830]">
              Menu
            </Link>
            <Link href="/order" className="border border-[#1c1410] px-6 py-2.5 hover:bg-[#1c1410] hover:text-[#f2ead9]">
              Order
            </Link>
            <Link href="/reservation" className="underline underline-offset-4">
              Reserve
            </Link>
          </div>
        </div>
        <div className="relative h-[52vh] w-full lg:h-auto lg:min-h-[calc(100svh-5.5rem)]">
          <Image
            src="/images/Home/cafedea.jpg"
            alt="Inside café de A, Ironwood Plaza"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="border-b border-[#1c1410]/15">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {plates.map((plate) => (
            <Link
              key={plate.name}
              href={plate.href}
              className="group relative block h-64 overflow-hidden sm:h-80 lg:h-[26rem]"
            >
              <Image
                src={plate.src}
                alt={plate.name}
                fill
                className="h-full w-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15" />
              <span className="absolute bottom-4 left-4 text-white">
                <span className="block font-chinese text-lg">{plate.zh}</span>
                <span className="text-sm opacity-90">{plate.name}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedSpecials variant="showcase" />

      <section className="border-y border-[#1c1410]/15">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12">
          <div className="relative min-h-[22rem] lg:col-span-7 lg:min-h-[32rem]">
            <Image
              src="/images/Home/bbq2.webp"
              alt="Cantonese roast at café de A"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="flex flex-col justify-center border-t border-[#1c1410]/15 px-6 py-12 sm:px-10 lg:col-span-5 lg:border-l lg:border-t-0">
            <p className="font-chinese text-sm text-[#c41e3a]">明爐燒味</p>
            <h2 className="mt-1 font-tempus text-3xl sm:text-4xl">Siu mei, roasted daily</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#1c1410]/80">
              Duck, char siu, crispy pork, and soy chicken — rice plates, combos, or by the pound.
            </p>
            <ul className="mt-8 divide-y divide-[#1c1410]/15 border-y border-[#1c1410]/15">
              {roast.map((item) => (
                <li key={item.en} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-chinese">{item.zh}</span>
                  <span className="text-sm text-[#1c1410]/70">{item.en}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
              <Link href="/menu?section=BBQ" className="text-[#c41e3a] underline underline-offset-4">
                BBQ menu
              </Link>
              <Link href="/order" className="underline underline-offset-4">
                Order takeout
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-0 md:grid-cols-2">
        <div className="border-b border-[#1c1410]/15 px-6 py-14 sm:px-10 md:border-r">
          <p className="font-chinese text-sm text-[#c41e3a]">餐廳位置</p>
          <h2 className="mt-1 font-tempus text-3xl">Ironwood Plaza</h2>
          <address className="mt-5 not-italic text-[15px] leading-7">
            #3050 – 11666 Steveston Hwy
            <br />
            Richmond, BC V7A 5J3
            <br />
            <a href="tel:6042767800" className="underline underline-offset-4">
              (604) 276-7800
            </a>
            <br />
            Open daily 8:00 AM – 10:00 PM
          </address>
          <Link href="/location" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
            Map and parking
          </Link>
        </div>
        <div className="px-6 py-14 sm:px-10">
          <p className="font-chinese text-sm text-[#c41e3a]">到會 · 訂座</p>
          <h2 className="mt-1 font-tempus text-3xl">Tables and catering</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#1c1410]/80">
            Book 1–6 online. Larger groups and party trays: call or send a note.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold">
            <Link href="/reservation" className="text-[#c41e3a] underline underline-offset-4">
              Reserve
            </Link>
            <Link href="/waitlist" className="underline underline-offset-4">
              Waitlist
            </Link>
            <Link href="/contact" className="underline underline-offset-4">
              Catering
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
