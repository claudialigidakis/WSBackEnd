const knex = require('../../../db')

function getOneKind(kindId) {
  return (knex('kinds').where({id: kindId}).first())
}

function getAllKinds(shopId) {
  return (knex('kinds').where({shop_id: shopId}))
}

function createKinds(body, shopId) {
  return (knex('kinds').insert({shop_id: shopId, name: body.name}).returning('*'))
}

function removeKinds(kindId) {
  return (knex('kinds').where({id: kindId}).del())
}

function updateKinds(kindId, body) {
  return (knex('kinds').update({name: body.name}).where({id: kindId}).returning('*'))
}

module.exports = {
  getOneKind,
  getAllKinds,
  createKinds,
  removeKinds,
  updateKinds
}
