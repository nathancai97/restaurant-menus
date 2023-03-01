const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Restaurant", async () => {
    // TODO - write test
    const newRestaurant = await Restaurant.create({
      name: "Los Tacos No. 1",
      location: "Many",
      cuisineProperties: "Mexican",
      rating: 100,
    });
    expect(newRestaurant.name).toBe("Los Tacos No. 1");
    expect(newRestaurant.rating).toBe(100);
  });

  test("can create a Menu", async () => {
    // TODO - write test
    const newMenu = await Menu.create({
      title: "Lunch",
    });
    expect(newMenu.title).toBe("Lunch");
  });

  test("can find Restaurants", async () => {
    // TODO - write test
    const restaurant = seedRestaurant.find(
      (restaurant) => restaurant.name === "AppleBees"
    );
    expect(restaurant).toBeDefined();
    expect(restaurant.location).toBe("Texas");
    expect(restaurant.cuisine).toBe("FastFood");
  });

  test("can find Menus", async () => {
    // TODO - write test
    const menu = seedMenu.find((menu) => menu.title === "Breakfast");
    expect(menu).toBeDefined();
    expect(menu.title).toBe("Breakfast");
  });

  test("can delete Restaurants", async () => {
    // TODO - write test
    const newRestaurant = await Restaurant.create({
      name: "Los Tacos No. 1",
      location: "Many",
      cuisineProperties: "Mexican",
      rating: 100,
    });
    await Restaurant.destroy({ where: { id: newRestaurant.id } });
    const deletedRestaurant = await Restaurant.findByPk(newRestaurant.id);
    expect(deletedRestaurant).toBeNull();
  });
});
