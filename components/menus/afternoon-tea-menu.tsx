'use client'

import { bilingual } from '@/lib/menu-translations'



export function AfternoonTeaMenu() {

  const menuItems = [
    { number: '501', name: 'Pan Fried Potstickers (6pcs) (Pork Gyoza)', price: '$9.95' },
    { number: '502', name: 'Caesar Salad', price: '$9.95' },
    { number: '503', name: 'Mussel in Italian Herb Sauce (10pcs)', price: '$11.95' },
    { number: '504', name: 'Fried Chicken Drum Stick w/French Fries', price: '$12.95' },
    { number: '505', name: 'Deep Fried Chicken Wings w/French Fries', price: '$12.95' },
    { number: '506', name: 'Chicken Gizzard Skewers (3pcs)', price: '$12.95' },
    { number: '507', name: 'Five Spices Beef Skewers (3pcs)', price: '$12.95' },
    { number: '508', name: 'Assorted Satay Pork/Chicken Skewers (3pcs)', price: '$12.95' },
    { number: '509', name: 'Cumin Powder Lamb Skewers (3pcs)', price: '$13.95' },
    { number: '510', name: 'Baked Pork Chop on Rice', price: '$14.95' },
    { number: '511', name: 'Baked Seafood on Rice w/Cheese in Cream Sauce', price: '$14.95' },
    { number: '512', name: 'Baked Cheese Spaghetti Bolognese', price: '$13.95' },
    { number: '513', name: 'Baked Shredded Chicken Spaghetti w/Tomato', price: '$13.95' },
    { number: '514', name: 'Baked Ham & Pineapple Spaghetti w/Cheese in Cream Sauce', price: '$13.95' },
    { number: '515', name: 'Ham & Shredded Chicken on Spaghetti in Cream Sauce', price: '$13.95' },
    { number: '516', name: 'Spicy Sausage on Penne', price: '$14.95' },
    { number: '517', name: 'Cutlet Fish in Curry Sauce on Rice', price: '$14.95' },
    { number: '518', name: 'Chicken/Sliced Beef/Beef Brisket in Curry Sauce on Rice', price: '$14.95' },
    { number: '519', name: 'Corn Beef & Egg Sandwich', price: '$11.95' },
    { number: '520', name: 'Club Sandwich & French Fries', price: '$14.95' },
    { number: '521', name: 'Braised Shredded Pork & Snow Veg w/Rice Vermicelli', price: '$14.95' },
    { number: '522', name: 'Pan Fried Chicken & Egg Instant Noodle Soup', price: '$15.95' },
    { number: '523', name: 'Cutlet Pork Chop Udon in Soup', price: '$15.95' },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-accent">
          <h1 className="text-4xl font-bold mb-2">Happy Hour & Afternoon Tea</h1>
          <p className="text-lg font-semibold text-accent mb-2">4:00pm - 6:00pm Daily</p>
          <p className="text-sm text-muted-foreground">
            Hot Drink Included | Cold Drink +$1.50
          </p>
        </div>

        {/* Beer & Beverage Selection */}
        <div className="mb-12 p-6 bg-muted/20 rounded-lg border border-accent/30">
          <h2 className="text-2xl font-bold mb-6 text-accent">Premium Beer Selection</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 border-b border-accent pb-2">Local Selection</h3>
              <div className="space-y-2 text-sm">
                <p>• Kokanee</p>
                <p>• Molson Canadian</p>
                <p>• Local Craft Selection</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 border-b border-accent pb-2">International Imports</h3>
              <div className="space-y-2 text-sm">
                <p>• Heineken (Netherlands)</p>
                <p>• Tsingtao (China)</p>
                <p>• Premium Selections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 pb-3 border-b-2 border-accent">Happy Hour Snacks & Bites</h3>
        </div>
        <div className="space-y-0">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-4 px-6 border-b border-muted hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <span className="text-accent font-bold min-w-12">{item.number}</span>
                  <div>
                    <p className="font-semibold">{bilingual(item.name)}</p>
                  </div>
                </div>
              </div>
              <div className="text-right font-semibold text-accent ml-4 whitespace-nowrap">
                {item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-muted text-center text-xs text-muted-foreground space-y-2">
          <p>Please inform us if you have Food Allergies. Our restaurant will change this menu without prior notice. Special items valid while stocks last.</p>
        </div>
      </div>
    </div>
  )
}
