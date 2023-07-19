const tempFeild=document.querySelector(".weather1");
const LocationFeild=document.querySelector(".weather2 p");
const dateFeild=document.querySelector(".weather2 span");
const iconFeild=document.querySelector(".weather3 img");
const weatherFeild=document.querySelector(".weather3 span");
const searchFeild=document.querySelector(".searchBar")
const form=document.querySelector("form");

let target="delhi";

//fucntion to fetch data from api
const fetchData=async(target)=>{
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=50d62cb975b54429a1892907231807&q=${target}`;
        const response= await fetch(url);
        const data = await response.json();
        const {
            current:{temp_c , condition:{text,icon}}, //destructure the elements
            location:{name , localtime}
        } = data;
        updateDom(temp_c,name,icon,text,localtime);
    } catch (error) {
        alert("Location not found")
    }
}
fetchData(target);

//function to update elements
function updateDom(temperature,city,icon,text,date){
    tempFeild.innerText=`${temperature}°`;
    LocationFeild.innerText=city;
    iconFeild.src=icon;
    weatherFeild.innerText=text;
    dateFeild.innerText=date;
    const exactTime=date.split(" ")[1];
    const exactDate=date.split(" ")[0];
    const exactDay=getDayName(new Date(exactDate).getDay());
    dateFeild.innerText=`${exactTime} - ${exactDay} ${exactDate}`;
}

//function to get day
function getDayName(num){
    switch (num) {
        case 0:
        return "Sunday";
        case 1:
        return "Monday";
        case 2:
        return "Tuesday";
        case 3:
        return "Wednesday";
        case 4:
        return "Thrusday";
        case 5:
        return "Friday";
        case 6:
        return "Satday";
        default:
            break;
    }
}


//function for search for place
const search=(e)=>{
    e.preventDefault();
    target=searchFeild.value;
    fetchData(target);
}
form.addEventListener("submit",search);