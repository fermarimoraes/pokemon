import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';  
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';




const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "50px",
    
  },
  closeButton: {
    position: 'absolute',
    right: "10px",
    top: "5px",
    color: "grey",
  },
});

const Pokemon = (props) => {
  const [open, setOpen] = useState(false)
  const [pokemon, setPokemon] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const buscarPokemon = async () => {
      const response = await axios.get(props.url);
      setPokemon(response.data);
    };
    buscarPokemon();
  }, [props.url]);

  if (pokemon === null) {
    return(
      <div>
      <CircularProgress />
    </div>
    );
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          image={pokemon.sprites.front_default}
          component="img"
          title="imagem pokemon"
          
        />
        <CardContent onClick={handleClick}>
          <Typography gutterBottom variant="h5" component="h2">
            {pokemon.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <div>
      <Dialog open={open}>
      <IconButton  className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          {pokemon.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            Altura: {pokemon.height}
          </DialogContentText>
          <DialogContentText>
            Experiência ao derrotar esse Pokemon: {pokemon.base_experience}
          </DialogContentText>
          <DialogContentText>
            Habilidades: {pokemon.abilities.map((item) => {
              return(
              <p>{item.ability.name}</p>
              )
            })}
          </DialogContentText>
        </DialogContent>
        <Button onClick={handleClose}>Fechar</Button>
      </Dialog>

    </div>
    </div>
  );
};

export default Pokemon;
