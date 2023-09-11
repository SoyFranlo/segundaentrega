class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // Para generar IDs autoincrementables
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log('Error: Todos los campos son obligatorios.');
      return;
    }

    // Validar que el código no esté repetido
    if (this.products.some(p => p.code === product.code)) {
      console.log('Error: El código ya existe.');
      return;
    }

    // Asignar un ID autoincrementable al producto
    product.id = this.nextId++;
    this.products.push(product);
    console.log('Producto agregado:', product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado.');
      return null;
    }
  }
}

// Ejemplo de uso:
const productManager = new ProductManager();

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del Producto 1',
  price: 10.99,
  thumbnail: 'imagen1.jpg',
  code: 'P001',
  stock: 50,
});

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del Producto 2',
  price: 19.99,
  thumbnail: 'imagen2.jpg',
  code: 'P002',
  stock: 30,
});

console.log('Listado de productos:', productManager.getProducts());
// Ejemplo de producto encontrado
const productById = productManager.getProductById(2);
if (productById) {
  console.log('Producto encontrado por ID:', productById);
}
// Ejemplo de producto no encontrado
const nonExistentProduct = productManager.getProductById(100);
