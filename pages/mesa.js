import Head from "next/head";
import { useState, useEffect } from "react";
import Tarjeta from "../components/tarjeta";

import { measureMemory } from "vm";

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
  const [likes, setLikes] = useState(2);
  const elementos = [
    { texto: "Persona 1" },
  ];
  const [elementos2, setElementos2] = useState([
    { texto: "Persona 1" },
  ]);

  //useEffect(() => setElementos2([]), []);

  function addLike() {
    setLikes(likes + 1);
  }

  const addElemento = (tex) => {
    const newElementos2 = [...elementos2, { texto: tex}];

    setElementos2(newElementos2);
    addLike();
  };

  return (
    <div className="container">
      <Head>
        <title> Mesa </title>
      </Head>
      
      <main className="main_2">

        <h1 className="titulo"> PERSONAS A TU ATENCIÓN </h1>

        <div className="pedido">
          ajsdf
        </div>

        <div className="grid_2">
          {elementos2.map((item, index) => (
            <a href="menu"><Tarjeta texto={item.texto} /></a>
        ))}
        </div>
        
      </main>

      <button
          className="botoncito"
          onClick={() => addElemento("Persona " + likes)}
          >
          Agregar pesonas (+)
        </button>
            
      <a className="back" href="/.."> Atrás </a>

    </div>
  );
};

export default Mesa;
