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

/*  const addElemento = (tex) => {
    const newPersona= [...personas, { name: tex}];
  
    setPersonas(newPersona);
    addPersonasCantidad();
    
    cargar_localStorage();
    mesas[mesaAbierta].Personas=personas;
    guarda_localStorage();
  };
*/

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
            <a href="menu"><Tarjeta texto={"Cliente "+item.numero_cliente} /></a>
        ))}
        </div>
        
      </main>

      <button
          className="botoncito"
          onClick={() => addElemento("Persona " + personasCantidad)}
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
