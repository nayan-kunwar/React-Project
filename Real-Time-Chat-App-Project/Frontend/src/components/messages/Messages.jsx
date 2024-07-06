import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import { useRef, useEffect } from "react";
import useListenMessages from "../../hooks/useListenMessages.js";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  //console.log(`messages ${messages}`);
  //console.log(JSON.stringify(messages, null, 2));
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Rendering Messages */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {/* Loading State with Skeletons:show MessageS keleton wehn messages did not come yet. */}
      {/* [...Array(3)]: This creates an array with 3 undefined elements. The spread operator ... is used to expand the array, 
      so [...Array(3)] results in [undefined, undefined, undefined]. Map callback function will run 3 time */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* No Messages State: If there is no conversation between participants */}
      {!loading &&
        messages.length === 0 && ( 
          <p className="text-center text-gray-900">
            Send a message to start the conversation
          </p>
        )}
    </div>
  );
};
export default Messages;
