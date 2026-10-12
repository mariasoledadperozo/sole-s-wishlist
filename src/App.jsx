import './App.css'
import MainTitle from './mainTitle.jsx'
import MainText from './mainText.jsx'
import TreeCats from './treeCats.jsx'
import Product from './product.jsx'
import { getGifts } from './service/giftService.js'
import { Analytics } from "@vercel/analytics/react"

function getLowestOptionPrice(gift) {
  if (gift.isFree) return Number.NEGATIVE_INFINITY

  const prices = gift.options
    .map((option) => option.price)
    .filter((price) => typeof price === 'number')

  return prices.length > 0 ? Math.min(...prices) : Number.POSITIVE_INFINITY
}

function App() {
  const gifts = [...getGifts()].sort(
    (firstGift, secondGift) => getLowestOptionPrice(firstGift) - getLowestOptionPrice(secondGift)
  )

  return (
    <main>
      <MainTitle />
      <MainText />
      <TreeCats />

      <section className="product-section">
        {gifts.map((gift) => {
          const pricedOptions = gift.options.filter((option) => typeof option.price === 'number')
          const prices = pricedOptions.map((option) => option.price)
          const currency = pricedOptions[0]?.currency ?? ''
          const price = gift.isFree
            ? 'Gratis'
            : prices.length === 0
            ? null
            : prices.length === 1
              ? `${prices[0]} ${currency}`.trim()
              : `${Math.min(...prices)} - ${Math.max(...prices)} ${currency}`.trim()

          return (
            <Product
              key={gift.id}
              title={gift.name}
              description={gift.description}
              images={gift.images}
              options={gift.options}
              isFree={gift.isFree}
              price={price}
            />
          )
        })}
      </section>
      <TreeCats />
    </main>
  )
}

export default App