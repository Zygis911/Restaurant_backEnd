import users from "../db/users.json" assert { type: "json" };
import menus from "../db/menus.json" assert { type: "json" };
import orders from "../db/orders.json" assert { type: "json" };

import fs, { writeFile } from "fs";

import path, { dirname } from "path";

// importuojame failo url i failo kelia

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// USER service
const userController = {
  getUsers: (req, res) => {
    try {
      if (req.query.paginate === "true") {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const start = (page - 1) * limit;
        const end = page * limit;

        const paginatedUser = users.slice(start, end);

        res.status(200).json(paginatedUser);
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error has occured while retrieving users" });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = {
        ...req.body,
        registered_on: new Date().toISOString().split("T")[0],
        reservation: [],
      };
      users.push(newUser);
      users.forEach((user, index) => {
        user.id = index + 1;
      });

      await fs.promises.writeFile(
        path.join(__dirname, "../db/users.json"),
        JSON.stringify(users, null, 2)
      );

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "an error occured while creating users" });
    }
  },

  getUserById: (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const user = user.find((user) => user.id === id);

      if (!user) {
        res.status(404).json({ message: "user not found" }); // by default kur id naudojam , naudoti sita eilute
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "an error has occured while retrieving users by id" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateUser = { ...req.body, id };
      let userIndex = users.findIndex((user) => user.id === id);
      if (userId === -1) {
        res.status(404).json({ message: "user not found" });
        return;

        //reikia issaugoti sukurimo datos ir vartotojo rezervacijos

        updateUser.registered_on = users[userIndex].registered_on;
        updateUser.reservation = users[userIndex].reservation;

        users[userIndex] = updateUser;

        res.status(200).json(updateUser);
        await fs.promises.writeFile(
          path.join(__dirname, "../db/users.json"),
          JSON.stringify(users, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "an error has occured" });
    }
  },

  updateUserFields: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedFields = req.body;
      const updateUser = { ...req.body, id };

      let userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      users[userIndex] = { ...users[userIndex], ...updatedFields };

      await fs.promises.writeFile(
        path.join(__dirname, "../db/users.json"),
        JSON.stringify(users, null, 2)
      );
      res.status(200).json(updateUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "an error has occured " });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      let userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      users.splice(userIndex, 1);
      await fs.promises.writeFile(
        path.join(__dirname, "../db/users.json"),
        JSON.stringify(users, null, 2)
      );
      res.status(204).json({ message: "user succesfully deleted" });
    } catch (error) {
      res.status(500).json({ message: "an error occured deleting" });
    }
  },

  // MENU service
  getMenuItems: (req, res) => {
    try {
      res.status(200).json(menus); // pasiteirauti, users paemimo budas neveikia

    } catch (error) {
      res.status(500).json({ message: "failed to retrieve menu items" });
    }
  },

  createMenuItem: async (req, res) => {
    try {
      // irgi nesigauna bbz
      const newMenuItem = {
        ...req.body,
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
      };
      menus.push(newMenuItem);
      menus.forEach((menu, index) => {
        menus.id = index + 1;
      });

      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "an error occured creating a menu item" });
    }
  },

  readMenuItemById: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const menu = menu.find((menu) => menu.id === id);

      if (!menu) {
        res.status(404).json({ message: "menu item not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "an error has occured while retrieving menu items by id",
      });
    }
  },

  updateMenuItem: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateMenuItem = { ...req.body, id };

      let menuIndex = menus.findIndex((menu) => menu.id === id);
      if (menuIndex === -1) {
        res.status(404).json({ message: "menu item not found" });
        return;
      }

      menus[menuIndex] = updateMenuItem;

      res.status(200).json(updateMenuItem);
      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: " ann error has occured" });
    }
  },

  deleteMenuItem: async (res, req) => {
    try {
      const id = parseInt(req.params.id);
      let menuIndex = menus.findIndex((menu) => menu.id === id);
      if (menuIndex === -1) {
        res.status(404).json({ message: "menu item not found" });
        return;
      }
      menus.splice(menuIndex, 1);
      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );
      res.status(204).json({ message: "menu item succesfulyl deleted" });
    } catch (error) {
      res.status(500).json({ message: "an error occured deleting" });
    }
  },

  createOrderUser: async (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const menuItemId = Number(req.query.menuItemId);
      const quantity = Number(req.query.quantity);

      const user = users.find((user) => user.id === id);

      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      let maxOrderId;
      if (orders.length > 0) {
        maxOrderId = Math.max(...orders.map((order) => order.id));
      } else {
        maxOrderId = 0;
      }

      const orderToSave = {
        id: orders.length + 1, // naujo orderio id sukurimas
        customerId: userId,
        Items: [],
      };

      const menuItem = menus.find((menu) => menu.id === menuItemId);
      if (!menuItem) {
        res
          .status(400)
          .json({ message: "menu item with id you written does not exist " });
        return;
      }

      orderToSave.Items.push({
        menuItemId: menuItemId,
        quantity: quantity,
      });

      orders.push(orderToSave)

      user.order.push(orderToSave.id);

      await fs.promises.writeFile(
        path.join(__dirname, "../db/orders.json"),
        JSON.stringify(orders, null, 2)
      );
      await fs.promises.writeFile(
        path.join(__dirname, "../db/users.json"),
        JSON.stringify(users, null, 2)
      );

      res.status(201).json(orderToSave)

    } catch (error) {
      res.status(500).json({message: "an error occured while creating an order"})
    }
  },
};

export default userController;
