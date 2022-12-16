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
  return(
    <div className="container" id="principal">
      <Head>
        <title>Mesas</title>
      </Head>
      <main>
        <h1>Mesas a tu atencion</h1>
        <div className="grid">
            <a className="card" href="mesa">Mesa 1</a> 
        </div>
        <div className="grid">
            <a className="card" href="mesa">Mesa 2</a> 
        </div>
      </main>

    </div>
  )
};

export default Index;