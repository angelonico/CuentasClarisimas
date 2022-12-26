import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import { useState, useEffect } from "react";
import { isConditionalExpression } from "typescript";

var precio = 0;
var cant = 0;


const TodoItem = ({ item }) => {
  const [checked, setChecked] = useState(item.done);
  const [mesas]=[];
  const [mesaAbierta]=[];
  const [clientePidiendo]=[];
  
  useEffect(()=>{
    mesas=JSON.parse(localStorage.getItem("Mesas"))
    let i=0;
    mesas.forEach(elemento=>{
      if(elemento.identi){
        mesaAbierta=i; //Establece la mesa en que se hizo click
        let j = 0;
        elemento.clientes.forEach(cliente=>{
          if (cliente.identi){
            clientePidiendo = j;
          }
          j++;
        })
      }
      i++;
    })
    refresh();
    actualizarInfoItem(0,0);
  });

  
  function actualizarListaPedido(id, cantidad, pedidoCliente){ //id es el id del producto, y cantidad es la cantidad de productos que se están solicitando, puede ser 1 (pedir) o -1 (devolver)
    var pedido_existente = false; // Booleano que se usa para ver si el cliente ya pidió el mismo elemento anteriormente
    let itemCantidad=document.querySelectorAll(".cantidad-item");
    
    for (let i = 0; i < pedidoCliente.length; i++){ //Recorrer el pedido del cliente
      if (pedidoCliente[i][0] == id){ // verifica si el elemento ya fue pedido anteriormente
        pedido_existente = true;
        if ((pedidoCliente[i][1] + cantidad)>=0){  // verifica que no se devuelvan elementos que no se hayan pedido (imposibilita tener -1 elementos)
          pedidoCliente[i][1] += cantidad;
          itemCantidad[id].innerHTML=pedidoCliente[i][1];
        }
      }
    }

    if (!pedido_existente){ //Si el elemento que se esta pidiendo no se pidió con anterioridad, entra aquí
      if (cantidad>0){ //Verifica que no se estén restando elementos
        var agregar_pedido = [id,cantidad];
        pedidoCliente.push(agregar_pedido);
        itemCantidad[id].innerHTML=pedidoCliente[pedidoCliente.length-1][1];
      }
    }
    console.log("pedido despues de ordenar: " + pedidoCliente);
    return pedidoCliente;
  }
  
  function getPedido(cant){
    let mesas = JSON.parse(localStorage.getItem("Mesas"));
    let pedido = mesas[mesaAbierta].clientes[clientePidiendo].pedido;
    console.log("Pedido antes de ordenar: "+ pedido); 
    mesas[mesaAbierta].clientes[clientePidiendo].pedido = actualizarListaPedido(item.id, cant, pedido);
    localStorage.setItem("Mesas",JSON.stringify(mesas));
  }

  
  function guardar_total(suma){
    var total = 0;
    mesas = JSON.parse(localStorage.getItem("Mesas"));
    total = mesas[mesaAbierta].clientes[clientePidiendo].subtotal + suma;
    if (total<0){
      total -= suma;
    }
    mesas[mesaAbierta].clientes[clientePidiendo].subtotal = total;
    localStorage.setItem("Mesas", JSON.stringify(mesas));
    console.log(total);
  }

  function refresh(){
    var b;
    mesas = JSON.parse(localStorage.getItem("Mesas"));
    let clientes = mesas[mesaAbierta].clientes;
    let pidiendo = clientes[clientePidiendo];
    let mostrar_total = pidiendo.subtotal;
    b = document.getElementById("total_a_pagar");

    b.innerHTML="Total $"+mostrar_total;
  }

  function actualizarInfoItem(precio,cant){
    getPedido(cant);
    guardar_total(precio);
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