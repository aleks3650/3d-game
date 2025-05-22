import React from 'react'
import WrongDirSign from './WrongDirSign'

const WrongDirMap = () => {
    const table = [
        {
            position: [-13,10,-7],
            rotation: false,
        },
        {
            position: [-17,10,-10],
            rotation: true,
        }, 
        {
            position: [-47,10,-4],
            rotation: true,
        }, 
        {
            position: [-47,10,28],
            rotation: true,
        }, 
        {
            position: [-17,10,48],
            rotation: false,
        }, 
        {
            position: [2,10,25],
            rotation: true,
        },  
        {
            position: [8,10,22],
            rotation:false,
        },  
    ]
  return (
    <>
    {table.map((item, i) => (
        <WrongDirSign key={i} position={item.position} rotate={item.rotation} />
    ))}
</>
    )
}

export default WrongDirMap