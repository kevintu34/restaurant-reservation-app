const knex = require("../db/connection");

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where("table_id", table_id);
}

function update(table) {
  return knex("tables").where("table_id", table.table_id).update(table).returning("*");
}

function destroy(table_id) {
  return knex("tables").where("table_id", table_id).update({status: "Free", reservation_id: null}).returning("*")
}

module.exports = {
  create,
  list,
  update,
  read,
  destroy,
};