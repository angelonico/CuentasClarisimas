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

const Index = ({data}) => {
  useEffect(() => {
    data.map((item, index) => {
      if (localStorage.getItem("arreglo_mesas") === null) {
        let x = [item.numero_mesa];
        localStorage.setItem("arreglo_mesas", JSON.stringify(x));
      }
      else{
        var arreglo = JSON.parse(localStorage.getItem("arreglo_mesas"));
        //console.log("Arreglo: " + arreglo);
        let mesa_existente = false;

        for (var i in arreglo){
          //console.log("Comparando mesa: " + arreglo[i] + ", con item.numero_mesa: " + item.numero_mesa)
          if (arreglo[i] == item.numero_mesa){
            mesa_existente = true;
            //console.log("La mesa ya existe");
          }
        }
        if (!mesa_existente){
            arreglo.push(item.numero_mesa);
            //console.log("Mesa "+ item.numero_mesa + " creada.")
            localStorage.setItem("arreglo_mesas", JSON.stringify(arreglo));
        }
      }
    });
  }, []);

  function addElemento() {
    let arreglo = JSON.parse(localStorage.getItem("arreglo_mesas"));
    let cont = 0;
    let mesa_intermedia = false;
    let numero_mesa_intermedia = 0;
    let arreglo_ordenado = arreglo.sort();
      for (var i in arreglo_ordenado){
        cont++;
        if (cont != arreglo_ordenado[i] && !mesa_intermedia){
          //console.log("Contador: " + cont + " numero en posición " + i + " es " + arreglo_ordenado[i]);
          mesa_intermedia = true;
          numero_mesa_intermedia = cont;
        }
    }
    //console.log("Arreglo_length: " + arreglo_ordenado.length);
    if (mesa_intermedia){
      arreglo_ordenado.push(numero_mesa_intermedia);
    }
    else{
      arreglo_ordenado.push(cont+1);
    }

    console.log(arreglo_ordenado);

    localStorage.setItem("arreglo_mesas", JSON.stringify(arreglo_ordenado));

    //localStorage.setItem("arreglo_mesas", JSON.stringify(arreglo));
  };

  return (
    <div className="container">
      <Head>
        <title> Mesas </title>
      </Head>

      <main className="main_1">
        <h1 className="titulo"> MESAS A TU ATENCIÓN </h1>
        <div className="grid_1">
          {data.map((item, index) => (
            <a href="mesa"><Tarjeta texto={"Mesa "+ (index+1)} /></a>
          ))}
        </div>
        <button
            className="botoncito"
            onClick={() => addElemento()}
          >
            Agregar Mesa (+)
        </button>

      </main>
    </div>
  )
};

export default Index;