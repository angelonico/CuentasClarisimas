import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import TodoItem from "../components/todoItem";
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
<Layout pageId="page4">
    <div>
      <Head>
        <title>Mesa</title>
      </Head>
      <h1>Giles a tu atencion</h1>
        <div className="description">
          <button
            id="botonTarjeta"
            onClick={() => addElemento("Persona " + likes)}
          >
            Agregar Personas
          </button>
        </div>
        {elementos2.map((item, index) => (
          <a href="menu"><Tarjeta texto={item.texto} /></a>
        ))}
    </div>
    <footer>
      <a className="card" href="/..">Volver</a>
    </footer>

</Layout>
  
  );
};

export default Mesa;