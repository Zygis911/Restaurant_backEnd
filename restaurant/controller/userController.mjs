import userModel from "../model/userModel.mjs";

import bcrypt from 'bcrypt'

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers(
        req.query.paginate,
        req.query.page,
        req.query.limit
      );

      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error has occured while retrieving users" });
    }
  },

  createUser: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        repeatPassword,
        registered_on,
        role = "user",
      } = req.body;

      const existingUser = await userModel.getUserByEmail(email);

      if (existingUser) {
        res.status(400).json({ message: "Email already taken." });
        return;
      }

      if (password !== repeatPassword) {
        res.status(400).json({ message: "passwords do not match" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = { 
        username, 
        email,
        password: hashedPassword,
        registered_on: new Date(),
        reservations: [],
        role
      }

      const createUser = await userModel.createUser(newUser);

      res.status(201).json(createUser);
    } catch (error) {

      console.error(error);
      res
        .status(500)
        .json({ message: "an error occured while creating users" });
    }
  },

  login: async (req, res) => {
    try { // del username
      const { username, email } = req.body;

     const user = await userModel.login({username, email});


      res.status(200).json({ message: "user logged in successfully", user });
    } catch (error) {
     if(error.username === 'User not found' || error.message === 'Invalid credentials') {
      res.status(401).json({message: error.message})
     }
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
      res
        .status(500)
        .json({ message: "an error occured while destroying out" });
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
  },
  createReservation: async (req, res) => {
    try {
      const { book } = await userModel.createReservation(req.params);

      res.status(200).json({ message: "Book successfully reserved", book });
    } catch (error) {
      res
        .status(500)
        .json({ message: "an error occured while  creating a reservation" });
    }
  },
};

export default userController;
