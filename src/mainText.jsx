import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/700.css'
import './mainText.css'

function MainText() {
  return (
    <>
 
    <div className="text-box">
           <img id="first-tape" src="/img/first-tape.png" alt="tape" />
        <p className="default-text">
            esta es una pequeña lista de deseos de cumpleaños para entrenar mis
            habilidades de front-end. <br/>
            opciones de primera y segunda mano. <br/>
         <span className="sub-text">♡ whatever comes from your hands is fully acepted ♡</span>
       </p>  
        <img id="second-tape" className="second-tape" src="/img/second-tape.png" alt="tape" />
    </div>
    </>
  )
}

export default MainText