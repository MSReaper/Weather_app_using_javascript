window.addEventListener('load', ()=> {

    let long;
    let lat;
    let temperaturedesc = document.querySelector(".temp-description");
    let tempdegree = document.querySelector(".temp-degree");
    let locationtimezone = document.querySelector(".location-timezone");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors=anywhere.herokuapp.com/"; 
            const api = '${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}';

            fetch(api)
            .then(response =>{
                return response.json();


            })
            .then(data =>{
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                //set DOM elements from the API
                tempdegree.textContent = temperature;
                temperaturedesc.textContent = summary;
                locationtimezone.textContent = data.timezone;
                //set icon
                seticons(icon, document.querySelector('.icon'));
                


            });
        });

    }else{

        h1.textContent = "There was an error encounteres! sorry for the inconvenience"
    }

    function seticons(icon, iconid){

        const skycons = new Skycons({color: "white"});
        const currenticon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currenticon]);
    }


});