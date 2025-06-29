
// Product data
const products = [
    {
        id: 1,
        name: "Fresh Bananas",
        weight: "1 Lr.",
        price: 48,
        originalPrice: 60,
        category: "dairy",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/5ee4441d-9109-48fa-9343-f5ce82b905a6.jpg?ts=1706182143"
    },
    {
        id: 2,
        name: "Amul Fresh Milk",
        weight: "500 ml",
        price: 28,
        originalPrice: 32,
        category: "dairy",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/6ae62ec2-3b13-4fff-b052-2ff3d4ef2d16.jpg?ts=1726473593"
    },
    {
        id: 3,
        name: "Vijay Stone Ground Wheat Brown Bread",
        weight: "400g Pack",
        price: 49,
        originalPrice: 96,
        category: "packaged",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/de613aee-7992-4848-8644-52792012ab56.jpg?ts=1726484663"
    },
    {
        id: 4,
        name: "Protein Chef Baked Coated Peanuts (Masala Roasted Healthy Snacks)",
        weight: "50g",
        price: 36,
        originalPrice: 45,
        category: "Sna",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/1c4f8155-55fc-44c4-b07a-e1107912fab8.jpg?ts=1747841333"
    },
    {
        id: 5,
        name: "Britannia Bread",
        weight: "400g",
        price: 25,
        originalPrice: 28,
        category: "bakery",
        icon: "🍞"
    },
    {
        id: 6,
        name: "Tata Tea Gold",
        weight: "250g",
        price: 145,
        originalPrice: 160,
        category: "tea",
        icon: "☕"
    },
    {
        id: 7,
        name: "Fresh Tomatoes",
        weight: "500g",
        price: 24,
        originalPrice: 30,
        category: "vegetables",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/4cd11feb-f6df-4830-9fa1-a5f39f08fc3f.jpg?ts=1748161073"
    },
    {
        id: 8,
        name: "Amul Butter",
        weight: "100g",
        price: 52,
        originalPrice: 58,
        category: "dairy",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/0be0d49a-4dae-408a-8786-afae1dd05cb1.jpg?ts=1707312314"
    },
    {
        id: 9,
        name: "Impact",
        weight: "25g",
        price: 10,
        originalPrice: 12,
        category: "packaged",
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/363211a.jpg?ts=1690813897"
    },
    {
        id: 10,
        name: "Chicken Breast",
        weight: "500g",
        price: 189,
        originalPrice: 210,
        category: "meat",
        icon: "🍗"
    },
    {
        id: 11,
        name: "Head & Shoulders",
        weight: "180ml",
        price: 156,
        originalPrice: 175,
        category: "personal",
        icon: "🧴"
    },
    {
        id: 12,
        name: "Parle Biscuits",
        weight: "200g",
        price: 35,
        originalPrice: 40,
        category: "packaged",
        icon: "🍪"
    }
];

let cart = [];
let currentFilter = 'all';

// Initialize the app
function init() {
    displayProducts(products);
    updateCartUI();
}

// Display products
function displayProducts(productsToShow) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <span style="font-size: 4rem;"><img width="70%" class="iteamImg" src=${product.icon} alt=${product.name}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-weight">${product.weight}</p>
                <div class="product-price">
                    <span class="price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                </div>
                ${quantity === 0 ? 
                    `<button class="add-btn" onclick="addToCart(${product.id})">ADD</button>` :
                    `<div class="quantity-controls">
                    <div class="qty-box">
                        <button class="qty-btn" onclick="updateQuantity(${product.id}, ${quantity - 1})">−</button>
                        <span class="qty-display">${quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${product.id}, ${quantity + 1})">+</button>
                    </div>
                    </div>`
                }
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
});

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    refreshCurrentView();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    updateCartUI();
    refreshCurrentView();
}

// Refresh current view
function refreshCurrentView() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm) {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    } else if (currentFilter === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === currentFilter);
        displayProducts(filtered);
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const subtotal = document.getElementById('subtotal');
    const totalAmount = document.getElementById('totalAmount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">Your cart is empty</p>';
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"><img src="${item.icon}" alt="${item.name}"></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
                </div>
                <div class="quantity-controls">
                <spam class="qty-box">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </spam>
                </div>
            </div>
        `).join('');
        
        cartTotal.style.display = 'block';
        subtotal.textContent = `₹${totalPrice}`;
        totalAmount.textContent = `₹${totalPrice}`;
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Initialize the app when page loads
init();
