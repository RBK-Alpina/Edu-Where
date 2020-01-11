import React from "react";
import NavBar from '../nav.jsx';

const Announces = ({ announce }) => (
  <div style={{ border: "black solid 2px" }}>
    {/* <NavBar /> */}
    <h3>{announce.firstName} {announce.lastName}</h3>
    <h3>{announce.categorie}</h3>
    <h3>{announce.region}</h3>
    <h3>{announce.description}</h3>
    <h3>{announce.price} DT</h3>
    <h3>{announce.rating} Stars</h3>
  </div>
)

export default Announces;