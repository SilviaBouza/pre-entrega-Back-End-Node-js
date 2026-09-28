const [, , method, resource] = process.argv;

const url = "https://fakestoreapi.com";

// ------------------------------------
// GET - Obtener todos los productos
// ------------------------------------

async function obtenerProductos() {
    try {
        const response = await fetch(`${url}/products`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const productos = await response.json();

        
        console.log(productos);

    } catch (error) {
        console.error(
            "Error al obtener los productos:",
            error.message
        );
    }
}

// ------------------------------------
// GET - Obtener un producto por ID
// ------------------------------------

async function obtenerProducto(id) {
    try {
        const response = await fetch(
            `${url}/products/${id}`
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const producto = await response.json();

        
        console.log(producto);

    } catch (error) {
        console.error(
            "Error al obtener el producto:",
            error.message
        );
    }
}

// ------------------------------------
// POST - Crear un producto
// ------------------------------------

async function crearProducto() {

    const nuevoProducto = {
        title: "Producto nuevo",
        price: 29.99,
        description: "Producto creado desde Node.js",
        category: "electronics"
    };

    try {

        const response = await fetch(
            `${url}/products`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(nuevoProducto)
            }
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const productoCreado = await response.json();

        console.log("Producto creado correctamente:");
        
        console.log(productoCreado);

    } catch (error) {

        console.error(
            "Error al crear el producto:",
            error.message
        );
    }
}

// ------------------------------------
// PUT - Actualizar un producto
// ------------------------------------

async function actualizarProducto(id) {

    const productoActualizado = {
        title: "Producto actualizado",
        price: 39.99,
        description: "Producto modificado desde Node.js",
        category: "electronics"
    };

    try {

        const response = await fetch(
            `${url}/products/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(productoActualizado)
            }
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const producto = await response.json();

        console.log("Producto actualizado correctamente:");
        
        console.log(producto);

    } catch (error) {

        console.error(
            "Error al actualizar el producto:",
            error.message
        );
    }
}

// ------------------------------------
// DELETE - Eliminar un producto
// ------------------------------------

async function eliminarProducto(id) {

    try {

        const response = await fetch(
            `${url}/products/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const resultado = await response.json();

        console.log("Producto eliminado correctamente:");
        
        console.log(resultado);

    } catch (error) {

        console.error(
            "Error al eliminar el producto:",
            error.message
        );
    }
}

// ------------------------------------
// Ejecutar comandos
// ------------------------------------

async function ejecutar() {

    // GET products
    if (
        method === "GET" &&
        resource === "products"
    ) {

        await obtenerProductos();

        return;
    }

    // GET products/:id
    if (
        method === "GET" &&
        resource.startsWith("products/")
    ) {

        const id = resource.split("/")[1];

        if (!id) {

            console.log(
                "Debes indicar el ID del producto."
            );

            return;
        }

        await obtenerProducto(id);

        return;
    }

    // POST products
    if (
        method === "POST" &&
        resource === "products"
    ) {

        await crearProducto();

        return;
    }

    // PUT products/:id
    if (
        method === "PUT" &&
        resource.startsWith("products/")
    ) {

        const id = resource.split("/")[1];

        if (!id) {

            console.log(
                "Debes indicar el ID del producto."
            );

            return;
        }

        await actualizarProducto(id);

        return;
    }

    // DELETE products/:id
    if (
        method === "DELETE" &&
        resource.startsWith("products/")
    ) {

        const id = resource.split("/")[1];

        if (!id) {

            console.log(
                "Debes indicar el ID del producto."
            );

            return;
        }

        await eliminarProducto(id);

        return;
    }

    
    console.log("Comando no reconocido.");
}

// ------------------------------------
// Iniciar programa
// ------------------------------------

ejecutar();
