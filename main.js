let services=document.querySelectorAll('li')[0];
let optimiser=document.querySelectorAll('li')[1];
let submenu=document.querySelector('.submenu');
let saisir=document.querySelector('.CAG_CHEMIN');
let chemin=document.querySelectorAll('.checkbox');
let oui= Array.from(document.querySelectorAll('.oui'));
let reductions=new Array();
let send_data=document.querySelector('#send_data');
let show_table_button=document.querySelector('#send');
show_table_button.addEventListener('click',()=>
{
  if( chemin[1].checked==true)
  {
  document.querySelector('.table').style.display="block";
  saisir.style.visibility="hidden";
  if(document.querySelector('h2')!=null)
  {
    document.body.removeChild(document.querySelector('h2'));
  }
  }
  if( chemin[0].checked==true)
  {
    if(document.querySelector('h2')!=null)
    {
      document.body.removeChild(document.querySelector('h2'));
    }
    if( document.querySelector('.table').style.display=='block')
    {
      document.querySelector('.table').style.display='none';
    }
  let h2=document.createElement("h2");
  h2.style.backgroundColor='darkblue';
  h2.style.color='beige';
  h2.style.padding='25px';
  h2.style.textAlign='center';
  h2.style.borderRadius='15px';
  h2.textContent= "Voici le montant à payer TAP sans optimisation fiscale :"+parseInt(document.querySelector('.CAG').value)*0.15  + "DA";
  document.body.appendChild(h2);
  saisir.style.visibility = 'hidden';
  }
}
)
// rendre le sub-menu visible
services.addEventListener('click',()=>
{
  if(submenu.style.visibility=='visible')
  {
    submenu.style.visibility='hidden';
  }
  else 
  {
    submenu.style.visibility='visible';
  }
})


// rendre le formulaire visible
optimiser.addEventListener('click',()=>
{
    if(saisir.style.visibility=='visible')
    {
        saisir.style.visibility='hidden';
    }
    else 
    {
        saisir.style.visibility='visible';
  
    }
})
let more_than_one = function(current,inferior,superior,reduction)
{
  for(let i=inferior;i<=superior;i++)
{
console.log(superior,inferior);
if(i!=current)
{
 oui[i].checked=false;
}
}
console.log(oui[current].checked);
let obj = {reduction,current}
if(!reductions.includes(obj))
{
reductions.push(obj);
}
}


// ne pas pouvoir cocher plus d'un seul chemin à la fois
chemin[0].addEventListener('change',()=>
{
   if(chemin[0].checked==true)
{
    chemin[1].checked=false   
} 
})
chemin[1].addEventListener('change',()=>
{
   if(chemin[1].checked==true)
{
    chemin[0].checked=false   
} 
})


// ne pas pouvoir cocher plus que une dans une seule catégorie
oui.forEach((one_oui=>
  {
    one_oui.addEventListener('change',()=>
  {
let index = oui.indexOf(one_oui);
if( index>=0 && index<3 )
{
  more_than_one(index,0,2,25)
}
if( index>=3 && index<5 )
{
  more_than_one(index,3,4,30)
}
if( index>=5 && index<7 )
{
  more_than_one(index,5,6,50)
}
if( index>=7 && index<9 )
{
  more_than_one(index,7,8,75)
}
    })
  })
)
/////////////////////////////////////////
send_data.onclick=()=>
{
  let div=document.querySelector('.saisir_proportion');
  div.innerHTML='';
  console.log(reductions);
  reductions.sort();
  let p=document.createElement('p');
  p.textContent="Veuillez saisir Les informations suivantes : ";
  p.style.fontWeight='bold';
  p.style.fontSize='17px';
  div.appendChild(p);   
   let inputs=new Array();
  for(var i=0; i<reductions.length; i++)
  {
    if((oui[reductions[i].current].checked))
    {
    let input=document.createElement('input');
    input.dataset.val_red=reductions[i].reduction;
    input.style.marginBottom='10px';
    input.style.borderStyle='solid';
    input.placeholder= "CAG proportionnel pour une réduction de "+reductions[i].reduction + "%"; 
    inputs.push(input);   
    div.appendChild(input);
    }
  }
  let btn=document.createElement('button');
    btn.textContent="calculer"; 
    div.appendChild(btn);
    let CAG= (document.querySelector('.CAG').value);
  console.log(CAG);
    btn.onclick=()=>
    {      
       let x = 0;
let result = 0;
      for (let i=0; i<inputs.length; i++)
      {
       x=  parseInt(inputs[i].value) +x
 result+= ((100- parseInt(inputs[i].dataset.val_red))/100)*parseInt(inputs[i].value);
      }        
      let final=(CAG-x+result)*0.15;
      console.log(final);
      let h2=document.createElement("h2");
  h2.style.backgroundColor='darkblue';
  h2.style.color='beige';
  h2.style.padding='25px';
  h2.style.textAlign='center';
  h2.style.borderRadius='15px';
  h2.textContent= "Voici le montant à payer TAP avec optimisation fiscale :"+final + "DA \n";
  h2.style.whiteSpace = "pre-line";

  h2.textContent+= "Voici le montant à payer TAP sans optimisation fiscale :"+parseInt(document.querySelector('.CAG').value)*0.15  + "DA";
  document.body.appendChild(h2);
  saisir.style.visibility = 'hidden';
  div.innerHTML='';
  document.querySelector('.table').style.display='none';
    };
}