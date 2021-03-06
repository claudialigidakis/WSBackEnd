const knex = require('../../../db')
const bcrypt = require('bcrypt-as-promised')

function getShopByName(shopName) {
  return (knex('shops').where({shop_name: shopName}).first())
}

function getOneShop(shopsId) {
  return (knex('shops').where({id: shopsId}).first())
}

function getAllShops() {
  return (knex('shops'))
}

function createShop(body) {
  let shopName = body.shop_name
  let settings = []
  let logo = "this.url"
  return getShopByName(shopName).then(data => {
    if (data)
      throw {
        status : 400,
        message: 'Shop exists'
      }
    return (knex('shops').insert({shop_name: shopName, settings, logo}).returning('*'))
  })
}

function updateShop(shopId, shop_name, logo, settings, archived) {
  const toUpdate = {}
  settings ? toUpdate.settings = settings : null
  shop_name ? toUpdate.shop_name = shop_name : null
  logo ? toUpdate.logo = logo : null
  archived || archived === false ? toUpdate.archived = archived : null
  return (knex('shops')
  .update(toUpdate)
  .where({id: shopId})
  .returning('*'))
}

function removeShop(shopId) {
    return (knex('staff')
    .where({shops_id: shopId})
    .del())
  .then(data => {
    return (knex('shops')
    .where({id: shopId})
    .del())
  })
}

////////////////////////////////////////////////////////////////////////////////
//STAFF ROUTING
////////////////////////////////////////////////////////////////////////////////
function getOneStaff(staffId, shopId) {
  return (knex('staff').where({id: staffId, shops_id: shopId}).first())
}

function getStaffByEmail(staffEmail) {
  return (knex('staff').where({email: staffEmail}).first())
}

function getAllStaff(shopId) {
  return (knex('staff').where({shops_id: shopId}))
}

function createStaff(body, ShopId) {
  let role = body.role || 1
  return getStaffByEmail(body.email).then(data => {
    if (data)
      throw {
        status : 400,
        message: 'Staff member already exists'
      }
    return bcrypt.hash(body.password, 10)
  }).then(newPassword => {
    return (knex('staff').insert({
      shops_id: ShopId,
      role_id: role,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: newPassword,
      photo: body.photo
    }).returning('*'))
  }).then(function([
    {
      password,
      ...data
    }
  ]) {
    return data
  })
}

function updateStaff(staffId, first_name, last_name, unhashed_password, email, photo, role, archived) {
  const toUpdate = {}
  first_name
    ? toUpdate.first_name = first_name
    : null
  last_name
    ? toUpdate.last_name = last_name
    : null
  email
    ? toUpdate.email = email
    : null
  photo
    ? toUpdate.photo = photo
    : null
  role
    ? toUpdate.role = role
    : null
  archived || archived === false
    ? toUpdate.archived = archived
    : null

  return bcrypt.hash(unhashed_password, 10).then(password => {
    return (knex('staff').update(toUpdate).where({id: staffId}).returning('*'))
  }).then(function([
    {
      password,
      ...data
    }
  ]) {
    return data
  })
}

function removeStaff(staffId) {
  return (knex('staff').where({id: staffId}).del())
}

module.exports = {
  getAllShops,
  getOneShop,
  createShop,
  removeShop,
  updateShop,
  getOneStaff,
  getStaffByEmail,
  getAllStaff,
  createStaff,
  updateStaff,
  removeStaff
}
