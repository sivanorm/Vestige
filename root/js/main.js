$(document).ready(function() {
    // Load the default page (Product List)
    $("#content").load("pages/product-list.html");

    // Handle navigation clicks and dynamically load pages
    $("a.nav-link").click(function(e) {
        e.preventDefault();
        let page = $(this).data("page");
        $("#content").load(`pages/${page}`);
    });

    // Initialize an empty cart
    let cart = [];

    // Add to cart functionality
    $(document).on("click", ".add-to-cart", function() {
        let productId = $(this).data("id");
        let productName = $(this).data("name");
        let productPrice = $(this).data("price");

        let product = cart.find(p => p.id === productId);

        if (product) {
            product.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
        
        updateCart();
    });

    // Update cart display
    function updateCart() {
        let cartHtml = "";
        let total = 0;

        cart.forEach(item => {
            cartHtml += `<tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${item.quantity * item.price}</td>
            </tr>`;
            total += item.quantity * item.price;
        });

        cartHtml += `<tr>
            <td colspan="3">Total</td>
            <td>$${total}</td>
        </tr>`;

        $("#cart-items").html(cartHtml);
    }
});
