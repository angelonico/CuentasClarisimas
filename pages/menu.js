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
  useEffect(() => {
    data.map((item, index) => {
      console.log(item.id);
      if (localStorage.getItem(item.id) === null) {
        localStorage.setItem(item.id, JSON.stringify(item.done));
      }
      //localStorage.setItem(item.id + "__object", JSON.stringify(item));
    });
  }, []);

  function buscar(e){
    /*
    if(e.target.matches("#buscador")){

      //if (e.key ==="Escape")e.target.value = "";

      document.querySelectorAll(".itemProducto").forEach(producto =>{

          producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
      })*/

    const b=document.querySelector(".todo-list");
    console.log("BUSQUEDA: "+e.target.value);
    for(let i=0;i<data.length;i++){
      const resultado=data[i].title;
      if(resultado.toLowerCase().indexOf(e.target.value)!==-1){
        console.log(resultado)
      }
    }/*
    console.log(data[0].price);
    e.target.matches("#buscador");
    console.log(e.target.value)*/
  }
  
  return (
    <div className="container">

      <Head>
        <title> Menú </title>
      </Head>
      
      <main className="main_1">
        <h1 className="titulo"> CARTA DISPONIBLE </h1>

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
      </main>

      <a className="back" href="/.."> Atrás </a>

    </div>
  );
};

export default Menu;