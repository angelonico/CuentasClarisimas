import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import { useState, useEffect } from "react";

var precio = 0;
var cant = 0;

const TodoItem = ({ item }) => {
  const [checked, setChecked] = useState(item.done);

  useEffect(() => {
    if (localStorage.getItem(item.id) !== null)
      setChecked(JSON.parse(localStorage.getItem(item.id)));
  }, []);

  useEffect(() => {
    localStorage.setItem(item.id, JSON.stringify(checked));
  }, [checked]);

  function actualizarListaPedido(num, suma){
    let pedido = JSON.parse(localStorage.getItem("pedido"));
    console.log(pedido.length)
    console.log(pedido);
    for (let i = 0; i < pedido.length; i++){
      if (pedido[i][0] == num){
        if (pedido[i][1]>0){
        pedido[i][1] += suma;
        }
      }
    }
    /*let i = {}
    for (i in pedido){
      console.log(i)
      if (i[pedido.id] == num){
        i[pedido.cantidad] += suma;
      }
      else {}
    }
    */

                                   //Como obtener un elemento de una de las estructuras del arreglo
    /*for (var i=0; i<pedido.lenght; i++){
      if (pedido[i].id == num){
        pedido[i].cantidad += suma;
        localStorage.setItem("pedido", JSON.stringify(pedido));
        console.log(pedido)
      }
      else{
        crearListaPedido(num);
      }
  }*/
    

  }

  function crearListaPedido(identificador){
    let newPedido =[identificador, 1]
    let pedido = [newPedido];
    console.log(pedido)
    localStorage.setItem("pedido", JSON.stringify(pedido));
    
  }
  
  function getPedido(suma){
    if (localStorage.getItem("pedido")){
      console.log("Actualizando pedido...")
      actualizarListaPedido(item.id, suma);
    }
    else{
      console.log("Creando nuevo pedido...")
      crearListaPedido(item.id)
    }
    
  }

  function guardar_total_localstorage(suma){
    let total = JSON.parse(localStorage.getItem("total"));
    total = total + suma;
    if (total<0){
      total -= suma;
    }
    localStorage.setItem("total", JSON.stringify(total));
    console.log(total);
  }

  function cargar_total_localstorage(){
    if (localStorage.getItem("total")){
      let total = JSON.parse(localStorage.getItem( "total" ));
    }
    else{
      guardar_total_localstorage(0);
    }
  }
  
  function refresh(){
    var a,b;

    a = localStorage.getItem("total");
    b=document.getElementById("total_a_pagar");

    b.innerHTML="Total $"+a;
  }

  function actualizarInfoItem(k,suma){
    getPedido(suma);
    cargar_total_localstorage();
    guardar_total_localstorage(k)
    refresh();
  }

  return (
    <>
      <div className="todo-item">
        <div className="todo-item-title">{item.title}</div>
        <div className= "precio"> ${item.price} &nbsp;&nbsp; </div>
        
        <button id="botoncito" onClick={(e) =>{
            precio = item.price;        
            actualizarInfoItem(precio,1);
        }
        }> +
        </button>
        /
        <button onClick={(e) =>{
            precio = -item.price;        
            actualizarInfoItem(precio,-1);
        }
        }> -
        </button>
        <div className="cantidad-item">{item.cantidad}</div>
      </div>
    </>
  );
};
export default TodoItem;
