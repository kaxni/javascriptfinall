const serDatajson = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';

async function oClick(core){
let name = core;
await fetch(serDatajson)
.then((res) => {
  if(res.ok){
    return res.json();
  } 
  else throw new Error("Error");
}).then((data)=> {

    data.forEach(element => {
        if (name == element.name) 
       { 
        document.getElementById('firstLine').innerText=element.name;
        document.getElementById('secondLine').innerText=element.email;
        document.getElementById('thirdLine').value=element.boxes;
        const myElement = document.getElementById('thirdLine');
        boxCounter(element.boxes).then((res)=> document.getElementById('output').innerText=res);
        myElement.addEventListener("input", ()=> boxCounter(document.getElementById('thirdLine').value)
        .then((res) => document.getElementById('output').innerText=res));
    }
    });
})
.catch((err) => console.error(err));
}

async function boxCounter(set){  
  let ordeal =  set.split(','); 
  let key =  set.split(',').map(element => {return Number(element);});
  let count = 0; 
  key.forEach(el => {count += el});  
  if (count%10 == 0) return count/10;
  else return Math.ceil(count/10);   
 } 
