class ProductDetailsModel {
  constructor(product) {
    const { name, description, images, price, company } = product;
    this.name = name;
    this.description = description;
    this.images = images;
    this.price = price;
    this.company = company;
  }
}

export default ProductDetailsModel;
