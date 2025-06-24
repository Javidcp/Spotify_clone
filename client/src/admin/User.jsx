import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

const User = () => {
    const [users, setUsers] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
        toast.error("Access Denied");
        navigate("/");
        return;
        }

        const fetchData = async () => {
        try {
            const res = await api.get("/auth/users");
            const filteredUsers = res.data.filter(u => u.role !== "admin");
            setUsers(filteredUsers);
            console.log(res.data);
        } catch (err) {
            toast.error("Failed to fetch user data", err);
        }
        };

        fetchData();
    }, [user, navigate]);

        const toggleBlockUser = async (id, currentStatus) => {
        try {
            const response = await api.patch(`/auth/users/${id}`, {
                isActive: !currentStatus,
            });

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === id ? { ...u, isActive: response.data.isActive } : u
                )
            );
        } catch (error) {
            console.error("Block/Unblock error:", error);
        }
    };

    return (
        <div className=" text-white min-h-screen">
            <h3 className="text-2xl font-bold text-center mt-20 mb-10">Registered Users</h3>
        <table className="min-w-full border-collapse border border-[#191919]">
            <thead>
            <tr className="bg-[#1d1d1d] text-left">
                <th className="border border-[#696969] p-2">Name</th>
                <th className="border border-[#696969] p-2">Email</th>
                <th className="border border-[#696969] p-2">Premium</th>
                <th className="border border-[#696969] p-2">Status</th>
            </tr>
            </thead>
            <tbody>
            {users.length === 0 ? (
                <tr>
                <td colSpan="5" className="text-center p-4">
                    No users found
                </td>
                </tr>
            ) : (
                users.map((u) => (
                <tr key={u._id} className="border-b border-[#191919]">
                    <td className="p-2">{u.username}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2 text-center">{u.isPremium ? "Yes" : "No"}</td>
                    <td className="p-2 text-center">
                        <button onClick={() => toggleBlockUser(u._id, u.isActive)}>
                            {u.isActive ?  <MdBlock className="text-red-600" /> : <CgUnblock className="text-green-600" />}
                        </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
};

export default User;
