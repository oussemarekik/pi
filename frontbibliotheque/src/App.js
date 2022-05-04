import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ListLivres from "./Components/Livres/ListLivres";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AjoutLivre from "./Components/Livres/AjoutLivre";
import EditLivre from "./Components/Livres/EditLivre";
import Login from "./Authentification/Login";

function App() {
  return (
    <>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Bibliothèque
              </Typography>
              <Link to="/">
                <Button color="error">Liste des Livres</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route exact path="/livres" element={<ListLivres />}></Route>
          <Route path="/addArticles" element={<AjoutLivre />}></Route>
          <Route path="/editLivres/:_id" element={<EditLivre />}></Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
