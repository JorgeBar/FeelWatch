console.log("FeelWatch is running!");

function Alerts(msg){ 
    alert(msg); }

const Botones = [
{id: "blowBtn", mensaje: "Te vuela la cabeza bro"},
{id: "RainBtn", mensaje: "La que está cayanedo"},
{id: "NostBtn", mensaje: "Hace mucho que no la veo"},
{id: "SadBtn", mensaje: "Estoy un poco meh"},
{id: "newBtn", mensaje: "Crea tu lista"}
]

Botones.forEach(element => {
  const boton = document.getElementById(element.id)
  console.log(boton);
  boton.addEventListener('click',()=>Alerts(element.mensaje))
});