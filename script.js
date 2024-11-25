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
// variables
const cart = [];
const arrayCafes = [
    {"id": 1, "nombre": "capuccino", "descripcion": "cafe con leche", "precio" : 4500},
    {"id": 2, "nombre": "mocca", "descripcion": "moccachino" , "precio" : 5000},
    {"id": 3, "nombre": "americano", "descripcion": "cafe sin leche", "precio" : 6000},
    {"id": 4, "nombre": "espreso", "descripcion": "cafe con leche", "precio" : 5500},
    {"id": 5, "nombre": "capuccino", "descripcion": "cafe con leche", "precio" : 6000},
    {"id": 6, "nombre": "bombon", "descripcion": "cafe con leche", "precio" : 7000}
];
orders = [];
const order = {
    "nombre": '',
    "documento": '',
    'precio': 0,
    'productos': []
}

function addToCart(cafeId){
    const cafe = arrayCafes.find(item => item.id === cafeId);
    if(cafe){
        cart.push(cafe); // Add the item to the cart array
        renderCart(); // Call this function to update the cart display
        updateCartCount();
    }
}

function renderCart(){
    const container = document.querySelector('.cart-items-container');
    container.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        // Create a new div for each cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <span class="fas fa-times" onclick="removeFromCart(${item.id})"></span>
            <img src="Imagenes/${item.nombre}.jpeg" alt="">
            <div class="content">
                <h3>${item.nombre}</h3>
                <p>${item.descripcion}</p>
                <div class="price">$${item.precio.toLocaleString()}/-</div>
            </div>
        `;

        container.appendChild(cartItem);
    });

    // Optionally, append the 'Comprar ahora' button only if cart is not empty
    if (cart.length > 0) {
        const buyButton = document.createElement('button');
        buyButton.classList.add('btn');
        buyButton.innerText = "Comprar ahora";
        buyButton.id = 'comprarAhora';
        container.appendChild(buyButton);
        document.getElementById('comprarAhora').addEventListener('click', buyProducts);
    }
}

// Function to remove an item from the cart by ID
function removeFromCart(cafeId){
    const index = cart.findIndex(item => item.id === cafeId);
    if(index !== -1){
        cart.splice(index, 1); // Remove the item from cart array
        renderCart(); // Re-render the cart items
        updateCartCount();
    }
}



function updateCartCount() {
        // Get the cart-count element
        const cartCountElement = document.getElementById('cart-count');
        
        // Update the text content with the length of the cart array (number of items)
        cartCountElement.innerText = cart.length;
    }


document.getElementById("adminSectionButton").addEventListener("click", function() {
        window.location.href = "SeccionAdministrativa.html";
    });

    function buyProducts() {
        console.log("got into the buyProducts function!!");
    
        // Check if popup already exists
        if (document.getElementById('popup')) return;
    
        // Create popup container
        const popup = document.createElement('div');
        popup.id = 'popup';
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
    
        // Popup content
        const popupContent = document.createElement('div');
        popupContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
            width: 300px;
        `;
    
        popupContent.innerHTML = `
            <h3 style="margin-bottom: 15px;">Confirma tu compra</h3>
            <label for="idInput" style="display: block; margin-bottom: 5px;">Documento:</label>
            <input type="text" id="idInput" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 5px;" />
            <label for="nameInput" style="display: block; margin-bottom: 5px;">Nombre:</label>
            <input type="text" id="nameInput" style="width: 100%; padding: 8px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px;" />
            <div style="display: flex; justify-content: space-between;">
                <button id="confirmButton" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">Confirmar</button>
                <button id="cancelButton" style="background-color: #f44336; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">Cancelar</button>
            </div>
        `;
    
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    
        // Confirm button logic
        document.getElementById('confirmButton').addEventListener('click', () => {
            const id = document.getElementById('idInput').value.trim();
            const name = document.getElementById('nameInput').value.trim();
    
            if (id && name) {
                // Calculate total price
                const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
    
                // Save the order
                const order = {
                    nombre: name,
                    documento: id,
                    precio: totalPrice,
                    productos: [...cart] // Save the products in the cart
                };
                orders.push(order);
    
                alert(`Order placed for ${name} with ID: ${id}`);
                console.log("Orders:", orders);
    
                // Clear the cart (optional)
                cart.length = 0;
                updateCartCount();
                updateCartDisplay();
                // Remove popup
                document.body.removeChild(popup); // Close the popup
            } else {
                alert('Please fill in all fields.');
            }
        });
    
        // Cancel button logic
        document.getElementById('cancelButton').addEventListener('click', () => {
            document.body.removeChild(popup); // Close the popup
        });
    }
    
    function updateCartDisplay(){
        const cartContainer = document.querySelector('.cart-items-container');
        cartContainer.innerHTML = '<h2>No hay productos en el carrito</h2>';
    }

    


    
    
