import './mainTitle.css'

function mainTitle() {
  return (
      <>
        <article className="ajuste">
          <section className="star-container">
            <img src="/img/pink-star-a.png" alt="star-a" id="star-a" className="star"/>
            <img src="/img/white-star-a.png" alt="star-c" id="star-c" className="star"/>
          </section>
            <img src="/img/main-title.png" alt="titulo principal" id="main-title"/>
          <section className="star-container">
            <img src="/img/blue-star-b.png" alt="star-b" id="star-b" className="star"/>
            <img src="/img/gold-star-b.png" alt="star-d" id="star-d" className="star"/>
          </section>
        </article>
      </>
  )
}

export default mainTitle