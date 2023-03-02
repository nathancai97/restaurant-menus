const { Restaurant } = require("./Restaurant");
const { Menu } = require("./Menu");
const { Item } = require("./Item");

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

Item.belongsTo(Menu);
Menu.hasMany(Item);

Item.belongsToMany(Menu, { through: "item_menus" });

module.exports = { Restaurant, Menu, Item };
