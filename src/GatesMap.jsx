import React from "react";
import Gate from "./Gate";

const GatesMap = () => {
    const table = [
        {
            position: [0,10,0],
            rotation: true,
        },{
            position: [0,10,-10],
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
