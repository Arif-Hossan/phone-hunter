const loadPhones= async()=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=iphone`
    const res= await fetch(url);
    const data= await res.json();
    displayPhones(data.data);
}
const displayPhones=(phones)=>{
    phones.forEach(phone => {
     const phonesContainer=document.getElementById('phones-container');
     
    });
}
loadPhones();