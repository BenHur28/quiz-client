"use client";
import * as z from "zod";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ENDPOINTS, createAPIEndpoint } from "../api";

type FormData = {
	name: string;
	email: string;
};

const Login = () => {
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
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex justify-center items-center h-full ">
			<form
				className="pl-20 pr-20 pt-12 pb-6 rounded-md bg-[#282820]"
				onSubmit={handleSubmit(login)}
			>
				<div className="flex flex-col justify-center items-center mx-auto">
					<h1 className="text-white mb-5 text-4xl">Quiz App</h1>
					<label className="mb-2 text-white">Username</label>
					<input
						className="border rounded-md"
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
						className="border rounded-md"
						type="email"
						{...register("email")}
					/>
					{errors.email && (
						<span className="text-red-500 text-sm mt-2">
							{errors.email.message}
						</span>
					)}
					<button type="submit" className="bg-white mt-6 px-8 py-2 rounded-md">
						Login
					</button>
					<Link href={"/create"} className="mt-10 text-sm text-white">
						Dont have an account? Create an account
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
