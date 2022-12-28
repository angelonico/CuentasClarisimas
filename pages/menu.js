import Head from "next/head";
import TodoItem from "../components/todoItem";

import { useEffect } from "react";

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

const Menu = ({data}) => {
  const [mesas]=[]
  const [mesaAbierta]=[]
  const [clientePidiendo]=[]

  useEffect(()=>{
    mesas=JSON.parse(localStorage.getItem("Mesas"));
    let i=0;
    mesas.forEach(elemento=>{
      if(elemento.identi){
        mesaAbierta=i;
        let j=0
        elemento.clientes.forEach(elemento2=>{
          if(elemento2.identi){
            clientePidiendo=j;
          }
          j++
        })
        let t=document.querySelector(".titulo");

        t.innerHTML="MESA " + (mesaAbierta+1) +
          ", CLIENTE " + (clientePidiendo+1) + " PIDIENDO...";
      }
      i++;
    })
  })

  useEffect(() => {
    data.map((item, index) => {
      if (localStorage.getItem(item.id) === null) {
      }
      //localStorage.setItem(item.id + "__object", JSON.stringify(item));
    });
  }, []);

  function buscar(e){
    if(e.key==="Escape") e.target.value=""; //Para eliminar busqueda con escape
    document.querySelectorAll(".item").forEach(productito=>{ //Itera por los items de los productos
      const titulo=productito.querySelector(".item-title"); //Seleccioa el titulo del producto del respectivo item
      if(titulo.textContent.toLocaleLowerCase().indexOf(e.target.value.toLowerCase())!==-1){ //Compara el titulo con la busqieda
        productito.classList.remove("filtro"); //Si coincide, quita clase filtro, es decir, lo hace visible
      }else{
        productito.classList.add("filtro"); //Agrega clase flitro, es decir, lo hace invisible
      }
      //La clase filtro esta definida en style.css
    })
  }

  function finalizaCliente(){
    alert(`Precio a pagar: 
      Total: $`+mesas[mesaAbierta].clientes[clientePidiendo].subtotal)
    mesas=JSON.parse(localStorage.getItem("Mesas"));
    mesas[mesaAbierta].clientes[clientePidiendo].subtotal=0;
    mesas[mesaAbierta].clientes[clientePidiendo].pedido=[];
    mesas[mesaAbierta].clientes[clientePidiendo].identi=!mesas[mesaAbierta].clientes[clientePidiendo].identi;
    mesas[mesaAbierta].clientes[clientePidiendo].visible=false;
    localStorage.setItem("Mesas",JSON.stringify(mesas))
  }
  
  return (
    <div className="container">

      <Head>
        <title> Menú </title>
      </Head>
      
      <main className="main">
        <h1 className="titulo"></h1>

        <input type="text" id="buscador" placeholder="Buscador..." onKeyUp={(e) =>{
          buscar(e);
        }
        }></input>
        
        <div className="a-pedir">
          {data.map((item, index) => (
            <TodoItem className="itemProducto" key={index} item={item} />
          ))}
        </div>

        <div id = "total_a_pagar"></div>

        <a className="finalizar_2" href="mesa" onClick={()=>{
          finalizaCliente();
          }}> Pagar
        </a>
        

        <a className="back" href="mesa" onClick={()=>{
          mesas=JSON.parse(localStorage.getItem("Mesas"));
          mesas[mesaAbierta].clientes[clientePidiendo].identi=!mesas[mesaAbierta].clientes[clientePidiendo].identi;
          localStorage.setItem("Mesas",JSON.stringify(mesas));
        }}> ATRÁS </a>

      </main>
    </div>
  );
};

export default Menu;