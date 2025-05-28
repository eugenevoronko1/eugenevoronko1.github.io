document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        product.addEventListener("click", () => {
            alert(`Вы выбрали: ${product.textContent}`);
        });
    });
});