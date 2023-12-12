import { types } from "mobx-state-tree";

const UserModel = types
  .model("User", {
    id: types.identifierNumber,
    name: types.string,
    isBlocked: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    toggleBlocked() {
      self.isBlocked = !self.isBlocked;
    },
    setName(newName: string) {
      self.name = newName;
    },
  }));

export default UserModel;
