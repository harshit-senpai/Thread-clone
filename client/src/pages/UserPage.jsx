import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios
          .get(`http://localhost:3000/api/v1/users/profile/${username}`)
          .then(({ data }) => {
            console.log(data);
            setUser(data.data.user)
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [username]);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost />
      <UserPost />
    </>
  );
}

export default UserPage;
