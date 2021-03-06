const users = [];

const addUser = ({ id, username, room }) => {
  // Clean data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  //Validate data
  if (!username || username.length < 3) {
    return { error: "Username required with minimum length of 3", };
  }
  if (!room || room.length < 3) {
    return { error: "Room name required with minimum length of 3", };
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (existingUser) {
    return { error: "A player in this room already own this name", };
  }

  // Store user
  const user = { id, username, room, };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
};
