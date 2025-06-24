//ocultar tarjeta de añadir carrito
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});


/* ================================ */

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');


//Lista de productos

const productsList = document.querySelector('.container-items');

//variables
let allProducts = [];


const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');


productsList.addEventListener('click', e => {

    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            cantidad: 1,
            titulo: product.querySelector('h2').textContent,
            precio: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(product => product.title === infoProduct.title);

        if (exits){
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title){
                    product.cantidad++;
                    return product;
                } else{
                    return product;
                }
            });

            allProducts = [...products];
        } else{
            allProducts = [...allProducts, infoProduct];
        }


        showHTML();
    }
});


rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter (
            product => product.title !== title
        );

        console.log(allProducts);

        showHTML();
    }
});


//funcion para mostrar HTML
const showHTML = () => {


    if(!allProducts.length){
        containerCartProducts.innerHTML=`
            <p class="cart-empty">El carrito está vació</p>
        `
    }


    //Limpiar HTML
    rowProduct.innerHTML='';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')


        containerProduct.innerHTML = `
        
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.cantidad}</span>
            <p class="titulo-producto-carrito">${product.titulo}</p>
            <span class="precio-producto-carrito">${product.precio}</span>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icon-close">

            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>

        `;

        rowProduct.append(containerProduct);

        total =
            total + parseInt(product.cantidad * product.precio.slice(1));
        totalOfProducts = totalOfProducts + product.cantidad;


    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};

