import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import TodoItem from "../components/todoItem";
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

const Index = ({data}) => {
  const [likes, setLikes] = useState(3);
  const elementos = [
    { texto: "Mesa 1" },
    { texto: "Mesa 2" },
  ];
  const [elementos2, setElementos2] = useState([
    { texto: "Mesa 1" },
    { texto: "Mesa 2" },
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


  return(
    <div className="container" id="principal">
      <Head>
        <title>Mesas</title>
      </Head>
      <main>
        <h1>Mesas a tu atencion</h1>
        <div className="description">
          <button
            id="botonTarjeta"
            onClick={() => addElemento("Mesa " + likes)}
          >
            Agregar Tarjeta
          </button>
        </div>
        {elementos2.map((item, index) => (
          <a href="mesa"><Tarjeta texto={item.texto} /></a>
        ))}
        
      </main>

    </div>
  )
};

export default Index;