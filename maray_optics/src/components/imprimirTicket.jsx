import React from "react";
import { forwardRef } from "react";



const Ticket = forwardRef(({  sale, obtenerTotal }, ref) => (


  <div
    ref={ref}
    style={{
      width: "300px",
      padding: "10px",
      fontFamily: "monospace",
      border: "1px solid black",
      margin: "auto",
    }}
  >
    <img src="./logo_maray.jpeg" alt="logo" width='100%' />
    <h2 style={{ textAlign: "center" }}>Maray optics</h2>
    <p>Paciente: Venta Publico</p>
    
    <p>Fecha: {sale.fecha}</p>
    <hr />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>Articulo</span>
      <span>cantidad</span>
      <span>Precio</span>
    </div>
    {sale.articulos.map((item, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{item.nombre}</span>
        <span>{item.cantidad}</span>
        <span>${item.subtotal }</span>
      </div>
    ))}
    
    <hr />
    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
      <span>Total</span>
      <span>${obtenerTotal()  }</span>
    </div>
    <hr />
    <p style={{ textAlign: "center" }}>¡Gracias por su compra!</p>
     {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
      <p style={{ textAlign: "center" }}>Maray optics <br />AV 661 Col. san juan de
        Aragon</p>

     {/* </div> */}
    
  
  </div>
));

export default Ticket;
