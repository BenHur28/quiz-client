"use client";
import * as z from "zod";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import { useContextStore } from "@/hooks/useContextStore";
import { useRouter } from "next/navigation";

type FormData = {
	name: string;
	email: string;
};

const Login = () => {
	const id = useContextStore((state) => state.participantId);
	const router = useRouter();
	const { setContext } = useContextStore();
	const formSchema: ZodType<FormData> = z.object({
		name: z.string().min(1),
		email: z.string().min(1),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const login = (data: FormData, e: any) => {
		e.preventDefault();
		createAPIEndpoint(ENDPOINTS.participant)
			.post(data)
			.then((res) => {
				const id = res.data;
				setContext(id.participantId);
				router.push("/quiz");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex justify-center items-center h-full ">
			<form
				className="pl-20 pr-20 py-12 rounded-md bg-[#282820]"
				onSubmit={handleSubmit(login)}
			>
				<div className="flex flex-col justify-center items-center mx-auto">
					<h1 className="text-white mb-5 text-4xl">Quiz App</h1>
					<label className="mb-2 text-white">Username</label>
					<input
						className="border rounded-sm focus:outline-none"
						type="text"
						{...register("name")}
					/>
					{errors.name && (
						<span className="text-red-500 text-sm mt-2">
							{errors.name.message}
						</span>
					)}
					<label className="my-2 text-white">Email</label>
					<input
						className="border rounded-sm focus:outline-none"
						type="email"
						{...register("email")}
					/>
					{errors.email && (
						<span className="text-red-500 text-sm mt-2">
							{errors.email.message}
						</span>
					)}
					<button type="submit" className="bg-white mt-6 px-8 py-2 rounded-sm">
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
