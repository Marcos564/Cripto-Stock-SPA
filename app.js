import { getHistoryPrice} from './price-history.js';
import { showInfoHistory } from './price-history.js';
import Chart from 'chart.js/auto';

const options = {   //options es un objeto
    method : 'GET',
    headers:{
        'X-RapidAPI-Key': '24e8500404mshbb1a79d22a7b13dp158812jsnf4ae30e9c4c5',  //esta es mi key
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
}

const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';

export async function getCoinData(){    //export solo para usarla en acquisitions.js
    try {                               
        const res = await fetch(url,options);
        const data = await res.json();
        showInfo(data);    //data no es un array
        graficar(data);
        graficar_bitcoin(data);
    } catch (error) {
        console.log(error);
    }
}


getCoinData();
getHistoryPrice();
/*showInfoHistory();   volver a activar despues*/


/* 
 EL LINK DE RAPIDAPI DE LA API A UTILIZAR ES:
 https://rapidapi.com/Coinranking/api/coinranking1
*/


function showInfo(array){
    console.log(array);
    array.data.coins.forEach((coin, id)=>{
        const content = document.getElementById('content');
        const coinName = coin.name;
        const coinSymbol = coin.symbol;
        const iconUrl = coin.iconUrl;
        const price = Math.round(coin.price * 100)/100;

        const div = document.createElement("div");
        div.innerHTML = `
            <div class = "coin">
                <h3>${coinName}</h3>
                    <p>${id+1},${coinSymbol}</p>
                    <p> $ ${price} </p>
                    <img class = "imgCoin" src="${iconUrl}" alt="">
            
            </div>
        `;
        content.append(div);
    });   
}

function graficar(data){
    
    const labels2 = Object.values(data)[1];      //devuelve un objeto
    //  labels2.coins   <---- es un ARRAY

    let array_of_5 = [];    //array para los nombres
    let array_prices = [];  //array for the prices

    for(var i =0; i<5 ; i++){
        array_of_5.push(labels2.coins[i].name);     //inserta los nombres en ese array
        array_prices.push(labels2.coins[i].price);  //inserta los precios en ese array
    }
    

    new Chart(
        document.getElementById('top5'),
        {
            type: 'bar',
            data:{
                
                labels: array_of_5,
                datasets:[{
                    label: 'precio de criptomonedas en USD',
                    data: array_prices,
                    backgroundColor: '#a3b18a'
                }]
            }
        }

    );

}


function graficar_bitcoin(data){

    console.log('La data para graficar bitcoin es: ');
    const data_bitcoin = Object.values(data)[1].coins[0].sparkline; /* data de las ultimas 24hs */
    console.log(data_bitcoin); /**esto es un array */

    const labels_bitcoin = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00"];


    new Chart(
        document.getElementById('grafico_bitcoin'),
        {
            type: 'line',
            data:{
                labels: labels_bitcoin,
                datasets: [{
                    label:'Evolucion de bitcoin en las ultimas 12hs: ',
                    data:data_bitcoin,
                    backgroundColor: '#a3b18a'
                }]
            }        
        }

    )

}



/* -------- FORMA RECOMENDADA POR RAPIDAPI PARA CONSULTAR LA API----------
    --------PERO NO DEVUELVE EN FORMATO JSON--------
const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';

const options = {  
    method : 'GET',
    headers:{
        'X-RapidAPI-Key': '24e8500404mshbb1a79d22a7b13dp158812jsnf4ae30e9c4c5',  //esta es mi key
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
}


*/