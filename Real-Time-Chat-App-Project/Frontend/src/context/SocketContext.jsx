import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      //Header tab | Request URL: http://localhost:5000/socket.io/?userId=6682fc4bc39bf32a2b927c70&EIO=4.....so on
      //io: A function provided by the Socket.IO client library to establish a connection to the server.
      //"http://localhost:5000": The URL where the Socket.IO server is running.
      const socket = io("http://localhost:5000", { 
        query: {
          userId: authUser._id, //Send logged in user id to server in query parameter of request url
        },
      }); 
      console.log("connection object: ",socket)
      //socket: The instance of the Socket.IO client connection that was created.
      //socket represents an active connection object that allows real-time communication between the client and the server.
      setSocket(socket); // connection object or connected client
      socket.on("getOnlineUsers", (users) => { // users =  [ '6682fc86c39bf32a2b927c7b', '6682fc4bc39bf32a2b927c70' ]
        //console.log(`users|online: ${users}`);
        setonlineUsers(users); //users is an array of keys [] which contain userid(which is key set in backend) of online users form mongodb
        //console.log(onlineUsers)
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
