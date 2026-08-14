"use client"

import { useState } from "react"
import { BreakfastMenu } from "@/components/menus/breakfast-menu"
import { LunchMenu } from "@/components/menus/lunch-menu"
import { AfternoonTeaMenu } from "@/components/menus/afternoon-tea-menu"
import { DinnerMenu } from "@/components/menus/dinner-menu"
import { BBQMenu } from "@/components/menus/bbq-menu"

const menuTabs = [
  { id: "breakfast", label: "Breakfast", chinese: "早餐", component: BreakfastMenu },
  { id: "lunch", label: "Lunch", chinese: "午餐", component: LunchMenu },
  { id: "afternoon-tea", label: "Afternoon Tea", chinese: "下午茶", component: AfternoonTeaMenu },
  { id: "dinner", label: "Dinner", chinese: "晚餐", component: DinnerMenu },
  { id: "bbq", label: "Barbecue", chinese: "燒烤", component: BBQMenu },
] as const

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<(typeof menuTabs)[number]["id"]>("breakfast")
  const ActiveMenu = menuTabs.find((tab) => tab.id === activeTab)?.component ?? BreakfastMenu

  return (
    <main className="min-h-screen bg-background pt-16 lg:pt-20">
      <nav className="relative z-10 border-b border-border/70 bg-background px-4 py-3" aria-label="Menu categories">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1">
          {menuTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              {tab.label} <span className="font-normal">{tab.chinese}</span>
            </button>
          ))}
        </div>
      </nav>
      <ActiveMenu />
    </main>
  )
}
