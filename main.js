const CHATGPT_KEY = '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'

async function onArmarPlan() {
  // alert('estoy funcionando')
  const inputViaje = document.getElementById('inputViaje')
  const divContainer = document.querySelector('.container')
  const btnArmar = document.getElementById('btnArmar')
  divContainer.innerHTML=''
  if (inputViaje.value == '') {
    alert('Escriba a donde desea Viajar')
    return
  }
  divContainer.style.textAlign='center'
  btnArmar.disabled = true
  btnArmar.style.backgroundColor = 'gray'
  btnArmar.style.cursor = 'auto'
  // Crea un elemento de imagen
  var imagen = document.createElement("img");

  // Establece la fuente de la imagen como la URL del GIF
  imagen.src = "./img/gif_cargando.gif";
  const parrafo = document.createElement('h3')
  parrafo.innerHTML = 'Cargando...'
  // Agrega la imagen al div
  divContainer.appendChild(parrafo);
  divContainer.appendChild(imagen);


  const respuesta = await llamarAcharGpt(`eres un guia turistico  experto que recomienda itinerarios de viaje para ${inputViaje.value}. El viaje durara una semana  me haras una lista de actividades  por ejemplo lugares donde comer .... no me hagas saludos, no me confirmes ni me digas nada adicional como por ejemplo no digas "por supuesto" ni similares, antes de mostrarme el itinerario, entonces solo muestrame el itinerarios y nombres  especificos de restaurante `)

  divContainer.innerHTML = respuesta
  btnArmar.disabled = false
  btnArmar.style.backgroundColor = '#96B6C5'
  btnArmar.style.cursor = 'pointer'
  divContainer.style.textAlign ='left'
}

async function llamarAcharGpt(mensage) {
  const bodyRequest = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: mensage }

    ]
  }

  const requests = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHATGPT_KEY}`
    },
    body: JSON.stringify(bodyRequest)
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', requests)
  const data = await response.json()
  console.log(data)
  console.log(data.choices)
  console.log(data.choices[0])
  console.log(data.choices[0].message.content)
  return data.choices[0].message.content
}