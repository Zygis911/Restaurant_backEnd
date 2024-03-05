import users from "../db/users.json" assert { type: "json" };
import menus from "../db/menus.json" assert { type: "json" };
import orders from "../db/orders.json" assert { type: "json" };

import fs from "fs";

import path, { dirname } from "path";

// importuojame failo url i failo kelia

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  deleteUser: async (res, req) => {
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
      res.status(204).json({message: "user succesfully deleted"});

    } catch (error) {
      res.status(500).json({message: "an error occured deleting"})
    }
  },

  getUserOrders: (res, req) => {

  },

  createOrder: async (res, req) => {

  },

  cancelReservation: async (res, req) => {

  },
  readMenuItem: (res, req) => {


  },

};

export default userController;
