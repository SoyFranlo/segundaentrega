const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.getProductsFromFile();
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error('El producto debe tener todas las propiedades: title, description, price, thumbnail, code y stock.');
    }

    // Validar que el código del producto sea único
    if (this.products.some((p) => p.code === product.code)) {
      throw new Error('Ya existe un producto con el mismo código.');
    }

    // Asignar un ID autoincrementable al producto
    product.id = this.getNextProductId();
    this.products.push(product);

    this.saveProductsToFile();
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((p) => p.id === id);
    return product || null;
  }

  updateProduct(id, updatedProduct) {
    const index = products.findIndex((p) => p.id === id);

    // Validar que todas las propiedades necesarias estén presentes
    if (!updatedProduct.title || !updatedProduct.description || !updatedProduct.price || !updatedProduct.thumbnail || !updatedProduct.code || !updatedProduct.stock) {
      throw new Error('El producto debe tener todas las propiedades: title, description, price, thumbnail, code y stock.');
    }

    // Validar que el código del producto sea único (excepto para el producto actual)
    if (this.products.some((p) => p.code === updatedProduct.code && p.id !== id)) {
      throw new Error('Ya existe un producto con el mismo código.');
    }

    if (index !== -1) {
      updatedProduct.id = id;
      this.products[index] = updatedProduct;
      this.saveProductsToFile();
      return true;
    }

    return false;
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
      products.splice(index, 1);
      this.saveProductsToFile(products);
      return true;
    }

    return false;
  }

  getNextProductId(products) {
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
}

module.exports = ProductManager;

