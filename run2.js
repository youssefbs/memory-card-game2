const cartes=document.querySelectorAll('.carte');
var click=document.getElementById("nbClick");
var sco=document.getElementById("score");
var btnNew=document.getElementById("btnNew");
var btnReset=document.getElementById("btnReset");

var carteRetourner=false;
var carte1,carte2;
var nbClick=0;
var score=0;
var attendre=false;

btnNew.addEventListener('click',newGame);
btnReset.addEventListener('click',solution);

function newGame(){
    location.reload();
}

function solution(){
    cartes.forEach(carte=>{
        carte.classList.add('flip');
        carte.removeEventListener('click', flipCarte);
    })
}


document.body.onload=randomPos();

function randomPos() {
    cartes.forEach(carte => {
      let pos = Math.floor(Math.random() * 16);
      carte.style.order = pos;
    });
  }


function flipCarte(){
    if(attendre ==false){
        if(this!==carte1){
             this.classList.add('flip');
             nbClick=nbClick+1;
             click.innerHTML=nbClick;
             if(!carteRetourner){
                 carteRetourner=true;
                 carte1=this;
             }else{
                 carte2=this;
                 egalite();
             }
        }
        
    }    
    

}

function egalite(){
    if(carte1.dataset.info===carte2.dataset.info){
        score=score+1;
        sco.innerHTML=score;
        carte1.removeEventListener('click', flipCarte);
        carte2.removeEventListener('click', flipCarte);
        resetParams();
        if(score===8){
            alert("Vous avez gagner nombre de click "+nbClick+" Votre score "+score);
        }else{
            alert("decouverte d'une paire nombre de click "+nbClick+" Votre score "+score);
        }
        
    }else{
        attendre=true;
        setTimeout(() => {
            carte1.classList.remove('flip');
            carte2.classList.remove('flip');
            resetParams();
        }, 2000);   

    }
}

function resetParams(){
    carteRetourner=false;
    attendre=false;
    carte1=null;
    carte2=null;
}


cartes.forEach(carte=>carte.addEventListener('click',flipCarte));