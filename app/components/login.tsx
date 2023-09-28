"use client";
import * as z from "zod";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
	username: string;
	password: string;
};

const Login = () => {
	const formSchema: ZodType<FormData> = z.object({
		username: z.string().min(5),
		password: z.string().min(5),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const submitData = (data: FormData) => {
		console.log(data);
	};

	return (
		<div className="flex justify-center items-center h-full ">
			<form
				className="p-20 rounded-md bg-blue-300"
				onSubmit={handleSubmit(submitData)}
			>
				<div className="flex flex-col justify-center items-center mx-auto">
					<label className="mb-2">Username</label>
					<input
						className="border rounded-md"
						type="text"
						{...register("username")}
					/>
					{errors.username && (
						<span className="text-red-500">{errors.username.message}</span>
					)}
					<label className="my-2">Password</label>
					<input
						className="border rounded-md"
						type="password"
						{...register("password")}
					/>
					{errors.password && (
						<span className="text-red-500">{errors.password.message}</span>
					)}
					<button type="submit" className="bg-white mt-6 px-4 py-1 rounded-md">
						Login
					</button>
					<Link href={"/create"} className="mt-10 text-sm">
						Dont have an account? Create an account
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
