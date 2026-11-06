"use client"

import Link from "next/link"
import Image from "next/image"
import FeaturedSpecials from "@/components/FeaturedSpecials"

const plates: Array<{
  src: string
  name: string
  zh: string
  href: string
  crop: string
}> = [
  {
    src: "/images/Home/plates/fried-rice.jpg",
    name: "Salted Fish and Diced Chicken Fried Rice",
    zh: "鹹魚雞粒炒飯",
    href: "/menu",
    // crop: object-[x%_y%] = pan (lower y = up). scale-[n] = zoom.
    crop: "object-[52%_50%] origin-[52%_32%] scale-[1]",
  },
  {
    src: "/images/Home/plates/beef-brisket-mein.jpg",
    name: "Beef Brisket & Vegetable Chow Mein",
    zh: "牛腩炒麵",
    href: "/menu",
    crop: "object-[50%_48%] origin-[50%_48%] scale-[1]",
  },
  {
    src: "/images/Home/plates/baked-chicken.jpg",
    name: "Baked Chicken Rice w/Cream Sauce & Cheese",
    zh: "芝士白汁焗雞飯",
    href: "/menu",
    crop: "object-[48%_55%] origin-[48%_46%] scale-[1.15]",
  },
  {
    src: "/images/Home/plates/fried-vermicelli.jpg",
    name: "Pan Fried Vermicelli in Singapore Style",
    zh: "星洲炒米",
    href: "/menu",
    // crop: object-[x%_y%] = pan (lower y = up). scale-[n] = zoom.
    crop: "object-[50%_47%] origin-[50%_34%] scale-[1]",
  },
  {
    src: "/images/Home/plates/sweet-sour-pork.jpg",
    name: "Sweet & Sour Boneless Pork with Pineapple",
    zh: "菠蘿咕嚕肉",
    href: "/menu",
    crop: "object-[50%_62%] origin-[50%_46%] scale-[1]",
  },
  {
    src: "/images/Home/plates/bbq-rice.jpg",
    name: "Two Kinds of B.B.Q on Rice",
    zh: "燒味孖寶飯",
    href: "/menu",
    crop: "object-[46%_40%] origin-[46%_40%] scale-[1]",
  },
]

const roast = [
  { zh: "明爐燒鴨", en: "Roast duck" },
  { zh: "蜜汁叉燒", en: "Char siu" },
  { zh: "脆皮燒肉", en: "Crispy pork belly" },
  { zh: "玫瑰豉油雞", en: "Soy sauce chicken" },
]

export default function Home() {
  return (
    <div className="bg-paper text-espresso">
      <section className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-end px-6 pb-12 pt-28 sm:px-10 lg:px-14 lg:pb-16">
          <p className="font-chinese text-sm text-burgundy">油尖旺冰室</p>
          <h1 className="mt-2 font-tempus text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">café de A</h1>
          <p className="mt-5 max-w-sm text-lg leading-snug">
            Hong Kong café in Ironwood Plaza.
            <br />
            8:00 AM – 10:00 PM, every day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <Link
              href="/menu"
              className="inline-flex h-12 items-center bg-burgundy px-6 text-white hover:bg-[#a31830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Menu
            </Link>
            <Link
              href="/order"
              className="inline-flex h-12 items-center border border-espresso px-6 hover:bg-espresso hover:text-paper"
            >
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
            className="object-cover object-[center_40%]"
            priority
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="border-b border-espresso/15">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plates.map((plate) => (
            <Link
              key={plate.name}
              href={plate.href}
              className="group relative block h-64 overflow-hidden sm:h-72 lg:h-[22rem]"
            >
              <Image
                src={plate.src}
                alt={`${plate.name} (${plate.zh})`}
                fill
                className={`h-full w-full object-cover ${plate.crop} motion-reduce:transform-none`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15" />
              <span className="absolute bottom-4 left-4 text-white">
                {plate.zh ? <span className="block font-chinese text-lg">{plate.zh}</span> : null}
                <span className="text-sm opacity-90">{plate.name}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedSpecials variant="showcase" />

      <section className="border-y border-espresso/15">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12">
          <div className="relative min-h-[22rem] lg:col-span-7 lg:min-h-[32rem]">
            <Image
              src="/images/Home/roast-duck.jpg"
              alt="Roast ducks hanging in the café de A kitchen"
              fill
              className="object-cover object-[center_28%]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          <div className="flex flex-col justify-center border-t border-espresso/15 px-6 py-12 sm:px-10 lg:col-span-5 lg:border-l lg:border-t-0">
            <p className="font-chinese text-sm text-burgundy">明爐燒味</p>
            <h2 className="mt-1 font-tempus text-3xl sm:text-4xl">Siu mei, roasted daily</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-espresso/80">
              Duck, char siu, crispy pork, and soy chicken — rice plates, combos, or by the pound.
            </p>
            <ul className="mt-8 divide-y divide-espresso/15 border-y border-espresso/15">
              {roast.map((item) => (
                <li key={item.en} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-chinese">{item.zh}</span>
                  <span className="text-sm text-espresso/70">{item.en}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
              <Link href="/menu?section=BBQ" className="text-burgundy underline underline-offset-4">
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
        <div className="border-b border-espresso/15 px-6 py-14 sm:px-10 md:border-r">
          <p className="font-chinese text-sm text-burgundy">餐廳位置</p>
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
          <p className="font-chinese text-sm text-burgundy">到會 · 訂座</p>
          <h2 className="mt-1 font-tempus text-3xl">Tables and catering</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-espresso/80">
            Book 1–6 online. Larger groups and party trays: call or send a note.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold">
            <Link href="/reservation" className="text-burgundy underline underline-offset-4">
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
