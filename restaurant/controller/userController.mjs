import userModel from "../model/userModel.mjs";


const userController = {
  getUsers: async (req, res) => {
    try {

      const users = await userModel.getUsers(req.query.paginate, req.query.page, req.query.limit)

    res.status(200).json(users)
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

  login: async (req, res) => {
    try {
      const { name, password, email } = req.body;

      const user = users.find(
        (user) => user.name === name || user.email === email
      );

      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      if (user.password !== password) {
        res.status(401).json({ message: "Invalid" });
        return;
      }

      req.session.userId = user.id;
      res.status(200).json({ message: "user logged in successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: " logging in error" });
    }
  },

  logout: (req, res) => {
    try {
      if (!req.session.userId) {
        res.status(400).json({ message: "no active session" });
        return;
      }

      req.session.destroy((err) => {
        if (err) {
          res
            .status(500)
            .json({ message: "an error occured while logging out" });
          return;
        }
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "an error occured while destroying out" });
      return;
    }
  },

  getUserById: (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const user = users.find((user) => user.id === id);

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
      }
        //reikia issaugoti sukurimo datos ir vartotojo rezervacijos

        updateUser.registered_on = users[userIndex].registered_on;
        updateUser.reservation = users[userIndex].reservation;

        users[userIndex] = updateUser;

        res.status(200).json(updateUser);
        await fs.promises.writeFile(
          path.join(__dirname, "../db/users.json"),
          JSON.stringify(users, null, 2)
        );

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
  }



};

export default userController;
