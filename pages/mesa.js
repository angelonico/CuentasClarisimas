import Head from "next/head";
import { useState, useEffect } from "react";
import Tarjeta from "../components/tarjeta";

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/data/todo.json");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

const Mesa = ({data}) => {
  const [personasCantidad, setPersonasCantidad] = useState(2);
  const [mesas]=[];
  
  const [personas, setPersonas] = useState([
    { name: "Persona 1" },
  ]);
  
  useEffect(() => {//Carga en un todo
    mesas=JSON.parse(localStorage.getItem("Mesas"))
    let i=0;
    mesas.forEach(elemento=>{
      elemento.Personas=personas;
    })
    localStorage.setItem("Mesas",JSON.stringify(mesas));
      
      //localStorage.setItem(item.id + "__object", JSON.stringify(item));
  });

  //useEffect(() => setElementos2([]), []);

  function addPersonasCantidad() {
    setPersonasCantidad(personasCantidad + 1);
  }

  const addElemento = (tex) => {
    const newPersona= [...personas, { name: tex}];
  
    setPersonas(newPersona);
    addPersonasCantidad();
    console.log(localStorage);
  };

  return (
    <div className="container">
      <Head>
        <title> Mesa </title>
      </Head>
      
      <main className="main_2">

        <h1 className="titulo"> PERSONAS A TU ATENCIÓN </h1>

        <div className="pedido">
          ajua
        </div>

        <div className="grid_2">
          {personas.map((item, index) => (
            <a href="menu"><Tarjeta texto={item.name} /></a>
        ))}
        </div>
        
      </main>

      <button
          className="botoncito"
          onClick={() => addElemento("Persona " + personasCantidad)}
          >
          Agregar pesonas (+)
        </button>
            
      <a className="back" href="/.."> Atrás </a>

    </div>
  );
};

export default Mesa;
