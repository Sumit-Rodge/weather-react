import { useEffect, useState } from 'react'
import './weather-main.css'

export function WeatherMain(){


    const [cityData,setCityData]=useState({city:{},list:[{main:{},wind:{},weather:[{}]}]});
    const [apiId,setApiId]=useState('1f1f4a396bb110c3e2b9c0817d0f267e');
    const [cityName,setCityName] = useState("pune");
    function loadData(){
        try {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiId}&units=metric`)
            .then(res => res.json())
            .then(data => {
                setCityData(data)
                console.log(data)
                
            })
            
            
        } catch (error) {
            <h2>Re enter</h2>
        }       
    }
   
    function handleSearchClick(e){
        // e.preventDefault();
        loadData();
    }
    function handleSearchChange(e){
        setCityName(e.target.value);
        if(e.keyCode===13){
            loadData();
        };
    }
    useEffect(()=>{
        loadData();
        
    },[]);
    return (
        <div className="container-fluid bg-dark mt-4 " style={{height:'100vh'}}>
            {document.querySelector('body').style.backgroundColor="dark"}
            <main className=''>
                <div className="search  bg-secondary rounded container d-flex flex-row " style={{width:'240px', height:'30px'}} >
                    
                    <input type="text" onChange={handleSearchChange} onKeyDown={handleSearchChange}  className=" bg-secondary text-white search-box" />
                    <button onClick={handleSearchClick}  className='bg-secondary border-0'><span className="bi bi-search text-white ms-1 "/></button>
                    
                </div>
                <div className="container text-white text-center mt-4">
                    <h1 className=''>{cityData.city.name}</h1>
                    <h2 className=''>{Math.round(cityData.list[0].main.temp)}°C</h2>
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                     <h3 className=' text-warning'> 
                     {(cityData.list[0].weather[0].description)}
                     </h3>
                    <img src={`https://openweathermap.org/img/wn/${cityData.list[0].weather[0].icon}@2x.png`} alt="" />
                    </div>
                    <div className='container d-flex justify-content-center mt-4'>
                        <div className='me-4 ms-4'>
                            <h2 className='text-info'>Feels Like</h2>
                            <h3>{Math.round(cityData.list[0].main.feels_like)+'°C'}</h3>
                        </div>
                        <div className='me-4 ms-4'>
                            <h2 className='text-info'>Humidity</h2>
                            <h3>{cityData.list[0].main.humidity+'%'}</h3>
                        </div>
                        <div className='me-4 ms-4'>
                            <h2 className='text-info'>Wind Speed</h2>
                            <h3>{cityData.list[0].wind.speed+'km/h'}</h3>
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}