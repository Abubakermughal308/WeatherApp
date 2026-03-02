import React from 'react'
    
interface BannerProps {
    name : string;
    description : string;
    humidity : number;
    lon:number;

}


const Banner = ({name , description , humidity , lon}:BannerProps) => {
  return (
    <div>
    <div>
    <h1>
        {name}
    </h1>
    <p>
        {description}
    </p>
    </div>
    <div>
    <h1>
        
    </h1>
    </div>
    </div>
  )
}

export default Banner
