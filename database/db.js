const mysql=require("mysql");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host:"localhost",
    user: "root",
    password: "Chhaya@1234",
    database: "BLOG"}

});


knex.schema
  .createTable("UserDetail", (table) => {
    table.increments("id").primary();
    table.string("Name");
    table.string("email").notNullable().unique();
    table.string("password").notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
  .then((data) => {
    console.log("Table UserDetail Created");
  })
  .catch((err) => {
    console.log("Table UserDetail already .exist");
    
  });


knex.schema
.createTable("postDetail", (table) => {
  table.increments("id").primary();
  table.string("Title")
  table.string("Description");
  table.integer("User_id")
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
})
.then((data) => {
  console.log("Table postDetail Created");
})
.catch((err) => {
  console.log("Table postDetail already .exist");
  
});

knex.schema
  .createTable("Like_Dislike", (table) => {
    table.increments("id").primary();
    table.integer("Like")
    table.integer("Dislike")
    table.integer("User_id");
    table.integer("post_id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

  })
  .then((data) => {
    console.log("Table Like_Dislike Created");
  })
  .catch((err) => {
    console.log("Table Like_Dislike already .exist");
    
  });

module.exports=knex;



