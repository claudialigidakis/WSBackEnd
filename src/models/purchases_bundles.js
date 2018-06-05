const knex = require('../../db');


function getOnePurchaseBundle(purchase_id, bundle_id) {
    return (
      knex('purchases_bundles')
    .where({purchase_id: purchase_id, bundle_id: bundle_id})
  )
}

function getAllPurchaseBundles(purchase_id) {
    return (
      knex('purchases_bundles')
    .where({purchase_id: purchase_id})
  )
}

function createPurchaseBundle(purchaseId, bundle_id, bundle_qty, completed, staff_id) {
  console.log(purchaseId, bundle_id, bundle_qty, completed, staff_id);
    const toCreate = {}
    toCreate.purchase_id = purchaseId
    toCreate.bundle_id = bundle_id
    completed ? toCreate.completed = completed : false
    bundle_qty ? toCreate.bundle_qty = bundle_qty : 1
    staff_id ? toCreate.staff_id = staff_id : null
    return(
      knex('purchases_bundles')
    .insert(toCreate)
    .returning('*'))
}

function updatePurchaseBundle(purchaseId, bundle_id, bundle_qty, completed, staff_id) {
  console.log(purchaseId, bundle_id);
  const toUpdate = {}
  completed ? toUpdate.completed = completed : null
  bundle_qty ? toUpdate.bundle_qty = bundle_qty : null
  staff_id ? toUpdate.staff_id = staff_id : null
  return(
    knex('purchases_bundles')
  .update(toUpdate)
  .where({purchase_id: purchaseId, bundle_id: bundle_id})
  .returning('*'))
}


function removePurchaseBundle(purchase_id, bundle_id) {
    return (
      knex('purchases_bundles')
      .where({purchase_id: purchase_id, bundle_id: bundle_id})
      .del()
    )
}


module.exports = {
  getOnePurchaseBundle,
  getAllPurchaseBundles,
  createPurchaseBundle,
  removePurchaseBundle,
  updatePurchaseBundle
}
