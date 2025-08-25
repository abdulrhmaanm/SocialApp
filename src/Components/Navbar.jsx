import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CounterContext } from './../context/CounterContext';
import { useNavigate } from "react-router-dom";

export function NavbarComp() {

  const {token, setToken ,userData} = useContext(AuthContext)

  const {counter} = useContext(CounterContext)
  const navigate = useNavigate()

    function logout(){
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")

  }

  return (
    <Navbar fluid rounded className="rounded-none ">
      <NavbarBrand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Social App</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={
              userData?.photo ? userData.photo: "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            } rounded />
          }
        >

          {token? <>
          
          <DropdownHeader>
            <span className="block text-sm">{
              
              userData?.name ? userData.name : ""
              }</span>

            <span className="block truncate text-sm font-medium">{
              
              userData?.name ? userData.name : ""
              }</span>

          </DropdownHeader>
          <DropdownItem href="/profile" >Profile</DropdownItem>          
          <DropdownItem onClick={logout}>Sign out</DropdownItem>

          </>:<>
          
          <DropdownItem href="/login">Login</DropdownItem>
          <DropdownItem href="/register">Register</DropdownItem>

          </>}





        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
          <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/posts">Posts</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
export default Navbar;