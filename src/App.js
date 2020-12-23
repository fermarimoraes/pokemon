import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./componentes/Pokemon";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./img/pokemon.jpeg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 3,
  },

  buttonMenu: {
    margin: "10px",
  },

  imgPokemon: {
    display: "flex",
    justifyContent: "center",
  }
});

function App() {
  const [lista, setLista] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const buscarListaPokemon = async () => {
      const response = await axios.get(url);
      setLista(response.data.results);
      setNext(response.data.next);
      setPrevious(response.data.previous);
    };
    buscarListaPokemon();
  }, [url]);

  const aoClicarNext = () => {
    setUrl(next);
  };

  const aoClicarPrevious = () => {
    setUrl(previous);
  };

  return (
    <div >
      <div className={classes.imgPokemon}>
      <img src={logo} />
      </div>
      <div >
        <Button
          className={classes.buttonMenu}
          onClick={aoClicarPrevious}
          disabled={previous === null}
          variant="contained"
          color="primary"
        >
          Anterior
        </Button>
        <Button
          className={classes.buttonMenu}
          onClick={aoClicarNext}
          disabled={next === null}
          variant="contained"
          color="primary"
        >
          Próximo
        </Button>
      </div>
      <ul className={classes.root}>
        {lista.map((pokemon) => {
          return <Pokemon url={pokemon.url} />;
        })}
      </ul>
    </div>
  );
}

export default App;
