class API {
	getData(route=""){
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', `https://covid19.mathdro.id/api${route}`);
			xhr.onload = () => {
				if(xhr.status === 200){
					resolve(JSON.parse(xhr.response));
				}else{
					reject(xhr.status);
				}
			}
			xhr.send();
		});
	}
}
export default API;