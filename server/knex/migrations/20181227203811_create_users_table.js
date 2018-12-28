
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.date('birth_date').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.text('annotation');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
