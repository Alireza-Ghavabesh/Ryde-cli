/**
 * List of permissions
 * add permissions to this array in rayconnect scope :)
 */
module.exports = [
    {
      mode: "add",
      uid: "guest",
      address: "messages/subscribe",
      method: "NANO",
      scope: "messages",
    },
    {
      mode: "add",
      uid: "guest",
      address: "messages/subscribe",
      method: "READ",
      scope: "messages",
    },
    {
      mode: "add",
      uid: "guest",
      address: "messages/subscribe",
      method: "SEND",
      scope: "messages",
    },
    {
      mode: "add",
      uid: "guest",
      address: "messages/subscribe",
      method: "REMOVE",
      scope: "messages",
    },
    {
      mode: "add",
      uid: "guest",
      address: "messages/subscribe",
      method: "MKDIR",
      scope: "messages",
    }
  ];
  


  