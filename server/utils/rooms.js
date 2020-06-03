const rooms = ["Room 1", "Room 2"];

const getRooms = () => rooms;
const addRoom = (roomName) => {
  if(rooms.includes(roomName)) return;
  rooms.push(roomName);
}

module.exports = {
  addRoom,
  getRooms,
};
