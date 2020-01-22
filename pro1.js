var arr=JSON.parse(localStorage.getItem('user'));
console.log(arr);
//localStorage.removeItem('cart');
//localStorage.clear();
var addcart=JSON.parse(localStorage.getItem('cart'));
var name=document.getElementById("pname");
var price=document.getElementById("pprice");
var quan=document.getElementById("pquan");
var given=document.getElementById("addhere");
var prods=[];
var cart=[];
var a=new Object();
a=arr[arr.length-1];
var pid;
if(arr.length>0)
{
	pid=a.Id+1;
	console.log("jh"+pid);
}
else
{
	pid=1;
}
if(arr)
{
	for(var i=0;i<arr.length;i++)
	{
		//console.log(arr[i]);
		prods.push(arr[i]);
		addtolist(arr[i]);
	}
}
//console.log("nhdw"+addcart.length);  
//console.log(addcart);
if(addcart)
{
	for(var i=0;i<addcart.length;i++)
	{
		//console.log(addcart[i]);
	    var o=new Object();
	    o=addcart[i];
	    carter(o.Id); 
	    cart.push(addcart[i]);
	}
}
//console.log(cart);
function add()
{
   var objProduct = new Object();
	
	objProduct.Id = pid;
 	objProduct.Name = document.getElementById("pname").value;
	objProduct.Price = document.getElementById("pprice").value;
	objProduct.Quantity = document.getElementById("pquan").value;
	prods.push(objProduct);
	console.log(prods);
	var s=JSON.stringify(prods);
	localStorage.setItem('user',s);
    addtolist(objProduct);
    pid=pid+1;
    document.getElementById("myform").reset();
}
function viewlist()
{
  document.getElementById("addhere").setAttribute("style","visibility:visible");
}
function hidelist()
{
	document.getElementById("addhere").setAttribute("style","visibility:hidden");
}
function getProductIndex(id) 
{
    for (var i = 0; i < prods.length; i++) 
	{
        if (prods[i].Id == id) 
			{
				console.log(i);
				return i;
			}
    }
} 
function addtolist(objProduct)
{
	//console.log(objProduct);
    var diva=document.createElement("div");
    diva.setAttribute("id","d1");

	var para = document.createElement("p");
    para.innerHTML=objProduct.Name;
	diva.appendChild(para);

	var quant=document.createElement("p");
	quant.innerHTML=objProduct.Quantity;
	diva.appendChild(quant);

	var prixe=document.createElement("p");
	prixe.innerHTML=objProduct.Price;
	diva.appendChild(prixe);

	var butt1=document.createElement("button");
	//butt1.setAttribute("onclick",edit(objProduct));
	var butttext=document.createTextNode("edit");
	butt1.appendChild(butttext);
	diva.appendChild(butt1);

	butt1.addEventListener("click",function(event)
	{
		console.log(objProduct.Id);
		showdiv(objProduct.Id);
	});
    

    var butt2=document.createElement("button");
   // butt2.setAttribute("onclick",del(objProduct));
    butt2.innerHTML="Delete";
    diva.appendChild(butt2);

    butt2.addEventListener("click",function(event)
    {
    	var targetParent = event.target.parentNode;
		var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
		removefromprods(selectedProductIndex);
		targetParent.parentNode.removeChild(targetParent);
    });



    var butt3=document.createElement("button");
   // butt2.setAttribute("onclick",del(objProduct));
    butt3.innerHTML="add to cart";
    diva.appendChild(butt3);

    butt3.addEventListener("click",function(event)
    {
    	carter(objProduct.Id);        

    });

	var space=document.createElement("br");
	diva.appendChild(space);

    
    document.getElementById('addhere').appendChild(diva);
    

	hidelist();
}
function carter(prodidx)
{
	var o=new Object();
	var a;
	for(var i=0;i<prods.length;i++)
	{
		if(prodidx==prods[i].Id)
		{
			o=prods[i];
		}
	}
	//o=prods[prodidx-1];
	
	var x=0;
	for(var j=0;j<cart.length;j++)
	{
		if(cart[j].Id==prodidx)
		{
			x=1;
			a=j;
		}
	}
	//cart.push(o);
	console.log(x);
	if(x==0)
	{
	cart.push(o);
	var s=JSON.stringify(cart);
	localStorage.setItem('cart',s);
	//console.log(o);
	 var modal=document.getElementById("pop");
     modal.style.display="none";
     var divmain=document.createElement("div");
    if(!document.getElementById("pp"))
     {var p=document.createElement("p");
          var text=document.createTextNode("LIST OF ITEMS IN CART");
          p.appendChild(text);
          p.setAttribute("id","pp");
          p.style.color="white";
         // p.fontsize(20);
          divmain.appendChild(p);}
     
     var p1=document.createElement("p");
     var text1=document.createTextNode("Item: "+o.Name);
     p1.appendChild(text1);
     p1.style.color="white";
     divmain.appendChild(p1);


     var p2=document.createElement("p");
     var text2=document.createTextNode("Price: "+o.Price);
     p2.appendChild(text2);
     p2.style.color="white";
     divmain.appendChild(p2);

     var p3=document.createElement("p");
     var text3=document.createTextNode("Quan: "+o.Quantity);
     p3.appendChild(text3);
     p3.style.color="white";
     divmain.appendChild(p3);

     var space=document.createElement("br");
     divmain.appendChild(space);
    
     var buttt=document.createElement("button");
     buttt.innerHTML="DEL";
     divmain.appendChild(buttt);
     buttt.addEventListener("click",function(event)
    {
    	del(j);        

    });


     document.getElementById("enter").appendChild(divmain);

     //document.getElementById("pop").setAttribute("style","visibility:hidden");
    }

     

}
function del(idx)
{
	cart=[];
	if(addcart)
	{
	addcart.splice(idx,1);
    }
	localStorage.removeItem('cart');
	/*var s=JSON.stringify('cart');
	localStorage.setItem('cart',s);
    console.log(cart);*/
	var e = document.getElementById("enter"); 
        
        //e.firstElementChild can be used. 
        var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
       // console.log(cart);
    for(var i=0;i<addcart.length;i++)
    {
    	//console.log(cart[i]);
    	carter(addcart[i].Id);
    	cart[i]=addcart[i];
    }   
}

