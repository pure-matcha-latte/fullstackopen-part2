const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    padding: 10,
    position: "fixed",
    top: 8,
    color: "#fff",
    background: message.type === "success" ? "green" : "red",
  };
  return <div style={style}>{message.content}</div>;
};

export default Notification;
