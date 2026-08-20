'use client'

import { Printer } from 'lucide-react'

export function DinnerMenu() {
  const handlePrint = () => {
    window.print()
  }

  const menuSections = [
    {
      title: 'Appetizer & Snack',
      items: [
        { id: '301', name: 'Assorted Vegetables Spring Roll', subtitle: '(2 pcs)', price: '$6.00' },
        { id: '302', name: 'Pan Fried Dumplings', subtitle: '(8 pcs)', price: '$9.95' },
        { id: '303', name: 'Famous BBQ Quail', subtitle: '(2 pcs)', price: '$12.95' },
        { id: '304', name: 'Deep Fried Chicken Wing', subtitle: '(6 pcs)', price: '$12.95' },
        { id: '305', name: 'Crispy Salt & Pepper Tofu', price: '$14.95' },
        { id: '306', name: 'Deep Fried Chicken Leg', price: '$12.95' },
        { id: '307', name: 'Chicken Fillet Salad in Thai Sauce', price: '$14.95' },
        { id: '308', name: 'Pork Loin Cutlet with Caesar Salad', price: '$14.95' },
        { id: '309', name: 'Deep Fried Pacific Cod with Caesar Salad', price: '$14.95' },
        { id: '310', name: 'Baked Salmon Fillet with Caesar Salad', price: '$16.95' },
      ]
    },
    {
      title: 'Soup',
      items: [
        { id: '321', name: 'Soup of the day', price: '$9.50' },
        { id: '322', name: 'Borscht in Hong Kong Style', price: '$9.95' },
        { id: '323', name: 'Cream Soup with (Chicken, Ham, Mushroom)', price: '$12.95' },
        { id: '324', name: 'Chicken & Corn Soup', price: '$13.95' },
        { id: '325', name: 'Hot & Sour Soup', price: '$15.95' },
        { id: '326', name: 'Seafood Cream Soup', price: '$15.95' },
        { id: '327', name: 'French Baked Lobster Soup with Puff Pastry', price: '$15.95' },
        { id: '328', name: 'French Baked Onion Soup with Puff Pastry', price: '$13.95' },
        { id: '329', name: 'Garlic Bread', subtitle: '(each)', price: '$0.50' },
      ]
    },
    {
      title: 'Hot Pot',
      items: [
        { id: '351', name: 'Mixed Veggies & Clear Noodles in Satay Sauce', price: '$19.95' },
        { id: '352', name: 'Beef Brisket Stew', price: '$21.95' },
        { id: '353', name: 'Eggplant & Shredded Pork in Spicy Sauce', price: '$21.95' },
        { id: '354', name: 'Sizzling Chicken (Boneless) with Chinese Sausage', price: '$21.95' },
        { id: '355', name: 'Mixed Meat with Fried To-fu', price: '$22.95' },
        { id: '356', name: 'Satay Fatty Beef & Clear Noodles', price: '$22.95' },
        { id: '357', name: 'Braised Tofu & Roast Pork Belly', price: '$21.95' },
        { id: '358', name: 'Braised Salted Fish and Diced Chicken Tofu', price: '$21.95' },
        { id: '359', name: 'Braised Bitter Melon & Pork Belly', price: '$22.95' },
        { id: '360', name: 'Braised Dried Shrimp, Pork & Choy Sum', price: '$22.95' },
      ]
    },
    {
      title: 'Vegetable',
      items: [
        { id: '371', name: 'Stir-Fried with Garlic Sauce Veggie', price: '$20.95' },
        { id: '372', name: 'Fried Tofu in Oyster Sauce', price: '$20.95' },
        { id: '373', name: 'Bean Curd Skin with Bok Choy', price: '$20.95' },
        { id: '374', name: 'Braised Vegetable with Preserved Bean Curd Sauce', price: '$20.95' },
        { id: '375', name: "Bamboo Pith Buddha's Feast", price: '$20.95' },
        { id: '376', name: 'Lettuce Stir-Fry with Chilli and Preserved Bean Curd', price: '$20.95' },
        { id: '377', name: 'Stickier Dry-Fried Green Beans', price: '$20.95' },
        { id: '378', name: 'Stir-Fried Cauliflower with Cured Meats', price: '$23.95' },
        { id: '379', name: 'Braised Egg Tofu with Enoki Mushrooms in Savory Sauce', price: '$20.95' },
        { id: '380', name: 'Stir-Fried Cauliflower with Pork Belly and Shrimp Paste', price: '$23.95' },
      ]
    },
    {
      title: 'Chicken',
      items: [
        { id: '391', name: 'Boneless Chicken & Bean in Black Bean Sauce', price: '$21.95' },
        { id: '392', name: 'Boneless Chicken w/Two kinds of Mushrooms', price: '$21.95' },
        { id: '393', name: 'Diced Chicken w/Peanuts & Green Pepper In Spicy Sauce', price: '$21.95' },
        { id: '394', name: 'Diced Chicken w/Cashew Nuts & Diced Vegetables', price: '$21.95' },
        { id: '395', name: 'Sweet & Sour Sliced Chicken', price: '$21.95' },
        { id: '396', name: 'Sautéed Seasonal Vegetable with Sliced Chicken', price: '$21.95' },
      ]
    },
    {
      title: 'Beef',
      items: [
        { id: '401', name: 'Mapo Tofu with Beef', price: '$21.95' },
        { id: '402', name: 'Stir Fried Seasonal Vegetable and Beef', price: '$23.95' },
        { id: '403', name: 'Stir Fried Gai Lan and Beef in Satay Sauce', price: '$23.95' },
        { id: '404', name: 'Stir-Fried Beef Cubes & Mushroom in Black Pepper Sauce', price: '$23.95' },
        { id: '405', name: 'Stir Fried Broccoli & Beef', price: '$23.95' },
        { id: '406', name: 'Beef & Green Beans in Black Bean Sauce', price: '$23.95' },
        { id: '407', name: 'Pan Fried Beef with Spicy Sauce (Szechuan Style)', price: '$24.95' },
        { id: '408', name: 'Stir-Fried Beef & Bitter Melon in Black Bean Sauce', price: '$23.95' },
      ]
    },
    {
      title: 'Pork',
      items: [
        { id: '411', name: 'Sichuan Style Pork & Cabbage (Spicy)', price: '$21.95' },
        { id: '412', name: 'Mapo Tofu with Pork', price: '$21.95' },
        { id: '413', name: 'Spare Ribs in Honey Garlic Sauce', price: '$22.95' },
        { id: '414', name: 'Deep Fried Pork Chop with Gourmet Sauce', price: '$23.95' },
        { id: '415', name: 'Deep Fried Pork Chop with Spicy Rock Salt', price: '$23.95' },
        { id: '416', name: 'Sweet & Sour Boneless Pork with Pineapple', price: '$23.95' },
      ]
    },
    {
      title: 'Seafood',
      items: [
        { id: '421', name: 'Pan Fried Sliced Basa with Vegetable', price: '$23.95' },
        { id: '422', name: 'Deep Fried Basa Cutlet in Sweet & Sour Sauce', price: '$23.95' },
        { id: '423', name: 'Deep Fried Basa Cutlet in Corn Sauce', price: '$23.95' },
        { id: '424', name: 'Crispy Salt & Pepper Prawns', price: '$24.95' },
        { id: '425', name: 'Stir-Fried Halibut with Ginger, Scallion with Premium Soy Sauce', price: '$23.95' },
        { id: '426', name: 'Braised Tamago Tofu with Seafood & Egg White', price: '$23.95' },
      ]
    },
    {
      title: 'Curry Dishes',
      items: [
        { id: '461', name: 'Curry Beef on Rice', price: '$20.95' },
        { id: '462', name: 'Curry Beef Brisket on Rice', price: '$20.95' },
        { id: '463', name: 'Curry Chicken on Rice', price: '$20.95' },
        { id: '464', name: 'Curry Ox-Tongue on Rice', price: '$21.95' },
        { id: '465', name: 'Curry Cutlet Fish Fillet on Rice', price: '$20.95' },
        { id: '466', name: 'Curry Cutlet Pork Chop on Rice', price: '$20.95' },
        { id: '467', name: 'Curry Assorted Vegetable on Rice', price: '$19.95' },
      ]
    },
    {
      title: 'Fried Rice',
      items: [
        { id: '431', name: 'Diced Vegetable Fried Rice', price: '$17.95' },
        { id: '432', name: 'Mushroom Fried Rice', price: '$17.95' },
        { id: '433', name: 'BBQ Pork Fried Rice', price: '$18.95' },
        { id: '434', name: 'Seafood & Egg White Fried Rice', price: '$19.95' },
        { id: '435', name: 'Shrimp Fried Rice', price: '$18.95' },
        { id: '436', name: 'Minced Beef Fried Rice', price: '$18.95' },
        { id: '437', name: 'Shredded Chicken Fried Rice', price: '$18.95' },
        { id: '438', name: 'BBQ Pork & Shrimp Fried Rice', price: '$18.95' },
        { id: '493', name: 'Preserved Olive Vegetable and Pork Floss Fried Rice', price: '$18.95' },
        { id: '494', name: 'Thai-style Pineapple and Diced Chicken Fried Rice', price: '$18.95' },
        { id: '495', name: 'Stir-Fried Glutinous Rice with Chinese Cured Meats', price: '$18.95' },
        { id: '496', name: 'Salted Fish and Diced Chicken Fried Rice', price: '$18.95' },
      ]
    },
    {
      title: 'Fried Noodle',
      items: [
        { id: '441', name: "Buddha's Feast Chow Mein (Vegetarian)", price: '$18.95' },
        { id: '442', name: 'Shredded Pork, BBQ Pork & Chicken Chow Mein', price: '$19.95' },
        { id: '443', name: 'Chicken & Black Bean Sauce Chow Mein', price: '$19.95' },
        { id: '444', name: 'Shredded Pork Chow Mein', price: '$19.95' },
        { id: '445', name: 'Beef Brisket & Vegetable Chow Mein', price: '$19.95' },
        { id: '446', name: 'BBQ Pork & Vegetable Chow Mein', price: '$19.95' },
        { id: '447', name: 'Beef & Black Bean Sauce Chow Mein', price: '$19.95' },
        { id: '448', name: 'Fried Rice Noodle with Beef and Satay Sauce', price: '$19.95' },
        { id: '449', name: 'Pan Fried Rice Noodle with Beef', price: '$19.95' },
        { id: '450', name: 'Pan Fried Thin Rice Noodle w/Shredded BBQ Duck', price: '$19.95' },
        { id: '451', name: 'Pan Fried Vermicelli w/ Shredded Pork', price: '$19.95' },
        { id: '452', name: 'Pan Fried Sliced Beef & Shrimp Paste with Rice Noodle', price: '$19.95' },
        { id: '453', name: 'Pan Fried Vermicelli in Singapore Style', price: '$19.95' },
        { id: '454', name: 'Pan Fried Noodle with Bean Sprout', price: '$18.95' },
        { id: '455', name: 'Pan Fried Rice Noodle in Penang Style', price: '$20.95' },
        { id: '456', name: 'Preserved Vegetable Duck Meat Braised Vermicelli', price: '$19.95' },
        { id: '457', name: 'E-fu Noodle with Assorted Mushroom', price: '$19.95' },
        { id: '458', name: 'House Special Chow Mein', price: '$22.95' },
        { id: '459', name: 'Seafood Chow Mein', price: '$22.95' },
      ]
    },
    {
      title: 'Baked Rice & Spaghetti',
      items: [
        { id: '471', name: 'Baked Spaghetti Bolognese & Cheese', price: '$20.95' },
        { id: '472', name: 'Baked Spaghetti Bolognese with Sausage & Cheese', price: '$20.95' },
        { id: '473', name: 'Baked Spaghetti w/Ham Pineapple & Cheese in Cream Sauce', price: '$20.95' },
        { id: '474', name: 'Baked Coconut Chicken in Portuguese Style on Rice', price: '$20.95' },
        { id: '475', name: 'Baked Ox-Tongue with Tomato Sauce on Rice', price: '$20.95' },
        { id: '476', name: 'Baked Amaranth Sole Fillet with Cheese on Rice', price: '$20.95' },
        { id: '477', name: 'Baked Seafood with Cream Sauce on Rice', price: '$20.95' },
        { id: '478', name: 'Baked Curry Chicken Steak on Rice', price: '$20.95' },
        { id: '479', name: 'Baked Assorted Vegetable in Cream or Tomato Sauce on Rice', price: '$20.95' },
        { id: '480', name: 'Baked Prawn & Chicken Rice w/Tomato & Cream Sauce on Rice', price: '$21.95' },
        { id: '481', name: 'Baked Pork Chop (or Chicken Steak) with Tomato Sauce on Rice', price: '$20.95' },
        { id: '482', name: 'Baked Chicken Rice w/Cream Sauce & Cheese', price: '$20.95' },
        { id: '483', name: 'Baked Seafood on Rice in Spanish Style', price: '$21.95' },
        { id: '484', name: 'Baked Seafood with Italian Sauce in Penne', price: '$21.95' },
        { id: '485', name: 'Ox-Tongue & Spaghetti in Tomato Sauce', price: '$21.95' },
        { id: '486', name: 'Roasted Pork Knuckle Spaghetti', price: '$21.95' },
        { id: '487', name: 'Prawn, Ham & Mushroom with Spaghetti', price: '$21.95' },
        { id: '488', name: 'Salmon & Penne in Herbs Sauce', price: '$21.95' },
        { id: '489', name: 'Seafood and Truffle with Spaghetti', price: '$22.95' },
      ]
    },
    {
      title: 'Noodle Soup',
      items: [
        { id: '331', name: 'Wonton in Soup', subtitle: '(10pcs)', price: '$15.50' },
        { id: '332', name: 'Dumpling in Soup', subtitle: '(8 pcs)', price: '$15.50' },
        { id: '333', name: 'Assorted Vegetable & Noodle in Soup', price: '$15.50' },
        { id: '334', name: 'Wonton & Noodle in Soup', subtitle: '(6 pcs)', price: '$16.25' },
        { id: '335', name: 'Dumpling & Noodle in Soup', subtitle: '(5 pcs)', price: '$16.25' },
        { id: '336', name: 'Stewed Beef Brisket & Noodle in Soup', price: '$16.25' },
        { id: '337', name: 'Preserved Vegetable & Minced Pork w/ Vermicelli in Soup', price: '$16.25' },
        { id: '338', name: 'Chinese Pickle Minced Pork w/ Vermicelli in Soup', price: '$16.25' },
        { id: '339', name: 'BBQ Pork & Noodle in Soup', price: '$16.95' },
        { id: '340', name: 'BBQ Duck & Noodle in Soup', price: '$16.95' },
        { id: '341', name: 'Soy Sauce Chicken & Noodle in Soup', price: '$16.95' },
        { id: '342', name: 'Dumpling & Wonton & Noodle in Soup', price: '$16.95' },
        { id: '343', name: 'Stewed Beef Brisket & Wonton & Noodle in Soup', price: '$16.95' },
        { id: '344', name: 'Preserved Veg. & Duck Meat w / Vermicelli in Soup', price: '$16.95' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Print Button */}
        <div className="flex justify-end mb-8 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors text-sm font-medium"
          >
            <Printer size={16} />
            Print Menu
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-accent">
          <h1 className="text-4xl font-serif font-bold mb-2">Dinner Menu</h1>
          <p className="text-muted-foreground text-sm">
            Hot Tea or Coffee Included, Cold Drink +$1.50
          </p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-10">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-serif font-bold mb-6 pb-3 border-b-2 border-accent text-accent">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-foreground">{item.id}.</span>
                        <span className="font-semibold text-foreground">{item.name}</span>
                        {item.subtitle && <span className="text-sm text-muted-foreground">{item.subtitle}</span>}
                      </div>
                    </div>
                    <span className="font-semibold text-accent whitespace-nowrap ml-4">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-muted text-center text-xs text-muted-foreground space-y-2">
          <p>Please inform us if you have Food Allergies. Our Restaurant will change this menu without prior notice.</p>
          <p>Special items valid while stocks last.</p>
        </div>
      </div>
    </div>
  )
}
