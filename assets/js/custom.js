function searchProducts(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    const query = document.getElementById('inputModalSearch').value.toLowerCase();

    // Limpia el contenedor de productos
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    // Cargar productos desde el archivo JSON y filtrar según la búsqueda
    fetch('productos.json')
        .then(response => response.json())
        .then(categories => {
            // Itera sobre las categorías y productos del JSON
            for (const [category, products] of Object.entries(categories)) {
                products.forEach((product, index) => {
                    if (product.name.toLowerCase().includes(query)) {
                        const imageSrc = `assets/img/diseños con marca de agua/${category}/${product.foto}`;

                        const productHTML = `
                            <div class="col-md-4">
                                <div class="card mb-4 product-wap rounded-0">
                                    <div class="card rounded-0">
                                        <a href="shop-single.html?id=${index}">
                                            <img class="card-img rounded-0 img-fluid" src="${imageSrc}">
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="product-name text-center">${product.name}</h5>
                                        <p class="d-flex justify-content-between align-items-center mb-0">
                                            <a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a>
                                            <span class="text-center">${product.price}</span>
                                            <a class="btn btn-success text-white" href="shop-single.html"><i class="fas fa-cart-plus"></i></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                        // Añade el producto al contenedor
                        container.innerHTML += productHTML;
                    }
                });
            }

            // Cierra el modal de búsqueda al terminar
            $('#templatemo_search').modal('hide');
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));
}
