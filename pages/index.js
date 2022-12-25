import { get } from "http";
import Head from "next/head";
import { useState, useEffect } from "react";
import Tarjeta from "../components/tarjeta";

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/data/mesa.json");
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
  const [mesas]=useState(data); //Carga los valores del json
  
  useEffect(() => {//Carga los valores del localstorage en mesa o, si no hay valores, guarda los valores de mesa (data) en localstorage
    if(JSON.parse(localStorage.getItem("Mesas"))==null){
      localStorage.setItem("Mesas", JSON.stringify(mesas));
    }else{
      mesas=JSON.parse(localStorage.getItem("Mesas"));
    }
  });

  useEffect(()=>{ //"refresca" las mesas al cagar la pagina
    visibilidad();
  })
  
  function addElemento(){ //Deja visible una nueva mesa
    let unico=true,i=0;
    document.querySelectorAll(".tarjetaMesa").forEach(elemento=>{ //Itera por las mesas
      if(elemento.classList.contains("filtro") && unico){ //Encuentra la nueva mesa (es la siguiente sin visibilidad)
        elemento.classList.remove("filtro"); //Hace visible la mesa
        
        mesas=JSON.parse(localStorage.getItem("Mesas"));//Obtiene el localstorage
        mesas[i].visible=!mesas[i].visible; //Agrega la nueva mesa visible
        localStorage.setItem("Mesas",JSON.stringify(mesas)); //Guarda el local storage

        unico=false;
      }
      i++;
    })
  }

  function visibilidad(){ //Similar a un refresh()
    let i=0;
    document.querySelectorAll(".tarjetaMesa").forEach(elemento=>{ //Itera por las mesas
      if(!mesas[i++].visible){ //Checkea para saber si debe ocultarlo o no
        elemento.classList.add("filtro"); //Clase que oculta, definida al final de style.css
      }else{
        elemento.classList.remove("filtro");
      }
    })

  }

  return (
    <div className="container">
      <Head>
        <title> Mesas </title>
      </Head>

      <main className="main_1">
        <h1 className="titulo"> MESAS A TU ATENCIÓN </h1>
        <div className="grid_1">
          {mesas.map((item, index) => (
            <a className="tarjetaMesa" href="mesa"><Tarjeta texto={"Mesa "+item.numero_mesa} /></a>
          ))}
        </div>
        <button
            className="botoncito"
            onClick={() => addElemento()}
          >
            Agregar Mesa (+)
        </button>

      </main>
    </div>
  )
};

export default Index;