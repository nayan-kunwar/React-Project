import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations";
import { useState } from "react";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations(); //[{}, {}]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3)
      return toast.error("Search term must be at least 3 characters long");

    const filteredUser = conversations.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) // If true then user= {} will return in array | [{}]
    );
    if (filteredUser.length === 0) { //if (!filteredUser.length === 0) dont do like this, wrong
      toast.error("No such user found!");
    } else {
      console.log(`filteredUser: ${typeof filteredUser}`);
      setSelectedConversation(filteredUser[0]); // Access the first element in the array. If there are two user with the same name it will not select the both user only select the first one
      setSearch("");
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
