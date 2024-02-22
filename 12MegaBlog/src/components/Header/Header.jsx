// logout btn dikhana hai yaa nahi, yeah conditionally render krenge.
// agar loggedin hai tabhi logout btn dikhayenge
import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  // state.auth = initialState | initialState.status | Accesssing status value from initial state to know the current status of application
  // that user is authenticated or not
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  //This usage ensures that the "Login" and "Signup" buttons are active only when the user is [ not authenticated ],
  // and the "All Posts" and "Add Post" buttons are active only when the user is authenticated.
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      //authStatus [true] menas user is authenticated.
      // authStatus [true] hai toh false kr doh, | true means logged in hai , toh login ka button show nahi hoga,
      //toh uske liye active ko flase krna hoga ishliye loggedin kaa thik opposite yaani false krna hoga uske liye ! kaa use krna hogaa
      // authStatus [false] user loggedout hai , means loggin btn show hoga toh ishliye login btn active true hona chahiye
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, //No need to reverse the authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus, //No need to reverse the authStatus
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* In summary, the LogoutBtn component is conditionally rendered based on the value of authStatus. 
            It will only be rendered if authStatus is truthy (meaning the user is authenticated). 
            This pattern is commonly used to conditionally show or hide elements in React based on certain conditions. */}

            {/* In React, when an expression in curly braces evaluates to false, null, or undefined, nothing is rendered for that part
             of the JSX. */}
            {authStatus && ( // if authStatus is true evaluate ()
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
