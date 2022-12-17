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

  function actualizarListaPedido(id, suma){
    let pedido = JSON.parse(localStorage.getItem("pedido"));
    console.log(pedido.length)
    console.log(pedido);
    var pedido_existente = false;
    let x = false;
    for (let i = 0; i < pedido.length; i++){
      if (pedido[i][0] == id){
        pedido_existente = true;
        if ((pedido[i][1] + suma)>=0){
          pedido[i][1] += suma;
          x = true;
        }
      }
    }
    if (!pedido_existente){
      if (suma>0){
      var agregar_pedido = [id,suma];
      console.log(agregar_pedido);
      pedido.push(agregar_pedido);
      x = true;
      }
    }
    localStorage.setItem("pedido", JSON.stringify(pedido));
    return x;
  }

  function crearListaPedido(id){
    let pedido = [[id, 1]];
    console.log(pedido)
    localStorage.setItem("pedido", JSON.stringify(pedido));
    return true;
    
  }
  
  function getPedido(suma){
    var x = false;
    if (localStorage.getItem("pedido")){
      console.log("Actualizando pedido...")
      x = actualizarListaPedido(item.id, suma);
    }
    else{
      console.log("Creando nuevo pedido...")
      x = crearListaPedido(item.id)
    }
    return x;
    
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

  function actualizarInfoItem(precio,cant){
    if (getPedido(cant)){
    cargar_total_localstorage();
    guardar_total_localstorage(precio);
  }
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
