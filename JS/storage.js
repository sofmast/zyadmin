/*
====================================
 DEFAULT PRODUCTS
 Babbage Technologies
=====================================
*/

const DEFAULT_PRODUCTS = [

    {
        id: 100001,
        name: "Babbage Rice 5kg",
        sku: "BAB-RICE-5KG",
        category: "Food",
        brand: "Babbage",
        barcode: "9501234567893",
        barcodeType: "EAN-13",
        price: 95,
        quantity: 50,
        createdDate: "Default Product"
    },

    {
        id: 100002,
        name: "Babbage Sugar 2kg",
        sku: "BAB-SUGAR-2KG",
        category: "Food",
        brand: "Babbage",
        barcode: "9501234567909",
        barcodeType: "EAN-13",
        price: 48,
        quantity: 100,
        createdDate: "Default Product"
    },

    {
        id: 100003,
        name: "Babbage Cooking Oil 2L",
        sku: "BAB-OIL-2L",
        category: "Food",
        brand: "Babbage",
        barcode: "9501234567916",
        barcodeType: "EAN-13",
        price: 75,
        quantity: 80,
        createdDate: "Default Product"
    },

    {
        id: 100004,
        name: "Babbage Flour 5kg",
        sku: "BAB-FLOUR-5KG",
        category: "Food",
        brand: "Babbage",
        barcode: "9501234567923",
        barcodeType: "EAN-13",
        price: 65,
        quantity: 60,
        createdDate: "Default Product"
    }

];


/*
====================================
 INITIALIZE PRODUCTS
=====================================
*/

function initializeProducts(){

    const existing =
        localStorage.getItem("products");


    /*
    If products does not exist,
    insert the default products.
    */

    if(existing === null){

        localStorage.setItem(
            "products",
            JSON.stringify(DEFAULT_PRODUCTS)
        );

        console.log(
            "Default products inserted successfully."
        );

        return;
    }


    /*
    Protect against invalid storage data.
    */

    try{

        const products =
            JSON.parse(existing);


        if(!Array.isArray(products)){

            localStorage.setItem(
                "products",
                JSON.stringify(DEFAULT_PRODUCTS)
            );

        }

    }catch(error){

        localStorage.setItem(
            "products",
            JSON.stringify(DEFAULT_PRODUCTS)
        );

        console.error(
            "Product storage repaired:",
            error
        );

    }

}


/*
====================================
 GET PRODUCTS
=====================================
*/

function getProducts(){

    initializeProducts();

    return JSON.parse(
        localStorage.getItem("products")
    ) || [];

}


/*
====================================
 SAVE PRODUCTS
=====================================
*/

function saveProducts(products){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


/*
====================================
 INITIAL LOAD
=====================================
*/

initializeProducts();

displayProducts();