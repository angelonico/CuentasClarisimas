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

const Mesa = ({data}) => {
  const [mesas]=[];
  const mesaAbierta=0; //Mesa en la que se hizo click
  const [info] = useState(data);
  const mesa = info[0];
  const clientes = mesa.clientes;

  console.log(clientes)
  
  useEffect(() => {
    cargar_localStorage();
    let i=0;
    mesas.forEach(elemento=>{
      if(elemento.identi){
        mesaAbierta=i; //Establece la mesa en que se hizo click
        let t=document.querySelector(".titulo");
        t.innerHTML="Mesa "+(mesaAbierta+1);
        clientes = mesas[mesaAbierta].clientes;
        console.log(clientes);
      }
      i++;
    })
    guarda_localStorage();
  });

  useEffect(() => {
    visibilidad();
  })

  function addElemento(){ //Deja visible una nueva mesa
    let unico=true,i=0;
    document.querySelectorAll(".tarjetaCliente").forEach(elemento=>{ //Itera por las mesas
      if(elemento.classList.contains("filtro") && unico){ //Encuentra la nueva mesa (es la siguiente sin visibilidad)
        elemento.classList.remove("filtro"); //Hace visible la mesa
        
        mesas=JSON.parse(localStorage.getItem("Mesas"));//Obtiene el localstorage
        clientes[i].visible=!clientes.visible; //Agrega la nueva mesa visible
        mesas[mesaAbierta].clientes=clientes;
        localStorage.setItem("Mesas",JSON.stringify(mesas)); //Guarda el local storage

        unico=false;
      }
      i++;
    })
  }

  function visibilidad(){ //Similar a un refresh()
    let i=0;
    document.querySelectorAll(".tarjetaCliente").forEach(elemento=>{ //Itera por las mesas
      if(!clientes[i++].visible){ //Checkea para saber si debe ocultarlo o no
        elemento.classList.add("filtro"); //Clase que oculta, definida al final de style.css
      }else{
        elemento.classList.remove("filtro");
      }
    })
  }
  function cargar_localStorage(){
    mesas=JSON.parse(localStorage.getItem("Mesas")) //Trae local storage
  }

  function guarda_localStorage(){
    localStorage.setItem("Mesas",JSON.stringify(mesas)); //Guarda local storage
  }

  return (
    <div className="container">
      <Head>
        <title> Mesa </title>
      </Head>
      
      <main className="main_2">

        <h1 className="titulo"></h1>

        <div className="pedido">
          Personas a tu atencion
        </div>

        <div className="grid_2">
          {clientes.map((item, index) => (
            <a href="menu" className="tarjetaCliente" onClick={()=>{
              let iden=item.numero_cliente-1;

              cargar_localStorage();
              mesas[mesaAbierta].clientes[iden].identi=!mesas[mesaAbierta].clientes[iden].identi;
              guarda_localStorage();
            }
            }><Tarjeta texto={"Cliente "+item.numero_cliente} /></a>
        ))}
        </div>
        
      </main>

      <button
          className="botoncito"
          onClick={() => addElemento()}
          >
          Agregar pesonas (+)
        </button>
            
      <a className="back" href="/.." onClick={()=>{ //Cierra la mesa        
        mesas=JSON.parse(localStorage.getItem("Mesas"));
        mesas[mesaAbierta].identi=!mesas[mesaAbierta].identi; 
        localStorage.setItem("Mesas",JSON.stringify(mesas)); 
      }}> Atrás </a>

    </div>
  );
};

export default Mesa;
