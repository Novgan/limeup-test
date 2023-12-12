import UserStore from "./store/UserStore";
import { useLocalStore, observer } from "mobx-react-lite";
import { users as constUsers } from "./constants";
import { FormEventHandler } from "react";

const App = () => {
  const { addUser, removeUser, users } = useLocalStore(() =>
    UserStore.create({ users: constUsers })
  );

  const formHandler: FormEventHandler = (event) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      userName?: { value: string };
    };
    if (!target.userName?.value) return;

    addUser({ name: target.userName.value, isBlocked: false });
    target.userName.value = "";
  };

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map(({ name, id, isBlocked, setName, toggleBlocked }) => (
          <li key={id}>
            {isBlocked ? (
              <span>{name}</span>
            ) : (
              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            )}
            (Blocked: {isBlocked ? "Yes" : "No"}){" "}
            <button onClick={toggleBlocked}>Toggle Block</button>{" "}
            <button disabled={isBlocked} onClick={() => removeUser(id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={formHandler}>
        <h2>Add User</h2>
        <input type="text" id="userName" />
        <button>Add New User</button>
      </form>
    </div>
  );
};

export default observer(App);
