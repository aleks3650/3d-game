import React from "react";
import Gate from "./Gate";

const GatesMap = () => {
    const table = [
        {
            position: [20.5,10,-15],
            rotation: true,
            ArrowDirecion: -Math.PI/2,
        },{
            position: [-5,10,-14.5],
            rotation: true,
            ArrowDirecion: Math.PI,
        },
        {
            position: [-16,10,-24],
            rotation: true,
            ArrowDirecion: -Math.PI/2,
        },{
            position: [-46,10,-24],
            rotation: true,
            ArrowDirecion: 0,
        },
        {
            position: [-51,10,-14],
            rotation: false,
            ArrowDirecion: -Math.PI/2,
        },
        {
            position: [-51,10,34],
            rotation: false,
            ArrowDirecion: -Math.PI/2,
        },
        {
            position: [-40,10,52.5],
            rotation: true,
            ArrowDirecion: Math.PI/2,
        },
        {
            position: [4,10,52.5],
            rotation: true,
            ArrowDirecion:1* Math.PI,
        },
        {
            position: [8,10,32.5],
            rotation: false,
            ArrowDirecion: 2*Math.PI,
        },
        {
            position: [28,10,23],
            rotation: false,
            ArrowDirecion: Math.PI/2,
        },
        {
            position: [28,10,-3],
            rotation: false,
            ArrowDirecion: -Math.PI,
        },
    ]
  return (
    <>
        {table.map((item, i) => (
            <Gate key={i} position={item.position} rotate={item.rotation} ArrowDirecion={item.ArrowDirecion} i={i} />
        ))}
    </>
  );
};

export default GatesMap;
