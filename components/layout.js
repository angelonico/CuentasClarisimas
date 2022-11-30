import Head from "next/head";
import Link from "next/link";
import ViewCount from "../components/viewCount";
import React, { useState } from "react";

const Layout = ({ children, pageId }) => {
  const [nViews, setViews] = useState(0);
  
  function incrementViews() {
    //console.log(nViews);
    setViews(nViews + 1);
  }
  function resetViews() {
    setViews(0);
  }

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Ejemplo de sitio web con menú" />
      </Head>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
