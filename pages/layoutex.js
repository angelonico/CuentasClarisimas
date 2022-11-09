import Tarjeta from "../components/tarjeta";
const LayoutEx = () => {
  let frases = { contenido: ["frase 1", "frase 2", "frase 3"] };

  return (
    <div id="bloquePrincipal">
      <div id="menuLateral">
        <a href="http:www.google.com">Ir a google</a>
      </div>
      <div id="contenidoPrincipal">
        {frases.contenido.map((item, index) => (
          <Tarjeta texto={item}></Tarjeta>
        ))}
      </div>
    </div>
  );
};

export default LayoutEx;
