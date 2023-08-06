import React, {useEffect, useState} from 'react'
import './style.css'
import WeatherCard from './WeatherCard';

const Temp = () => {
    const[searchValue, setSearchValue]= useState("bhaktapur");
    const [tempInfo, setTempInfo] = useState({});
     const getWeatherInfo = async()=>{
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5de507b0eaea2d00d1ed010535939732`;
            
            const res = await fetch(url);
            const data = await res.json();   //to get data from api
            // console.log(data)
            const {temp,humidity,pressure} = data.main; //to get temp,humi,pres from api
            const{main: weathermood}= data.weather[0];  
            const{name}=data;
            const{speed}= data.wind;
            const{country,sunrise,sunset}= data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunrise,
                sunset
            }
            setTempInfo(myNewWeatherInfo)
            // console.log(temp)
        } catch (error) {
            console.log(error);
        }
    }
        useEffect(()=>{
            getWeatherInfo();
        },[]);
  return (
    <>
    <div className='wrap'>
    <div className="intro">
    <h1>Dikesh's Weather App</h1>
    </div>
        <div className="search">
            <input type="text" placeholder="Search" autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>
               Search
            </button>
        </div>
    </div>
    {/* Our temp card */}
    <WeatherCard tempInfo={tempInfo}/>
    {/* <Wcard tempInfo={tempInfo}/> */}
    </>
  )
}

export default Temp
