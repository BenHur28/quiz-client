import { useContextStore } from "@/hooks/useContextStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const router = useRouter();
	const { setContext } = useContextStore();
	const logout = () => {
		setContext("0");
		router.push("/");
	};

	return (
		<div className="w-full text-white bg-[#282820] py-8">
			<div className="flex justify-around items-center w-1/2 mx-auto">
				<span className="text-4xl">Quiz App</span>
				<span
					className="text-3xl text-blue-500 cursor-pointer"
					onClick={logout}
				>
					Log Out
				</span>
			</div>
		</div>
	);
};

export default Navbar;
