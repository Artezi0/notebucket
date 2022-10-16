import '../../styles/app.scss'

export default function() {    
  window.setInterval( function() {
    let loader = document.getElementById('loader')
    if (loader) {
      if (loader.innerText.length > 3) loader.innerText = ""
      else loader.innerText += "."
    }
  }, 300)

  return (
    <div className='loader'>
      <svg width='80' height='80' viewBox='0 0 152 152' fill='none' xmlns='https://www.w3.org/2000/svg'>
        <rect x='1' y='1' width='150' height='150' rx='20' fill='black'/>
        <path d='M131.655 55.4545L118.615 134H104.271L78.3835 84.5639H77.7699L69.5241 134H52.9176L65.9574 55.4545H80.5312L106.304 104.852H106.956L115.125 55.4545H131.655Z' fill='#BDBDBD'/>
        <path d='M114.655 32.4545L101.615 111H87.2713L61.3835 61.5639H60.7699L52.5241 111H35.9176L48.9574 32.4545H63.5312L89.304 81.8523H89.956L98.125 32.4545H114.655Z' fill='#E1DFE1'/>
        <path d='M96.6548 18.4545L83.6151 97H69.2713L43.3835 47.5639H42.7699L34.5241 97H17.9176L30.9574 18.4545H45.5312L71.304 67.8523H71.956L80.125 18.4545H96.6548Z' fill='#F5F5F5'/>
        <rect x='1' y='1' width='150' height='150' rx='20' stroke='#B1B1B1'/>
      </svg>
      <p id='loader'></p>
    </div>
  )
}