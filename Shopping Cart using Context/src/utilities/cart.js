class Product {
    constructor(id, title, thumbnail, price, rating) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.price = price;
        this.rating = rating;
    }
}

class Cart {
    constructor() {
        this.products = []; // Array of { product: Product, quantity: number } objects
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.totalProducts = 0;
    }

    // Add a product to the cart
    addProduct(product, quantity = 1) {


        const existingProduct = this.products.find(
            (item) => item.product.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            this.products.push({
                product: product,
                quantity: quantity,
            });
            this.totalProducts++;
        }

        this.totalPrice += product.price * quantity;
        this.totalQuantity += quantity;
    }

    // Remove a product from the cart
    removeProduct(productId, quantity = 1) {
        const index = this.products.findIndex(
            (item) => item.product.id === productId
        );

        if (index === -1) return;

        const existingProduct = this.products[index];

        if (existingProduct.quantity > quantity) {
            existingProduct.quantity -= quantity;
            this.totalQuantity -= quantity;
            this.totalPrice -= existingProduct.product.price * quantity;
        } else {
            this.totalPrice -=
                existingProduct.product.price * existingProduct.quantity;
            this.totalQuantity -= existingProduct.quantity;
            this.products.splice(index, 1);
            this.totalProducts--;
        }
    }

    // Get all products in the cart
    getProducts() {
        return this.products.map((item) => ({
            ...item.product,
            quantity: item.quantity,
        }));
    }
}
