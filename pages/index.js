import { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { initialUsers, addUser } from "../features/user";
import { data } from "autoprefixer";

export default function Home(props) {
  const [users, setUsers] = useState(props.data);
  const [reload, setReload] = useState(false);

  const allUsers = useSelector((state) => state.users.value);
  // const dispatch = useDispatch();

  if (typeof window !== "undefined") {
    const lusers = JSON.stringify(users);
    localStorage.setItem("users", lusers);
    
  }
  if( allUsers === null ) {
    window.location.reload(true);
  }


  return <UserList />;
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
