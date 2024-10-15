let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}


let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}


window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

cart = [

];

const arrayCafes = [
    {"id": 1, "nombre": "capuccino", "descripcion": "cafe con leche", "precio" : 4500},
    {"id": 2, "nombre": "mocca", "descripcion": "moccachino" , "precio" : 5000},
    {"id": 3, "nombre": "americano", "descripcion": "cafe sin leche", "precio" : 6000},
    {"id": 4, "nombre": "espreso", "descripcion": "cafe con leche", "precio" : 5500},
    {"id": 5, "nombre": "capuccino", "descripcion": "cafe con leche", "precio" : 6000},
    {"id": 6, "nombre": "bombon", "descripcion": "cafe con leche", "precio" : 7000},
];

let total = 0;

function addToCart(cafeId){
    const cafe = arrayCafes.find(item => item.id === cafeId);
    if(cafe){
        cart.push(cafe)
        console.log(cart);
        updateCartCount();
    }
}


function updateCartCount() {
        // Get the cart-count element
        const cartCountElement = document.getElementById('cart-count');
        
        // Update the text content with the length of the cart array (number of items)
        cartCountElement.innerText = cart.length;
    }
