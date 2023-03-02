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
    let restaurant = await Restaurant.create(seedRestaurant[0]);
    expect(restaurant.name).toEqual(seedRestaurant[0].name);
    expect(restaurant.location).toEqual(seedRestaurant[0].location);
    expect(restaurant.rating).toEqual(seedRestaurant[0].rating);
  });

  test("can create a Menu", async () => {
    // TODO - write test
    const testMenu = seedMenu[0];
    expect(testMenu.title).toEqual("Breakfast");
  });

  test("can find Restaurants", async () => {
    // TODO - write test
    await sequelize.sync({ force: true });
    let restaurant = await Restaurant.create(seedRestaurant[1]);
    let result = await Restaurant.findByPk(1);
    expect(result.name).toEqual(seedRestaurant[1].name);
  });

  test("can find Menus", async () => {
    // TODO - write test
    // const menu = seedMenu.find((menu) => menu.title === "Breakfast");
    // expect(menu).toBeDefined();
    // expect(menu.title).toBe("Breakfast");
    let menu = await Menu.create(seedMenu[1]);
    let result = await Menu.findByPk(1);
    expect(result.title).toEqual(seedMenu[1].title);
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

  test("Restaurants can have many menus", async () => {
    const newRestaurant = await Restaurant.create({
      name: "Los Tacos No. 1",
      location: "Many",
      cuisineProperties: "Mexican",
      rating: 100,
    });

    const breakfast = await Menu.create(seedMenu[0]);
    const lunch = await Menu.create(seedMenu[1]);
    const dinner = await Menu.create(seedMenu[2]);

    await newRestaurant.addMenus([breakfast, lunch, dinner]);

    const allMenus = await newRestaurant.getMenus();
    expect(allMenus.length).toBe(3);
    expect(allMenus[1]).toHaveProperty("title", "Lunch");
  });
});
