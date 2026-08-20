'use client'


export function LunchMenu() {

  const menuSections = [
    {
      title: 'Appetizers & Snacks',
      items: [
        { id: '101', name: 'Assorted Vegetables Spring Roll', price: '$6.00' },
        { id: '102', name: 'Pan Fried Dumplings', price: '$9.95' },
        { id: '103', name: 'Famous BBQ Quail', price: '$12.95' },
        { id: '104', name: 'Deep Fried Chicken Wing', price: '$12.95' },
        { id: '105', name: 'Crispy Salt & Pepper Tofu', price: '$14.95' },
        { id: '106', name: 'Deep Fried Chicken Leg', price: '$12.95' },
        { id: '107', name: 'Chicken Fillet Salad in Thai Sauce', price: '$14.95' },
        { id: '108', name: 'Pork Loin with Caesar Salad', price: '$14.95' },
        { id: '109', name: 'Deep Fried Pacific Cod with Caesar Salad', price: '$14.95' },
        { id: '110', name: 'Baked Salmon Fillet with Caesar Salad', price: '$16.95' },
      ],
    },
    {
      title: 'Soup',
      items: [
        { id: '121', name: 'Soup of the Day', price: '$9.50' },
        { id: '122', name: 'Borscht in Hong Kong Style', price: '$9.95' },
        { id: '123', name: 'Cream Soup with Chicken, Ham or Mushroom', price: '$12.95' },
        { id: '124', name: 'Chicken & Corn Soup', price: '$13.95' },
        { id: '125', name: 'Hot & Sour Soup', price: '$15.95' },
        { id: '126', name: 'Seafood Cream Soup', price: '$15.95' },
        { id: '127', name: 'French Baked Lobster Soup with Puff Pastry', price: '$14.95' },
        { id: '128', name: 'French Baked Onion Soup with Puff Pastry', price: '$13.95' },
        { id: '129', name: 'Garlic Bread (each)', price: '$0.50' },
        { note: 'Cream Soup with Puff (+$4.00)' },
      ],
    },
    {
      title: 'Baked Rice & Spaghetti',
      subtitle: 'Hot Tea or Coffee Included, Cold Drink +$1.50 (Add $2.00 for Soup & Bread)',
      items: [
        { id: '131', name: 'Baked Spaghetti Bolognese & Cheese', price: '$18.50' },
        { id: '132', name: 'Baked Spaghetti Bolognese with Sausage & Cheese', price: '$18.50' },
        { id: '133', name: 'Baked Spaghetti w/Ham Pineapple & Cheese in Cream Sauce', price: '$18.50' },
        { id: '134', name: 'Baked Coconut Chicken in Portuguese Style on Rice', price: '$18.50' },
        { id: '135', name: 'Baked Ox-Tongue with Tomato Sauce on Rice', price: '$18.50' },
        { id: '136', name: 'Baked Amaranth Sole Fillet with Cheese on Rice', price: '$18.50' },
        { id: '137', name: 'Baked Seafood with Cream Sauce on Rice', price: '$18.50' },
        { id: '138', name: 'Baked Curry Chicken Steak on Rice', price: '$18.50' },
        { id: '139', name: 'Baked Assorted Vegetable in Cream or Tomato Sauce on Rice', price: '$18.50' },
        { id: '140', name: 'Baked Prawn & Chicken Rice w/Tomato & Cream Sauce on Rice', price: '$18.95' },
        { id: '141', name: 'Baked Pork Chop (or Chicken Steak) with Tomato Sauce on Rice', price: '$18.50' },
        { id: '142', name: 'Baked Chicken Rice w/Cream Sauce & Cheese', price: '$18.50' },
        { id: '143', name: 'Baked Seafood on Rice in Spanish Style', price: '$19.95' },
        { id: '144', name: 'Baked Seafood with Italian Sauce in Penne', price: '$19.95' },
        { id: '145', name: 'Ox-Tongue & Spaghetti in Tomato Sauce', price: '$19.95' },
        { id: '146', name: 'Roasted Pork Knuckle Spaghetti', price: '$19.95' },
        { id: '147', name: 'Prawn, Ham & Mushroom with Spaghetti', price: '$19.95' },
        { id: '148', name: 'Salmon & Penne in Herbs Sauce', price: '$19.95' },
        { id: '149', name: 'Seafood and Truffle with Spaghetti', price: '$19.95' },
      ],
    },
    {
      title: 'Noodle Soup',
      subtitle: 'Hot Tea or Coffee Included, Cold Drink +$1.50',
      items: [
        { id: '181', name: 'Wonton in Soup (10pcs)', price: '$15.50' },
        { id: '182', name: 'Dumpling in Soup (8 pcs)', price: '$15.50' },
        { id: '183', name: 'Assorted Vegetable & Noodle in Soup', price: '$15.25' },
        { id: '184', name: 'Wonton & Noodle in Soup (6 pcs)', price: '$16.25' },
        { id: '185', name: 'Dumpling & Noodle in Soup (5 pcs)', price: '$16.25' },
        { id: '186', name: 'Stewed Beef Brisket & Noodle in Soup', price: '$16.25' },
        { id: '187', name: 'Preserved Vegetable & Minced Pork w/ Vermicelli in Soup', price: '$16.25' },
        { id: '188', name: 'Chinese Pickle Minced Pork w/ Vermicelli in Soup', price: '$16.25' },
        { id: '189', name: 'B.B.Q. Pork & Noodle in Soup', price: '$16.95' },
        { id: '190', name: 'B.B.Q. Duck & Noodle in Soup', price: '$16.95' },
        { id: '191', name: 'Soy Sauce Chicken & Noodle in Soup', price: '$16.95' },
        { id: '192', name: 'Dumpling & Wonton & Noodle in Soup', price: '$16.95' },
        { id: '193', name: 'Stewed Beef Brisket & Wonton & Noodle in Soup', price: '$16.95' },
        { id: '194', name: 'Preserved Veg. & Duck Meat w/ Vermicelli in Soup', price: '$16.95' },
        { note: '**Noodle, Rice Noodle and Vermicelli Same Price' },
      ],
    },
    {
      title: 'Fried Noodle',
      subtitle: 'Hot Tea or Coffee Included, Cold Drink +$1.50',
      items: [
        { id: '151', name: "Buddha's Feast Chow Mein (Vegetarian)", price: '$18.95' },
        { id: '152', name: 'Shredded Pork, BBQ Pork & Chicken Chow Mein', price: '$19.95' },
        { id: '153', name: 'Chicken & Black Bean Sauce Chow Mein', price: '$19.95' },
        { id: '154', name: 'Shredded Pork Chow Mein', price: '$19.95' },
        { id: '155', name: 'Beef Brisket & Vegetable Chow Mein', price: '$19.95' },
        { id: '156', name: 'BBQ Pork & Vegetable Chow Mein', price: '$19.95' },
        { id: '157', name: 'Beef & Black Bean Sauce Chow Mein', price: '$19.95' },
        { id: '158', name: 'Beef & Satay Sauce Chow Fun (Flat Wide Rice Noodle)', price: '$19.95' },
        { id: '159', name: 'Pan Fried Thin Rice Noodle w/Shredded BBQ Duck', price: '$19.95' },
        { id: '160', name: 'Pan Fried Thin Rice Noodle w/Shredded Pork', price: '$19.95' },
        { id: '161', name: 'Pan Fried Sliced Beef & Shrimp Paste with Rice Noodle', price: '$19.95' },
        { id: '162', name: 'Stir-Fried Beef Rice Noodle', price: '$19.95' },
        { id: '163', name: 'Pan Fried Vermicelli in Singapore Style', price: '$19.95' },
        { id: '164', name: 'Pan Fried Noodle with Bean Sprout', price: '$18.95' },
        { id: '165', name: 'Pan Fried Rice Noodle in Penang Style', price: '$19.95' },
        { id: '166', name: 'Preserved Vegetable Duck Meat Braised Thin Rice Noodle', price: '$19.95' },
        { id: '167', name: 'E-fu Noodle with Assorted Mushroom', price: '$18.95' },
        { id: '168', name: 'House Special (Assorted Meat) Chow Mein', price: '$22.95' },
        { id: '169', name: 'Seafood Chow Mein', price: '$22.95' },
        { note: 'Change to Pan Fried Vermicelli Add $5.00' },
      ],
    },
    {
      title: 'Curry Dishes',
      subtitle: 'Hot Tea or Coffee Included, Cold Drink +$1.50 (Add $2.00 for Soup & Bread)',
      items: [
        { id: '201', name: 'Curry Beef on Rice', price: '$18.50' },
        { id: '202', name: 'Curry Beef Brisket on Rice', price: '$18.50' },
        { id: '203', name: 'Curry Chicken on Rice', price: '$18.50' },
        { id: '204', name: 'Curry Ox-Tongue on Rice', price: '$18.95' },
        { id: '205', name: 'Curry Cutlet Fish Fillet on Rice', price: '$18.50' },
        { id: '206', name: 'Curry Cutlet Pork Chop on Rice', price: '$18.50' },
        { id: '207', name: 'Curry Assorted Vegetable on Rice', price: '$17.95' },
      ],
    },
    {
      title: 'Fried Rice',
      subtitle: 'Hot Tea or Coffee Included, Cold Drink +$1.50',
      items: [
        { id: '211', name: 'Diced Vegetable Fried Rice', price: '$17.95' },
        { id: '212', name: 'BBQ Pork Fried Rice', price: '$18.50' },
        { id: '213', name: 'Seafood & Egg White Fried Rice', price: '$19.95' },
        { id: '214', name: 'Shrimp Fried Rice', price: '$18.95' },
        { id: '215', name: 'Minced Beef Fried Rice', price: '$18.50' },
        { id: '216', name: 'Shredded Chicken Fried Rice', price: '$18.50' },
        { id: '217', name: 'BBQ Pork & Shrimp Fried Rice', price: '$18.95' },
        { id: '218', name: 'Preserved Olive Vegetable and Pork Floss Fried Rice', price: '$18.95' },
        { id: '219', name: 'Thai-style Pineapple and Diced Chicken Fried Rice', price: '$18.95' },
        { id: '220', name: 'Stir-Fried Glutinous Rice with Chinese Cured Meats', price: '$18.95' },
        { id: '221', name: 'Salted Fish and Diced Chicken Fried Rice', price: '$18.95' },
      ],
    },
    {
      title: 'Lunch Special Combo',
      subtitle: 'Steamed Rice, Soup, and Hot Tea or Coffee Included (Cold Drink +$1.50)',
      highlight: '$19.95',
      items: [
        { id: '261', name: 'Beef Brisket Stew', price: '' },
        { id: '262', name: 'Fried Tofu in Oyster Sauce', price: '' },
        { id: '263', name: 'Boneless Chicken & Green Beans & Black Bean Sauce', price: '' },
        { id: '264', name: 'Boneless Chicken with Two Kinds of Mushrooms', price: '' },
        { id: '265', name: 'Sauteed Boneless Chicken with Broccoli', price: '' },
        { id: '266', name: 'Mapo Tofu with Beef', price: '' },
        { id: '267', name: 'Stir Fried Gai Lan with Beef & Satay Sauce', price: '' },
        { id: '268', name: 'Stir Fried Broccoli with Beef', price: '' },
        { id: '269', name: 'Beef & Green Bean in Black Bean Sauce', price: '' },
        { id: '270', name: 'Szechuan Pork & Cabbage (Spicy)', price: '' },
        { id: '271', name: 'Mapo Tofu with Pork', price: '' },
        { id: '272', name: 'Sweet & Sour Boneless Pork with Pineapple', price: '' },
        { id: '273', name: 'Stir-Fried Beef with Bitter Melon and Black Bean Sauce', price: '' },
        { id: '274', name: 'Braised Tofu and Crispy Pork Belly', price: '' },
        { id: '275', name: 'Stir-Fried Bitter Melon with Roast Pork Belly', price: '' },
      ],
    },
    {
      title: 'Sandwiches',
      subtitle: 'Choice of Any Two Kinds Below and Hot Tea or Coffee Included',
      items: [
        { id: '251', name: 'Condensed Milk Toast', price: '$7.95' },
        { id: '252', name: 'French Thick Toast', price: '$9.95' },
        { id: '253', name: 'Ham & Egg Sandwich', price: '$11.95' },
        { id: '254', name: 'Tuna Sandwich', price: '$11.95' },
        { id: '255', name: 'Corn Beef & Egg Sandwich', price: '$11.95' },
        { id: '256', name: 'Roasted Chicken & Lettuce Sandwich', price: '$12.95' },
        { id: '257', name: 'House Sandwich', price: '$15.95' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-accent">
          <h1 className="text-5xl font-bold tracking-tight mb-2">LUNCH MENU</h1>
          <p className="text-muted-foreground text-lg">Available 11:00 AM – 5:00 PM</p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-baseline gap-4 border-b-2 border-accent pb-3">
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              </div>

              {/* Section Subtitle */}
              {section.subtitle && (
                <p className="text-sm text-muted-foreground italic">{section.subtitle}</p>
              )}

              {/* Items */}
              <div className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    {'note' in item && item.note ? (
                      <p className="text-xs text-muted-foreground italic">{item.note}</p>
                    ) : (
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex gap-3 items-baseline">
                            <span className="text-sm font-semibold text-accent min-w-fit">
                              {item.id}
                            </span>
                            <span className="text-foreground font-medium">{item.name}</span>
                          </div>
                        </div>
                        {item.price && (
                          <span className="text-foreground font-semibold whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Lunch Special Combo Price */}
                {section.highlight && (
                  <div className="bg-accent/10 border-l-4 border-accent p-4 mt-4">
                    <p className="text-center text-lg font-bold text-accent">
                      All Items: {section.highlight}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-muted text-center text-xs text-muted-foreground space-y-2">
          <p>Please inform us if you have food allergies. Our restaurant may change this menu without prior notice.</p>
          <p>Special items valid while stocks last. Prices subject to change.</p>
        </div>
      </div>
    </div>
  )
}
