import React from "react";
import 'css/index.css';
import fotoServicio1 from '../../assets/photos/fotoServicios2.svg';
import fotoServicio2 from '../../assets/photos/fotoServicios3.svg';
import fotoServicio3 from '../../assets/photos/fotoServicios4.svg';
import fotoServicio4 from '../../assets/photos/fotoServicios5.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function SliderCard(){
    const settings = {
        accessibility:true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
    return(
        <div className="slider-container">
            <Slider {...settings}>
                {data.map((d)=> (
                    <div className="card-container">
                        <img src={d.img} className='card-image'/>
                        <div className="card-title-container">
                            <h3 className="card-title">{d.nombre}</h3>
                        </div>
                        
                    </div>
                ))}
            </Slider>
        </div>
    );
}

const data = [
    {
        img:fotoServicio1,
        nombre: 'Tratamientos corporales'
    },
    {
        img:fotoServicio2,
        nombre: 'Masajes'
    },
    {
        img:fotoServicio4,
        nombre: 'Belleza'
    },
    {
        img: fotoServicio3,
        nombre: 'Tratamientos faciales'
    }
]