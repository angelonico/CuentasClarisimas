import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
const Index = () => {
  return (
    <div className="container" id="principal">
      <Head>
        <title>INFO104 Nextjs App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Image
          src="/images/eye.png"
          height={294} // Desired size with correct aspect ratio
          width={470} // Desired size with correct aspect ratio
          alt="ojo"
        />

        <h1 className="title">¿Cómo ha sido tu semana?</h1>
        <div className="title">
          <a href="http://www.google.com" target="_blank">
            Ir a google
          </a>
        </div>
        <p className="description">
          Este código está en <code>pages/index.js</code>
        </p>

        <div className="grid">
          <Link
            href={{
              pathname: "/response",
              query: { opt: 0, msg: "este es el mensaje" },
            }}
          >
            <a className="card">Excelente!</a>
          </Link>
          <Link
            href={{
              pathname: "/response",
              query: { opt: 1 },
            }}
          >
            <a className="card">Más o menos no mas!</a>
          </Link>
          <Link
            href={{
              pathname: "/response",
              query: { opt: 2 },
            }}
          >
            <a className="card">Horrible! :(</a>
          </Link>
          <a className="card" href="/response?opt=0&msg=hola%20chao">
            click me!
          </a>
        </div>
      </main>

      <footer>
        <a href="https://github.com/PabloSzx/INFO104-2021-1" target="_blank">
          Repositorio y tutorial
        </a>
        &nbsp;-&nbsp;
        <Link href="/about">
          <a>Sobre esta página</a>
        </Link>
      </footer>
    </div>
  );
};

export default Index;
