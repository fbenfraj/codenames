const rooms = ["Room 1", "Room 2"];

const getRooms = () => rooms;
const addRoom = (roomName) => rooms.push(roomName);

module.exports = {
  addRoom,
  getRooms,
};
