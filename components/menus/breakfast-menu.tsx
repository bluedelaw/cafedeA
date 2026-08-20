'use client'

import { bilingual, BilingualText, chineseTranslation } from '@/lib/menu-translations'



export function BreakfastMenu() {

  const menuItems = [
    {
      category: 'Breakfast Combo',
      items: [
        {
          id: 'A',
          name: 'Hong Kong Style',
          price: '$12.95',
          description: 'Ham or Luncheon Meat or Bacon or Sausage',
          sides: [
            { name: 'Two Eggs', options: ['Sunny Side-up', 'Over Easy', 'Over Hard', 'Scramble'] },
            { name: 'Toast or Hash Brown or French Toast', options: ['French Toast half (+$1)'] },
          ],
        },
        {
          id: 'B',
          name: 'Omelette',
          price: '$12.95',
          description: 'Cheese, Mushroom, Ham, Shredded Chicken, Sausage (Choice of Two Kinds)',
          sides: [
            { name: 'Toast or Hash Brown or French Toast', options: ['French Toast half (+$1)'] },
          ],
        },
        {
          id: 'C',
          name: 'Healthy',
          price: '$14.95',
          description: 'Pan Fried Pork Chop or Chicken Steak or Cutlet Fish',
          sides: [
            { name: 'Two Eggs', options: ['Sunny Side-up', 'Over Easy', 'Over Hard', 'Scramble'] },
            { name: 'Toast or Hash Brown or French Toast', options: ['French Toast half (+$1)'] },
          ],
        },
        {
          id: 'D',
          name: 'Noodle Soup',
          price: '$13.95',
          description: 'Satay Beef or Shredded Pork with Snow Veg, or Preserved Veg, or Minced Beef or Ham or Dumpling/Wonton or Beef Brisket',
          sides: [
            { name: 'Macaron or Vermicelli or Noodle or Rice Noodle or Instant Noodle (+$1.00)' },
          ],
        },
      ],
    },
    {
      category: 'À La Carte',
      items: [
        {
          id: '2',
          name: 'Noodle Soup',
          price: '$14.95',
          description: 'Satay Beef or Shredded Pork with Snow Veg, or Preserved Veg, or Minced Beef or Ham or Dumpling/Wonton or Beef Brisket or Chicken Steak or Pork Chop',
          sides: [
            { name: 'Macaron or Vermicelli or Noodle or Rice Noodle or Instant Noodle (+$1.00)' },
          ],
        },
        {
          id: '3',
          name: 'Sandwich',
          price: '$9.95',
          description: 'Egg, Tomato, Ham, Cheese, Luncheon Meat',
          sides: [{ name: 'Choice of any two kinds' }],
        },
        {
          id: '4',
          name: 'Congee Combo',
          price: '$9.95',
          description: 'Beef Congee, Minced Beef Congee, Sampan Seafood Congee, Sliced Fish Congee, Chicken & Chinese Mushroom Congee, Pork & Preserved Egg Congee',
          addons: [
            { name: 'Chinese Donut', price: '$13.95' },
            { name: 'Pan Fried Noodle with Supreme Soya Sauce', price: '$14.95' },
            { name: 'Pan Fried Radish Cake', price: '$14.95' },
            { name: 'Salty Pork Rice Wrap', price: '$14.95' },
            { name: 'Hong Kong Style Rice Rolls w/Mixed Sauce', price: '$14.95' },
          ],
        },
        {
          id: '5',
          name: 'Toast',
          price: '$9.95',
          description: 'Hot Drink Included',
          items: [
            { name: 'French Toast', price: '$9.95' },
            { name: 'Condensed Milk & Butter Toast', price: '$7.95' },
            { name: 'Condensed Milk & Peanut Butter Toast', price: '$7.95' },
          ],
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background px-3 py-4 text-foreground sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .page { page-break-inside: avoid; }
          @page { margin: 0.5in; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl">

        {/* Header */}
<div className="mb-5 rounded-xl bg-primary px-2.5 py-3 text-center text-primary-foreground sm:mb-8 sm:px-6 sm:py-4">
          <h1 className="font-sans text-xl font-bold leading-tight tracking-wide sm:text-4xl">Breakfast <span className="font-normal">早餐</span> <span className="font-semibold">(8 am to 11 am)</span></h1>
          <p className="mt-1 text-[11px] font-semibold leading-4 text-accent sm:text-sm">11 am to 5 pm +$1.50 · Order between 11 am and 5 pm</p>
        </div>

        {/* Combo Section */}
        <div className="mb-10 sm:mb-16">
<div className="mb-5 border-b-2 border-accent pb-2">
            <h2 className="font-sans text-base font-bold leading-5 text-primary sm:text-xl">1. 套餐 <span className="font-normal">(A + D $15.95; B + D $15.95; C + D $17.95)</span></h2>
            <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm">Choose any two sides with your selection. Hot drink included.</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {menuItems[0].items.map((item) => (
<div key={item.id} className="border-b-2 border-accent pb-5 sm:pb-6">
                <div className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-start gap-2 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-bold text-accent-foreground sm:h-8 sm:w-8">
                    {item.id}
                  </div>
                  <div className="min-w-0">
                    <h3 className="min-w-0 text-[13px] font-sans font-bold leading-5 sm:text-lg"><BilingualText value={item.name} /></h3>
                    <p className="mt-1 min-w-0 text-[11px] leading-4 text-muted-foreground sm:text-[15px]"><BilingualText value={item.description} /></p>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    <p className="text-sm font-bold sm:text-xl">{item.price}</p>
                  </div>
                </div>

                {item.sides && (
                  <div className="ml-9 mt-3 w-[calc(100%-2.25rem)] space-y-2 text-xs leading-5 sm:ml-11 sm:mt-3 sm:w-[calc(100%-2.75rem)] sm:space-y-1">
                    {item.sides.map((side, idx) => (
<div key={idx} className="text-muted-foreground">
                        <div className="space-y-0.5 text-[11px] leading-4 text-foreground sm:text-sm sm:leading-5">
                          <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
                            <span className="shrink-0 font-semibold text-primary">配:</span>
                            <span>{chineseTranslation(side.name)}</span>
                            {'options' in side && side.options && <span className="flex flex-wrap gap-x-3 gap-y-1 border-l-2 border-accent/40 pl-2 text-muted-foreground">
                              {side.options.map((option) => <span key={option} className="whitespace-nowrap">{chineseTranslation(option)}</span>)}
                            </span>}
                          </p>
                          <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
                            <span className="shrink-0 font-semibold text-primary">with:</span>
                            <span>{side.name}</span>
                            {'options' in side && side.options && <span className="flex flex-wrap gap-x-3 text-muted-foreground">
                              {side.options.map((option) => <span key={option}>{option}</span>)}
                            </span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* À La Carte Section */}
        <div>
<div className="mb-5 border-b-2 border-accent pb-2">
            <h2 className="font-sans text-lg font-bold text-primary sm:text-xl">2 <span className="ml-1">湯麵系列</span> <span className="font-normal">Noodle Soup</span></h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Available all day. Prices subject to change.</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {menuItems[1].items.map((item) => (
<div key={item.id} className="border-b-2 border-accent pb-4 last:border-b-0 sm:pb-5">
                <div className="mb-2 grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-bold text-accent-foreground sm:h-8 sm:w-8">
                    {item.id}
                  </div>
                  <div className="min-w-0">
                    <h3 className="min-w-0 text-[13px] font-sans font-bold leading-5 sm:text-lg"><BilingualText value={item.name} /></h3>
                    <p className="mt-1 min-w-0 text-[11px] leading-4 text-muted-foreground sm:text-[15px]"><BilingualText value={item.description} /></p>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    <p className="text-sm font-bold sm:text-xl">{item.price}</p>
                  </div>
                </div>

                {item.addons && (
                  <div className="ml-9 mt-3 w-[calc(100%-2.25rem)] space-y-1 text-xs leading-5 sm:ml-11 sm:w-[calc(100%-2.75rem)] sm:text-sm">
<p className="mb-1 text-xs font-bold leading-5 text-foreground sm:text-sm">可選配料 <span className="font-normal text-muted-foreground">Optional Add-ons</span></p>
                    <div className="space-y-0.5">
                      {item.addons.map((addon, idx) => (
                        <div key={idx} className="flex items-baseline justify-between gap-4 border-b border-border/70 py-0.5 text-xs leading-5 text-muted-foreground last:border-b-0 sm:text-sm">
                          <span className="min-w-0"><BilingualText value={addon.name} /></span>
                          <span className="shrink-0 font-medium text-foreground">{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.items && (
                  <div className="ml-9 mt-3 w-[calc(100%-2.25rem)] space-y-1 text-xs leading-5 sm:ml-11 sm:w-[calc(100%-2.75rem)] sm:text-sm">
<p className="mb-1 text-xs font-bold leading-5 text-foreground sm:text-sm">多士選擇 <span className="font-normal text-muted-foreground">Toast Options</span></p>
                    <div className="space-y-0.5">
                      {item.items.map((toastItem, idx) => (
                        <div key={idx} className="flex items-baseline justify-between gap-4 border-b border-border/70 py-0.5 text-xs leading-5 text-muted-foreground last:border-b-0 sm:text-sm">
                          <span className="min-w-0"><BilingualText value={toastItem.name} /></span>
                          <span className="shrink-0 font-medium text-foreground">{toastItem.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.sides && (
                  <div className="ml-9 mt-3 w-[calc(100%-2.25rem)] space-y-2 text-xs leading-5 sm:ml-11 sm:mt-3 sm:w-[calc(100%-2.75rem)] sm:space-y-1">
                    {item.sides.map((side, idx) => (
<div key={idx} className="text-muted-foreground">
                        <div className="space-y-0.5 text-[11px] leading-4 text-foreground sm:text-sm sm:leading-5">
                          <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
                            <span className="shrink-0 font-semibold text-primary">配:</span>
                            <span>{chineseTranslation(side.name)}</span>
                            {'options' in side && side.options && <span className="flex flex-wrap gap-x-3 gap-y-1 border-l-2 border-accent/40 pl-2 text-muted-foreground">
                              {side.options.map((option) => <span key={option} className="whitespace-nowrap">{chineseTranslation(option)}</span>)}
                            </span>}
                          </p>
                          <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
                            <span className="shrink-0 font-semibold text-primary">with:</span>
                            <span>{side.name}</span>
                            {'options' in side && side.options && <span className="flex flex-wrap gap-x-3 text-muted-foreground">
                              {side.options.map((option) => <span key={option}>{option}</span>)}
                            </span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-accent text-center">
          <p className="text-xs text-muted-foreground">
            Please inform us if you have food allergies. Our restaurant reserves the right to change this menu without prior notice. Special items valid while stocks last.
          </p>
        </div>
      </div>
    </div>
  )
}