function showdiv(prodidx)
{
  var modal=document.getElementById("popup");
  modal.style.display="block";
  
  if(document.getElementById("b3"))
  {
  	modal.removeChild(document.getElementById("b3"));
  }

  var ob =new Object();
  for(var i=0;i<prods.length;i++)
  {
  	if(prods[i].Id==prodidx)
  	{
  		ob=prods[i];
  	}
  }
 // ob=prods[prodidx];
   console.log(ob);
  document.getElementById("newpname").setAttribute("value",ob.Name);
  document.getElementById("newprice").setAttribute("value",ob.Price);
  document.getElementById("newquan").setAttribute("value",ob.Quantity);

  var butt3=document.createElement("button");
  butt3.setAttribute("id","b3");
  var butttext=document.createTextNode("save changes");
  butt3.appendChild(butttext);
  document.getElementById("popup").appendChild(butt3);
  
   butt3.addEventListener("click",function(event)
	{
        
		//console.log(prodidx);
	    updateprods(prodidx);
	});
}

function updateprods(prodidx)
{
	//console.log("here");
	var objProduct = new Object();
	objProduct.Id = prodidx;
 	objProduct.Name = document.getElementById("newpname").value;
	objProduct.Price = document.getElementById("newprice").value;
	objProduct.Quantity = document.getElementById("newquan").value;
	//console.log(prodidx);
	/*prods.splice(prodidx,1,objProduct);
	arr.splice(prodidx,1,objProduct);*/
	var y;
	for(var i=0;i<prods.length;i++)
	{
		if(prodidx==prods[i].Id)
		{
			y=i;
		}
	}
	prods[y]=objProduct;
	console.log(prods[y]);
	arr[y]=objProduct;
	localStorage.removeItem('user');
	var s=JSON.stringify(prods);
	localStorage.setItem('user',s);
	deletechild();
	for(var i=0;i<prods.length;i++)
	{
		//console.log(prods[i]);
		addtolist(prods[i]);
	}
	hidepop();
}
function deletechild()
{
	var e = document.getElementById("addhere"); 
        
        //e.firstElementChild can be used. 
        var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
}
function hidepop()
{
	var modal=document.getElementById("popup");
    modal.style.display="none";
    hidelist();
}
function removefromprods(prodidx)
{
	//console.log(prodidx);
	prods.splice(prodidx,1);
	if(arr)
	{
	arr.splice(prodidx,1);
    }
	localStorage.removeItem('user');
	var s=JSON.stringify(prods);
	localStorage.setItem('user',s);
	
}

function viewcart()
{
	//console.log("wjew");
	 var modal=document.getElementById("pop");
     modal.style.display="block";
}
function hidepopu()
{
	 var modal=document.getElementById("pop");
     modal.style.display="none";}