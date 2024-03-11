import users from "../db/users.json" assert { type: "json" };
import menus from "../db/menus.json" assert { type: "json" };
import orders from "../db/orders.json" assert { type: "json" };

import fs, { writeFile } from "fs";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const menuController = {
  getMenuItems: (req, res) => {
    // grazina viska
    try {
      res.status(200).json(menus);
    } catch (error) {
      res.status(500).json({ message: "failed to retrieve menus" });
    }
  },

  readMenuItemById: (req, res) => {
    // grazina pagal specific
    //id t.y http://localhost:3000/api/v1/library/menus/2
    try {
      const id = parseInt(req.params.id);
      const menu = menus.find((menu) => menu.id === id);

      if (!menu) {
        res.status(404).json({ message: "menu item not found" });
      }

      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({
        message: "an error has occured while retrieving menu items by id",
      });
    }
  },

  createMenuItem: async (req, res) => {
    try {
      const newMenuItem = {
        ...req.body,
        created_on: new Date().toISOString().split("T")[0],
      };

      menus.push(newMenuItem);
      menus.forEach((menu, index) => {
        menu.id = index + 1;
      });

      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );

      res.status(201).json(newMenuItem);
    } catch (error) {
      res
        .status(500)
        .json({ message: "an error occured while creating menu item" });
    }
  },

  deleteMenuItem: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      let menuIndex = menus.findIndex((menu) => menu.id === id);

      if (menuIndex === -1) {
        res.status(404).json({ message: "menu item not found to delete" });
        return;
      }

      menus.splice(menuIndex, 1);
      await fs.promises.writeFile(
        path.join(__dirname, "../db/menus.json"),
        JSON.stringify(menus, null, 2)
      );
      res.status(204).json({message: "menu item successfully deleted"});
    } catch (error) {
        res.status(500).json({message : "an error occured deleting"})
    }
  },
  

  updateMenuItem: async (req, res) => {

    try {
        const id = parseInt(req.params.id)
        const updateMenu = {...req.body, id};
        let menuIndex = menus.findIndex((menu) => menu.id === id);
        if (menuIndex === -1) {
            res.status(404).json({message: "Menu item not found"})
            return;
        }

        res.status(200).json(updateMenu);
        await fs.promises.writeFile(
            path.join(__dirname, '../db/menus.json'),
            JSON.stringify(menus, null, 2)
        )
    } catch (error) {
        res.status(500).json({message: "an error has occured"})
    }
  }
};

export default menuController;
