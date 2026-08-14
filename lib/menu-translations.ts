import React from 'react'

const translations: Record<string, string> = {
  'Hong Kong Style': '港式',
  Omelette: '奄列',
  Healthy: '營養系列',
  'Noodle Soup': '湯麵',
  Sandwich: '三文治',
  'Congee Combo': '生滾粥類套餐',
  Toast: '多士類',
  'Breakfast Combo': '早餐套餐',
  'À La Carte': '單點',
  'Optional Add-ons': '加配',
  'Toast Options': '多士選擇',
  'Two Eggs': '雙蛋',
  'Toast or Hash Brown or French Toast': '多士 薯餅 西多士',
  'Sunny Side-up': '太陽蛋',
  'Over Easy': '反蛋',
  'Over Hard': '蛋全熟',
  Scramble: '炒蛋',
  'Hot Drink Included': '奉送熱飲',
  'Chinese Donut': '油條',
  'Pan Fried Noodle with Supreme Soya Sauce': '豉油王炒麵',
  'Pan Fried Radish Cake': '香煎蘿蔔糕',
  'Salty Pork Rice Wrap': '鹹肉糭',
  'Hong Kong Style Rice Rolls w/Mixed Sauce': '混醬腸粉',
  'French Toast': '法式西多士',
  'French Toast half (+$1)': '西多士半份 (+$1)',
  'Condensed Milk & Butter Toast': '奶油多士',
  'Condensed Milk & Peanut Butter Toast': '奶醬多士',
  'Ham or Luncheon Meat or Bacon or Sausage': '火腿 午餐肉 煙肉 香腸',
  'Cheese, Mushroom, Ham, Shredded Chicken, Sausage (Choice of Two Kinds)':
    '芝士 蘑菇 火腿 雞絲 香腸（任選兩款）',
  'Pan Fried Pork Chop or Chicken Steak or Cutlet Fish':
    '香煎豬扒 雞扒 吉列魚柳',
  'Satay Beef or Shredded Pork with Snow Veg, or Preserved Veg, or Minced Beef or Ham or Dumpling/Wonton or Beef Brisket':
    '沙嗲牛肉 雪菜肉絲 榨菜肉絲 牛肉鬆 火腿 水餃／雲吞 牛腩',
  'Satay Beef or Shredded Pork with Snow Veg, or Preserved Veg, or Minced Beef or Ham or Dumpling/Wonton or Beef Brisket or Chicken Steak or Pork Chop':
    '沙嗲牛肉 雪菜肉絲 榨菜肉絲 牛肉鬆 火腿 水餃／雲吞 牛腩 雞扒 豬扒',
  'Macaron or Vermicelli or Noodle or Rice Noodle or Instant Noodle (+$1.00)':
    '通粉 米粉 河粉 米線 出前一丁 (+$1.00)',
  'Egg, Tomato, Ham, Cheese, Luncheon Meat':
    '雞蛋 蕃茄 火腿 芝士 午餐肉',
  'Choice of any two kinds': '任選兩款',
  'Beef Congee, Minced Beef Congee, Sampan Seafood Congee, Sliced Fish Congee, Chicken & Chinese Mushroom Congee, Pork & Preserved Egg Congee':
    '牛肉粥 碎牛肉粥 艇仔粥 魚片粥 北菇滑雞粥 皮蛋瘦肉粥',
  '+$1.00': '+$1.00',
}

export function bilingual(value: string) {
  return translations[value] ? `${translations[value]} ${value}` : value
}

export function chineseTranslation(value: string) {
  return translations[value] ?? value
}

export function BilingualText({
  value,
  className = '',
}: {
  value: string
  className?: string
}) {
  const chinese = translations[value]

  return React.createElement(
    'span',
    {
      className: `inline-flex max-w-full flex-wrap items-baseline gap-x-3 gap-y-0 align-baseline ${className}`,
    },
chinese && React.createElement(
      'span',
      {
        className:
          'font-sans text-[0.92em] font-normal leading-snug text-muted-foreground [font-family:var(--font-chinese),"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif]',
      },
      chinese,
    ),
    React.createElement('span', { className: 'leading-snug' }, value),
  )
}
