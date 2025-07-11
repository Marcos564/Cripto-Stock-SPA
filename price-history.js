
console.log("LLEGA");

const options_history = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '24e8500404mshbb1a79d22a7b13dp158812jsnf4ae30e9c4c5',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

const url_history = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h';

export async function getHistoryPrice(){
    try {
        const res_history = await fetch(url_history,options_history);
        const data_history = await res_history.json();
        showInfoHistory(data_history);
    } catch (error) {
        console.log(error);
    }
}

export function showInfoHistory(array) {
    console.log(array);
}