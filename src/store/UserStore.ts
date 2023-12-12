import { types } from "mobx-state-tree";
import UserModel from "./models/userModel";
import { generateRandomId } from "../shared/helpers/generateRandomId";

const UserStore = types
  .model("UserStore", {
    users: types.array(UserModel),
  })
  .actions((self) => ({
    addUser: (candidate: { name: string; isBlocked: boolean }) => {
      if (self.users.some(({ name }) => name === candidate.name))
        return alert("User with this name already created!");
      const generatedId = generateRandomId(self.users.map(({ id }) => id));
      console.log(generatedId);

      const user = UserModel.create({
        id: generatedId,
        ...candidate,
      });
      self.users.push(user);
    },
    removeUser: (userId: number) => {
      self.users = self.users.filter((user) => user.id !== userId);
    },
  }));

export default UserStore;
