import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  useEffect(() => {
    if (!user) return;
    const getUser = async () => {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    };
    getUser();
  }, [user, axiosSecure]);
  const handleAddLibrarianOrAdmin = async (email, role) => {
    const updateDoc = {
      role: role,
    };
    const res = await axiosSecure.patch(`/users/${email}`, updateDoc);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      const updateUsers = users.map((user) =>
        user.email === email ? { ...user, role: role } : user,
      );
      setUsers(updateUsers);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Added to the ${role}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      {users.length > 0 ? (
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="lg:text-xl bg-[#73717133]">
              <th className="md:table-cell hidden">SI. No.</th>
              <th className="hidden md:table-cell">Profile</th>
              <th>Name</th>
              <th className="hidden sm:table-cell">Email</th>
              <th>Role</th>
              <th>Set Librarian</th>
              <th>Set Admin</th>
            </tr>
          </thead>
          <tbody className="md:text-lg">
            {users.map((user, i) => (
              <tr key={user._id}>
                <td className="md:table-cell hidden">{i + 1}</td>
                <td className="hidden md:table-cell">
                  <img
                    className="h-15 w-15 object-cover rounded-full"
                    src={user.photoURL}
                  />
                </td>
                <td>{user.displayName}</td>
                <td className="hidden sm:table-cell">{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "Librarian" ? (
                    <button
                      disabled
                      className="text-green-600 font-semibold bg-black/10 py-2 px-6 rounded-lg"
                    >
                      Added to Librarian
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddLibrarianOrAdmin(user.email, "Librarian")
                      }
                      className="py-2 px-4 rounded-md cursor-pointer font-semibold bg-green-600 text-white"
                    >
                      Add to Librarian
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "Admin" ? (
                    <button
                      disabled
                      className="text-green-600 font-semibold bg-black/10 py-2 px-6 rounded-lg"
                    >
                      Added to Admin
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddLibrarianOrAdmin(user.email, "Admin")
                      }
                      className="py-2 px-4 rounded-md cursor-pointer font-semibold bg-blue-700 text-white"
                    >
                      Add to Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-4xl text-red-600 font-semibold text-center mt-20">
          No user is found!
        </p>
      )}
    </div>
  );
};

export default AllUsers;
