import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/700.css'
import './mainText.css'

function MainText() {
  return (
    <>
 
    <div className="text-box">
           <img id="first-tape"  src="./public/img/first-tape.png" alt="tape" />
        <p class="default-text">
            esta es una pequeña lista de deseos de cumpleaños para entrenar mis
            habilidades de front-end cómo desarollo de apis en .net para mostrar
            opciones de primera y segunda mano. <br/>
         <span class="sub-text">♡ whatever comes from your hands is fully acepted ♡</span>
       </p>  
        <img id="second-tape" className="second-tape" src="./public/img/second-tape.png" alt="tape" />
    </div>
    </>
  )
}

export default MainText