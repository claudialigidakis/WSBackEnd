const knex = require('../../../db');

function getAllProducts(shopId) {
    return (
      knex('products')
      .innerJoin('stores', 'stores.id', 'products.store_id')
      .where({shops_id: shopId})
  )
}

function getOneProduct(productId) {
    return (
      knex('products')
    .where({id: productId})
    .first()
  )
}

function updateProducts(storeId) {
//updating Item
}


module.exports = {
  getOneProduct,
  getAllProducts,
  updateProducts
}