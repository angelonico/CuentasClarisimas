import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import { useState, useEffect } from "react";
import { isConditionalExpression } from "typescript";

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
  
  useEffect(()=>{
    refresh();
    actualizarInfoItem(0,0);
  });
  
  function actualizarListaPedido(id, cantidad){ //id es el id del producto, y cantidad es la cantidad de productos que se están solicitando, puede ser 1 (pedir) o -1 (devolver)
    let pedido = JSON.parse(localStorage.getItem("pedido")); // "Recoge" el pedido guardado en el localStorage
    var pedido_existente = false; // Booleano que se usa para ver si el cliente ya pidió el mismo elemento anteriormente
    let itemCantidad=document.querySelectorAll(".cantidad-item");
    let x = false; // Booleano utilizado para verificar si se realizo algún pedido y se haya modificado el arreglo del pedido del cliente (ya seaa agregar o quitar elementos)
    for (let i = 0; i < pedido.length; i++){ //Recorrer el pedido de 1 cliente
      if (pedido[i][0] == id){ // verifica si el elemento ya fue pedido anteriormente
        pedido_existente = true;
        if ((pedido[i][1] + cantidad)>=0){  // verifica que no se devuelvan elementos que no se hayan pedido (imposibilita tener -1 elementos)
          pedido[i][1] += cantidad;
          x = true;
          itemCantidad[id].innerHTML=pedido[i][1];
          let n=0;
          for(let j in itemCantidad){
            console.log("Item "+n+" "+j);
            n++;
          }
        }
      }
    }

    if (!pedido_existente){ //Si el elemento que se esta pidiendo no se pidió con anterioridad, entra aquí
      if (cantidad>0){ //Verifica que no se estén restando elementos
        var agregar_pedido = [id,cantidad];
        pedido.push(agregar_pedido);
        itemCantidad[id].innerHTML=pedido[pedido.length-1][1];
      x = true;
      }
    }
    localStorage.setItem("pedido", JSON.stringify(pedido));
    return x;
  }

  function crearListaPedido(id){
    let pedido = [[id, 0]];
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
      <div className="item">
        <div className="item-title"> {item.title} </div>
        <div className= "precio"> ${item.price} </div>
        
        <button className="boton-precio" onClick={(e) =>{
          precio = item.price;        
          actualizarInfoItem(precio,1);
        }
        }> +
        </button>

        &nbsp;/&nbsp;

        <button className="boton-precio" onClick={(e) =>{
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