import {
  UtensilsCrossed, Car, ShoppingBag, Tv2, Heart,
  Zap, Banknote, Laptop, MoreHorizontal
} from 'lucide-react'
import { CATEGORIES } from '../../constants/categories'

const ICON_MAP = {
  UtensilsCrossed, Car, ShoppingBag, Tv2, Heart,
  Zap, Banknote, Laptop, MoreHorizontal
}

export default function CategoryIcon({ category, size = 15 }) {
  const cat = CATEGORIES[category]
  if (!cat) return null
  const Icon = ICON_MAP[cat.icon]
  return (
    <div className={`w-8 h-8 rounded-lg ${cat.bg} ${cat.border} border flex items-center justify-center shrink-0`}>
      {Icon && <Icon size={size} className={cat.text} />}
    </div>
  )
}