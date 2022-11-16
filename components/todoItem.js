import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from "next/dist/shared/lib/constants";
import { useState, useEffect } from "react";
var precio = 0;
const TodoItem = ({ item }) => {
  const [checked, setChecked] = useState(item.done);

  useEffect(() => {
    if (localStorage.getItem(item.id) !== null)
      setChecked(JSON.parse(localStorage.getItem(item.id)));
  }, []);

  useEffect(() => {
    localStorage.setItem(item.id, JSON.stringify(checked));
  }, [checked]);

  function guardar_total_localstorage(suma){
    let total = JSON.parse(localStorage.getItem("total"));
    total = total + suma;
    localStorage.setItem("total", JSON.stringify(total));
    console.log(total);
  }

  function cargar_total_localstorage(){
    if (localStorage.getItem("total")){
      let total = JSON.parse(localStorage.getItem( " total" ));
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

  return (
    <>
      <div className="todo-item">
        <div className="todo-item-title">{item.title}</div>
        <div className= "precio"> ${item.price} &nbsp;&nbsp; </div>
        
        <div className="todo-item-done">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(!checked);
              if (checked){
                precio = -item.price;
              }
              else{
                precio = item.price;
              }
              cargar_total_localstorage();
              guardar_total_localstorage(precio)
              refresh();
            }}
          />
        </div>
      </div>
    </>
  );
};
export default TodoItem;
