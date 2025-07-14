import { forwardRef } from "react";

// El componente ya no recibe la prop "saleOrder".
const OrdenVenta = forwardRef(({detalles_venta}, ref) => {

  const calcularTotal = () =>{
        let total =  detalles_venta.articulos.reduce((acc, actual) =>{
        return acc + actual.subtotal;
    },0)
    console.log("Cantidad total: ", total)
    return total;
    }
    const acumuladoPagoDiferido = (dato) =>{
    let total =  dato.reduce((acc, actual) =>{
        return acc + actual.cantidad_pago;
    },0)
    return total;
}
  // DEFINIMOS LOS DATOS ESTÁTICOS DIRECTAMENTE AQUÍ
  const staticSaleOrder = {
    patientCode: 'PACIENTE-007',
    patientName: 'Juan Pérez García (Dato Estático)',
    patientPhone: '55-1234-5678',
    date: '07/07/2025',
    suggestedDeliveryDate: '15/07/2025',
    saleNumber: 'VENTA-TEST-999',
    items: [
      { code: 'L-SOL-X', description: 'Lentes de Sol Modelo X', quantity: 1, price: 1500.00, subtotal: 1500.00 },
      { code: 'EST-R', description: 'Estuche Rígido para Lentes', quantity: 1, price: 250.00, subtotal: 250.00 },
      { code: 'EX-VISTA', description: 'Examen de la Vista', quantity: 1, price: 300.00, subtotal: 300.00 },
    ],
    total: 2050.00,
    payments: [
      { id: 1, date: '07/07/2025', amount: 1000.00 },
    ],
    remainingAmount: 1050.00,
    attendedBy: 'ADMINISTRADOR',
    opticaAddress: 'Av Nevado de Toluca sector 64',
    opticaPhone: '7299346129'
  };

  const formatCurrency = (amount) => `$ ${parseFloat(amount).toFixed(2)}`;

  return (
    // La ref se asigna al div principal que se va a imprimir
    <div ref={ref} style={{ width: "210mm", padding: "20mm", fontFamily: "Arial, sans-serif", fontSize: "12px", margin: "auto" }}>
      
      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ width: "100px", height: "100px", border: "1px solid #ccc", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="./logo_maray.jpeg" alt="logo" width="100%" height="auto" />
        </div>
        <div style={{ flexGrow: 1, marginLeft: "40px" }}>
          {/* Usamos los datos estáticos */}
          <p><strong>CÓDIGO:</strong> {detalles_venta.id_venta}</p>
          <p><strong>PACIENTE:</strong> {detalles_venta.nombre}</p>
           <p><strong>TELEFONO:</strong> {detalles_venta.telefono}</p>
          <p><strong>FECHA:</strong> {detalles_venta.fecha}</p>
        </div>
      </div>

      <h2 style={{ textAlign: "center", margin: "30px 0" }}>
        VENTA NO. {detalles_venta.id_venta}
      </h2>

      {/* Tabla de Artículos */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Descripción</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Cantidad</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Descuento</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Precio</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles_venta.articulos.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.nombre}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{item.cantidad}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{"%"+item.descuento}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{formatCurrency(item.precio_unitario)}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{formatCurrency(item.subtotal)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", fontWeight: "bold" }}></td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", fontWeight: "bold" }}></td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", fontWeight: "bold" }}></td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", fontWeight: "bold" }}>TOTAL</td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", fontWeight: "bold" }}>{formatCurrency(calcularTotal())}</td>
          </tr>
        </tbody>
      </table>
      <h2 style={{ textAlign: "center", margin: "30px 0" }}>
        Pagos Realizados
      </h2>

      {/* Tabla de Artículos */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Fecha</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {detalles_venta.pago_realizados.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index+1}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{item.fecha}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right" }}>{item.cantidad_pago}</td>
            </tr>
          ))}
         
        </tbody>
      </table>

      {/* Pie de página */}
      <p style={{ fontWeight: "bold" }}>
        Cantidad restante: <span style={{ color: "red" }}>{formatCurrency( (calcularTotal()  - acumuladoPagoDiferido(detalles_venta.pago_realizados))  )}</span>
      </p>
    </div>
  );
});

export default OrdenVenta;