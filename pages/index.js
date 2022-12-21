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

const Index = ({data}) => {
  
  const [elementos2, setElementos2] = useState([1,2]);
  const [likes, setLikes] = useState(elementos2.length+1);

  useEffect(() => {
    
    if (localStorage.getItem("arreglo_mesas")){
    const elementos2 = JSON.parse(localStorage.getItem("arreglo_mesas"));
    const likes = elementos2.length+1; 
    console.log("Obteniendo arreglo desde local storage")
    }

    else{
    localStorage.setItem("arreglo_mesas", JSON.stringify(elementos2));
    const likes = JSON.parse(localStorage.getItem("arreglo_mesas")).length
    console.log("Seteando el arreglo de mesas");
  }
  })
  
  
  
  //console.log(elementos2);
  //useEffect(() => setElementos2([]), []);

  function addLike(n) {
    setLikes(n + 1);
  }

  const addElemento = (tex) => {
    const elementos2 = JSON.parse(localStorage.getItem("arreglo_mesas"));;
    elementos2.push(tex);
    setElementos2(elementos2);
    addLike(elementos2.length);
    localStorage.setItem("arreglo_mesas", JSON.stringify(elementos2));

    /*if (localStorage.getItem("arreglo_mesas")){
      console.log("Obteniendo arreglo de mesas ...")
      let mesas = JSON.parse(localStorage.getItem("arreglo_mesas"));
      total = total + suma;
    }
    else{
      console.log("Creando arreglo de mesas...")
    }

    
    if (total<0){
      total -= suma;
    }
    localStorage.setItem("total", JSON.stringify(total));
    console.log(total);
    */

    console.log(elementos2);
  };

  return (
    <div className="container">
      <Head>
        <title> Mesas </title>
      </Head>

      <main className="main_1">
        <h1 className="titulo"> MESAS A TU ATENCIÓN </h1>

        <div className="grid_1">
          {elementos2.map((item, index) => (
            
            <a href="mesa"><Tarjeta texto={"Mesa "+ (index+1)} /></a>
            
          ))}
        </div>

        <button
            className="botoncito"
            onClick={() => addElemento(likes)}
          >
            Agregar Mesa (+)
        </button>

      </main>
    </div>
  )
};

export default Index;