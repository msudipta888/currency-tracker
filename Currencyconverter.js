const URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
let msg=document.querySelector(".msg");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
for(let select of dropdowns){
    for(let code in countryList)
 {
 let newOp=document.createElement("option");
 newOp.innerText=code;
 newOp.value=code;
 if(select.name==="from" && code==="USD")
 {
    newOp.selected="selected";
 }
else if(select.name==="to" && code==="INR")
 {
    newOp.selected="selected";
 }
 select.append(newOp);
 }

select.addEventListener("change",(ev)=>{
    updateFlag(ev.target);
})
}
const updateFlag=(ele)=>{
 let curCode=ele.value;
 let countryCode=countryList[curCode];
 let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
 let img=ele.parentElement.querySelector("img");
 img.src=newSrc;
}
btn.addEventListener("click",async (ev)=>{
  ev.preventDefault();
  let amount=document.querySelector(".amount input");
  let newval=amount.value;
  
  if(newval<1 || newval==="")
  {
    newval=1;
    amount.value="1";
  }
  const newurl=`${URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response=await fetch(newurl);
  let data=await response.json();
  console.log(data);
let rate=data[toCurr.value.toLowerCase()];
   let finalAm=newval*rate;
  msg.innerText=`${newval} ${fromCurr.value}=${finalAm} ${toCurr.value}`;
})
