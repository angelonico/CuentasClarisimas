import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
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


const Index = ({data}) => {
  useEffect(() => {
    data.map((item, index) => {
      console.log(item.id);
      if (localStorage.getItem(item.id) === null) {
        localStorage.setItem(item.id, JSON.stringify(item.done));
      }
      //localStorage.setItem(item.id + "__object", JSON.stringify(item));
    });
  }, []);
  
  return (
<Layout pageId="page4">
    <div>
      <Head>
        <title>Menú</title>
      </Head>
      <h1 id = "carta">Carta disponible</h1>
      <div className="todo-list">
        {data.map((item, index) => (
          <TodoItem key={index} item={item} />
        ))}
      </div>
            <div id = "total_a_pagar"></div>
            <button type="button"> Agregar </button>
    </div>

</Layout>
  
  );
};

export default Index;