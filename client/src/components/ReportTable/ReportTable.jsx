import React from "react";
import { Link } from "react-router-dom";

export default function ReportTable({ data }) {
  console.log(data);
  let columns = data[0] && Object.keys(data[0]);
  return (
    <table cellPadding={0} cellPadding={0}>
      <thead>
        <tr>{data[0] && columns.map((heading) => <th key={heading}  >{heading}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td key={row[column]} >{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    // <div className="container">
    //   {data.length === 0 ? (
    //     "You currently have no orders created."
    //   ) : (
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th scope="col">Order Number</th>
    //           <th scope="col">Name</th>
    //           <th scope="col">Gender</th>
    //           <th scope="col">Garment Type</th>
    //           <th scope="col">Fabric</th>
    //           <th scope="col">Fitting</th>
    //           <th scope="col">Style</th>
    //           <th scope="col">Booking Status</th>
    //           <th scope="col">Status</th>
    //           <th scope="col">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((ticket) => (
    //           <tr key={ticket._id}>
    //             <td>{ticket.order_number}</td>
    //             <td>{ticket.name}</td>
    //             <td>{ticket.gender}</td>
    //             <td>{ticket.garment_type}</td>
    //             <td>{ticket.fabric}</td>
    //             <td>{ticket.fitting}</td>
    //             <td>{ticket.choose_style}</td>
    //             <td>
    //               {ticket.booking === "1"
    //                 ? "Pending"
    //                 : ticket.booking === "2"
    //                 ? "Approved"
    //                 : ticket.booking === "3"
    //                 ? "Completed"
    //                 : "Rejected"}
    //             </td>

    //             <td>{ticket.status}</td>

    //             <td>
    //               <Link to={`/ticket/${ticket._id}`}> view</Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
}
