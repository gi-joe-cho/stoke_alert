exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.string('id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.string('user_rating');
    table.integer('up_votes').defaultTo(0);
    table.integer('down_votes').defaultTo(0);
    table.string('image_location_url');
    table.string('post_content');
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('zipcode').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
