'use client'


export function BBQMenu() {

  const barbecueItems = [
    { id: 230, name: 'B.B.Q Duck', price: '$23.50 (Half) / $46.00 (Whole)' },
    { id: 231, name: 'Soya Sauce Chicken', price: '$19.50 (Half) / $39.00 (Whole)' },
    { id: 232, name: 'House Special Chicken', price: '$19.50 (Half) / $39.00 (Whole)' },
    { id: 233, name: 'B.B.Q Pork', price: '$14.95 Per LB' },
    { id: 235, name: 'Roasted Pork Belly', price: '$23.95 Per LB' },
    { id: 236, name: 'Two Kinds of B.B.Q Combination', price: '$24.95' },
    { id: 237, name: 'Three Kinds of B.B.Q Combination', price: '$28.95' },
  ]

  const bbqOnRice = [
    { id: 238, name: 'B.B.Q Duck on Rice', price: '$16.95' },
    { id: 239, name: 'Soya Sauce Chicken on Rice', price: '$16.95' },
    { id: 240, name: 'B.B.Q Roasted Pork on Rice', price: '$16.95' },
    { id: 241, name: 'Crispy Pork on Rice', price: '$17.95' },
    { id: 242, name: 'Two Kinds of B.B.Q on Rice', price: '$18.95' },
    { id: 350, name: 'Three Kinds of B.B.Q on Rice', price: '$21.95' },
    { id: 243, name: 'House Special Chicken on Rice', price: '$16.95' },
  ]

  const bbqCombo = {
    name: 'BBQ Combo',
    price: '$21.50',
    description: 'Roasted Meats with Rice & Sides',
    includes: 'Choice of Chinese Soup, Hot Coffee or Tea',
    items: [
      { num: 1, name: 'B.B.Q Pork' },
      { num: 2, name: 'B.B.Q Duck' },
      { num: 3, name: 'Roasted Pork Belly' },
      { num: 4, name: 'Soya Sauce Chicken' },
      { num: 5, name: 'House Special Chicken' },
      { num: 6, name: 'Soy Sauce Duck Wings' },
    ]
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 pb-8 border-b-2 border-accent">
          <h1 className="text-5xl font-serif font-bold mb-2">Barbecue</h1>
          <p className="text-muted-foreground text-lg">Premium Roasted Meats & Specialties</p>
        </div>

        {/* BBQ Combo Special */}
        <div className="mb-16 bg-muted/50 p-8 rounded border-2 border-accent">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-serif font-bold">BBQ Combo Special</h2>
            <div className="text-4xl font-bold text-accent">{bbqCombo.price}</div>
          </div>
          <p className="text-lg text-muted-foreground mb-4">{bbqCombo.description}</p>
          <p className="text-sm text-muted-foreground mb-6">Includes: {bbqCombo.includes}</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {bbqCombo.items.map((item) => (
                  <tr key={item.num} className="border-b border-border">
                    <td className="py-3 px-4 w-12 font-semibold text-accent">{item.num}</td>
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Barbecue Section */}
        <div className="mb-12">
          <div className="mb-6 pb-4 border-b-2 border-accent">
            <h2 className="text-3xl font-serif font-bold">Barbecue</h2>
          </div>
          <div className="space-y-4">
            {barbecueItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-3 px-4 border-b border-muted hover:bg-muted/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded font-semibold text-sm min-w-12 text-center">{item.id}</span>
                    <span className="font-medium text-lg">{item.name}</span>
                  </div>
                </div>
                <span className="font-semibold text-accent ml-4 whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Barbecue on Rice/Noodle Section */}
        <div className="mb-12">
          <div className="mb-6 pb-4 border-b-2 border-accent">
            <h2 className="text-3xl font-serif font-bold">Barbecue on Rice</h2>
          </div>
          <div className="space-y-4">
            {bbqOnRice.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-3 px-4 border-b border-muted hover:bg-muted/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded font-semibold text-sm min-w-12 text-center">{item.id}</span>
                    <span className="font-medium text-lg">{item.name}</span>
                  </div>
                </div>
                <span className="font-semibold text-accent ml-4 whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-muted/50 rounded text-sm text-muted-foreground space-y-1">
            <p>* Add $3.00 to upgrade to Fried Rice</p>
            <p>* Add $1.50 to substitute noodles</p>
            <p>* Add $3.00 for a specific cut of meat</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-muted text-center text-xs text-muted-foreground space-y-1">
          <p>Please inform us if you have Food Allergies. Our Restaurant will change this menu without prior notice.</p>
          <p>Special Items valid while stocks last.</p>
        </div>
      </div>
    </div>
  )
}
