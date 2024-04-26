import React from "react";
import formatToVND from "../../../components/formatToVND";
import formatDate from "../../../components/formatDate";
import { LiaEditSolid } from "react-icons/lia";

export default function Item({ data, index }) {
  return (
    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
      <th>{index + 1}</th>
      <td>{formatToVND(data.rate)}</td>
      <td>{formatDate(data.start_date)}</td>
      <td>{formatDate(data.end_date)}</td>
      <td>
        <LiaEditSolid size={20} />
      </td>
    </tr>
  );
}
