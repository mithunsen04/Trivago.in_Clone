document.querySelector(".hov1").addEventListener("click",showCalen1);
document.querySelector(".hov2").addEventListener("click",showCalen2);
let clkOnCheckin=0;
let clkOnCheckOut=0;
function showCalen1(){
     clkOnCheckin++;
   let calen1= document.querySelector(".calen1");
   if(clkOnCheckin%2==1){
       document.querySelector(".hov1").style="display:none";
       calen1.style="display:block";
   }
   else{
    calen1.style="display:none";
    document.querySelector(".hov1").style="display:block";
   }
}
function showCalen2(){
     clkOnCheckOut++;
   let calen2= document.querySelector(".calen2");
   if(clkOnCheckOut%2==1){
       document.querySelector(".hov2").style="display:none";
       calen2.style="display:block";
   }
   else{
    calen2.style="display:none";
    document.querySelector(".hov2").style="display:block";
   }
}