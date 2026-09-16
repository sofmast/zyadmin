/*
====================================
 Barcode Studio Pro
 Product Engine
 Babbage Technologies
=====================================
*/


const productName =
document.getElementById("productName");


const sku =
document.getElementById("sku");


const category =
document.getElementById("category");


const brand =
document.getElementById("brand");


const barcode =
document.getElementById("barcode");


const barcodeType =
document.getElementById("barcodeType");


const price =
document.getElementById("price");


const quantity =
document.getElementById("quantity");


const saveProductBtn =
document.getElementById("saveProduct");


const productTable =
document.getElementById("productTable");


const productSearch =
document.getElementById("productSearch");



/*
====================================
 SAVE PRODUCT
=====================================
*/


function saveProduct(){


let products = getProducts();



const product = {


id:generateProductID(),


name:productName.value.trim(),


sku:sku.value.trim(),


category:category.value.trim(),


brand:brand.value.trim(),


barcode:barcode.value.trim(),


barcodeType:barcodeType.value,


price:Number(price.value),


quantity:Number(quantity.value),


createdDate:new Date().toLocaleString()


};




if(!product.name){

alert(
"Product name is required"
);

return;

}




if(!product.barcode){

alert(
"Barcode number is required"
);

return;

}




products.push(product);



saveProducts(products);



clearForm();



displayProducts();



alert(
"Product saved successfully"
);



}





/*
====================================
 DISPLAY PRODUCTS
=====================================
*/


function displayProducts(
data=getProducts()
){


productTable.innerHTML="";



if(data.length===0){


productTable.innerHTML=
`
<tr>

<td colspan="5">
No products found
</td>

</tr>
`;


return;


}





data.forEach(product=>{


productTable.innerHTML +=


`

<tr>

<td>
${product.id}
</td>


<td>
${product.name}
</td>


<td>
${product.barcode}
</td>


<td>
${product.price}
</td>


<td>


<button
onclick="deleteProduct(${product.id})">

Delete

</button>


</td>


</tr>

`;



});


}





/*
====================================
 DELETE PRODUCT
=====================================
*/


function deleteProduct(id){


let products =
getProducts();



products =
products.filter(
product=>product.id !== id
);



saveProducts(products);



displayProducts();



}




/*
====================================
 SEARCH PRODUCTS
=====================================
*/


function searchProducts(){


const value =
productSearch.value
.toLowerCase();



const products =
getProducts();



const result =
products.filter(product=>


product.name
.toLowerCase()
.includes(value)


||
product.barcode
.includes(value)


||
product.sku
.toLowerCase()
.includes(value)



);



displayProducts(result);



}





/*
====================================
 CLEAR FORM
=====================================
*/


function clearForm(){


productName.value="";

sku.value="";

category.value="";

brand.value="";

barcode.value="";

price.value="";

quantity.value="";


}




/*
====================================
 EVENTS
=====================================
*/


saveProductBtn
.addEventListener(
"click",
saveProduct
);



productSearch
.addEventListener(
"input",
searchProducts
);



/*
INITIAL LOAD
*/


displayProducts();