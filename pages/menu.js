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

      <a className="back" href="mesa"> Atrás </a>

    </div>
  );
};

export default Menu;