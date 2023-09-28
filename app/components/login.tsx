"use client";
import * as z from "zod";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
		<div className="h-full">
			<form onSubmit={handleSubmit(submitData)}>
				<div className="flex flex-col justify-center items-center my-auto mx-auto w-1/3 bg-blue-300">
					<label>Username</label>
					<input className="border" type="text" {...register("username")} />
					{errors.username && (
						<span className="text-red-500">{errors.username.message}</span>
					)}
					<label>Password</label>
					<input className="border" type="password" {...register("password")} />
					{errors.password && (
						<span className="text-red-500">{errors.password.message}</span>
					)}
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
