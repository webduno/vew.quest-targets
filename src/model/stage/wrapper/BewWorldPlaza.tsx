'use client';
import { SolidBox } from '@/model/core/SolidBox';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { Vector3, Object3D } from 'three';
import { useRef } from 'react';
import Bank from '../city/Bank';
import CityHall, { TechHall } from '../city/CityHall';
import SimpleHouse from '../city/SimpleHouse';
import { Tree } from '../nature/Tree';
import { CollisionBox } from '@/model/core/CollisionBox';

export const BewWorldPlaza = () => {

  return (<>
    <ambientLight intensity={.75} />
{/* sun light */}
<directionalLight intensity={.75} position={[-25, 25, -25]} castShadow
shadow-mapSize-blurSamples={2}
shadow-mapSize-radius={.2}
shadow-camera-near={10}
shadow-camera-far={80}
shadow-camera-left={-80}
shadow-camera-right={80}
shadow-camera-top={20}
shadow-camera-bottom={-50}
/>



    {/* spot light */}
    

    {/* <directionalLight intensity={.75} position={[-25, 25, -25]} castShadow/> */}


    <group position={[1,4.5,-22.75]} scale={[10,10,10]} >
      <Bank position={[0,0,0]} />
    </group>

    <group scale={[10,10,10]} rotation={[0, -Math.PI/2, 0]} position={[6,4.5,-15]}>
      <CityHall position={[0,0,0]} />
    </group>
<group position={[12,2,-8]}>
<TechHall />
</group>


    <group position={[-8,4.5,-12.75]} scale={[10,10,10]} rotation={[0, Math.PI/2, 0]}>
      <SimpleHouse />
    </group>

    {/* <pointLight intensity={50} position={[-7, 10, -27]} 
    castShadow
    distance={20}
    />

    <spotLight intensity={15} position={[0, 5.5, -25]} castShadow
    distance={30}
      penumbra={0.5}
    />

<spotLight intensity={5} position={[0, 5, 15]} castShadow
    distance={30}
      penumbra={0.5}
    /> */}


    <group position={[0, 0, 0]}>

    <Box args={[5, .1, 42]}
        position={[3.2,0,0]}
         castShadow  receiveShadow>
          <meshStandardMaterial  color="#dddddd" />
        </Box>
        
        
    <Box args={[.2, .11, 3]}
        position={[3.2,0,0]}
           receiveShadow>
          <meshStandardMaterial  color="#ffffff" />
        </Box>
        
        <Box args={[.2, .11, 3]}
            position={[3.2,0,8]}
               receiveShadow>
              <meshStandardMaterial  color="#ffffff" />
            </Box>
            
        <Box args={[.2, .11, 3]}
            position={[3.2,0,-8]}
               receiveShadow>
              <meshStandardMaterial  color="#ffffff" />
            </Box>
        
        <Box args={[.2, .11, 3]}
            position={[3.2,0,16]}
               receiveShadow>
              <meshStandardMaterial  color="#ffffff" />
            </Box>
            
        <Box args={[.2, .11, 3]}
            position={[3.2,0,-16]}
               receiveShadow>
              <meshStandardMaterial  color="#ffffff" />
            </Box>
        



        <Box args={[5, .1, 10]}
        position={[-3,0,0]}
         castShadow  receiveShadow>
          <meshStandardMaterial  color="#99ff99" />
        </Box>

        <Box args={[5, .1, 10]} 
  position={[-3,0,-12]}
  castShadow  receiveShadow>
    <meshStandardMaterial color="#99ff99" />
  </Box>

<Box args={[5, .1, 10]} 
position={[-3,0,12]}
castShadow  receiveShadow>
  <meshStandardMaterial color="#99ff99" />
</Box>







{/* Tree */}
<Tree position={[-12, 0, -3]} />

{/* main point of interest */}
<Box args={[10, .1, 10]} 
position={[-12,0,0]}
castShadow  receiveShadow>
  <meshStandardMaterial color="#99ff99" />
</Box>








<Box args={[6, .1, 6]} 
position={[-10,0,10]}
castShadow  receiveShadow>
  <meshStandardMaterial color="#99ff99" />
</Box>

<Box args={[6, .1, 6]} 
position={[-10,0,-10]}
castShadow  receiveShadow>
  <meshStandardMaterial color="#99ff99" />
</Box>




{/* water */}
<Box args={[10, .1, 24]} 
position={[12,0,3.5]}
castShadow  receiveShadow>
  <meshStandardMaterial color="#aaeeff" />
</Box>

{/* water barriers */}
<Box  args={[10.5, .25, .75]} 
position={[12,0.25,-8.5]}
castShadow receiveShadow>
  <meshStandardMaterial color="#dddddd" />
</Box>
<Box args={[10.5, .25, .75]} 
position={[12,0.25,15.5]}
castShadow receiveShadow>
  <meshStandardMaterial color="#dddddd" />
</Box>
<Box args={[.6, .5, 24]} 
position={[7.25,0.25,3.5]}
castShadow receiveShadow>
  <meshStandardMaterial color="#dddddd" />
</Box>
<Box args={[.6, .5, 24]} 
position={[16.75,0.25,3.5]}
castShadow receiveShadow>
  <meshStandardMaterial color="#dddddd" />
</Box>


    </group>

  </>);
};

export const BewWorldPlazaWithPlayer = () => {
  return (
    <group>
      {/* floor */}
      {/* <SolidBox  position={[0,-.501,-2]} size={[60 ,1,60]} color="#ffffff"   /> */}
      <Cylinder args={[26.4,26,1]} position={[0,-.501,-2]} receiveShadow>
        <meshStandardMaterial color="#ffffff" />
      </Cylinder>

      <SolidBox size={[0.9,5,0.9]} position={[10,0,-4.5]} visible={false} />
      <SolidBox size={[0.9,5,0.9]} position={[14,0,-4.5]} visible={false} />


      <CollisionBox position={[12,0,-16]} size={[2,2,2]}
      onCollide={() => {
        window.location.href = '/game/play';
      }}
        />

      <SolidBox color='#eeeeee' position={[12,1,-14]} size={[5,3,1]}  />
      <SolidBox color='#ffffff' position={[12,2.2,-16]} size={[5.5,1,6]}  />
      <SolidBox color='#eeeeee' position={[12,1,-18]} size={[5,3,1]}  />

      
<group>
<SolidBox  position={[0,0.5,-2]} size={[1,1,1]} color="#00ff99"   />

{/* bank */}
<SolidBox visible={false} position={[0,0.5,-24.5]} size={[6,10,6.5]} color="#00ff99"   />
  
{/* city hall */}
<SolidBox visible={false} position={[ 8,0.5,-14.5]} size={[7,10,10.5]} color="#00ff99"   />

{/* simple house */}
<SolidBox visible={false} position={[ -8,0.5,-12.5]} size={[4,10,4.5]} color="#00ff99"   />
<SolidBox visible={false} position={[ -5.76,0.25,-12.05]} size={[2,.5,2.5]} color="#00ff99"   />


  
</group>
    </group>
  );
};