import React from "react";
import Gate from "./Gate";

const GatesMap = () => {
    const table = [
        {
            position: [20.5,10,-15],
            rotation: true,
        },{
            position: [-5,10,-14.5],
            rotation: true,
        },
        {
            position: [-16,10,-24],
            rotation: true,
        },{
            position: [-46,10,-24],
            rotation: true,
        },
        {
            position: [-51,10,-14],
            rotation: false,
        },
        {
            position: [-51,10,34],
            rotation: false,
        },
        {
            position: [-40,10,52.5],
            rotation: true,
        },
        {
            position: [4,10,52.5],
            rotation: true,
        },
        {
            position: [8,10,32.5],
            rotation: false,
        },
        {
            position: [28,10,23],
            rotation: false,
        },
        {
            position: [28,10,-3],
            rotation: false,
        },
    ]
  return (
    <>
        {table.map((item, i) => (
            <Gate key={i} position={item.position} rotate={item.rotation} i={i} />
        ))}
    </>
  );
};

export default GatesMap;
