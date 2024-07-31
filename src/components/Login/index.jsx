import { useState } from "react";
import Input from "../UI/CutomInput";
import Button from "../UI/CustomButton";
import { useLoginMutation } from "@/services/login.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { customToast } from "../Natification";
import InputMaskPhoneNumber from "../UI/PhoneInput";

export const Login = ({ setIsVisible, code, setCode }) => {
	const router = useRouter();
	const [errors, setErrors] = useState({ username: false, password: false });

	const changeValue = (value, name) => {
		setCode((prevStore) => ({
			...prevStore,
			[name]: value,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: false,
		}));
	};

	const [postLogin, { isLoading }] = useLoginMutation();

	const handlePost = async () => {
		const newErrors = {
			username: !code.username,
			password: !code.password,
		};

		if (newErrors.username || newErrors.password) {
			setErrors(newErrors);
			return;
		}
		try {
			const response = await postLogin({
				body: { ...code, username: "+" + code.username },
			});
			if (response.data) {
				setIsVisible(false);
				Cookies.set("TOKEN_DATA", JSON.stringify(response.data));
				customToast("success", "Добро пожаловать!");
				if (response.data.role === "SUPER_ADMIN") {
					router.push("/admin/markets");
				} else {
					router.push("/owner/products");
				}
			} else {
				setIsVisible(false);
				customToast("error ", response.error.data.message);
			}
		} catch (error) {
			console.error("error  login");
		}
	};

	return (
		<div className="w-full">
			<div className="w-full flex flex-col items-center gap-2 mb-6">
				<div className="w-full relative">
					<InputMaskPhoneNumber
						value={code.username}
						numberChange={(e) => changeValue(e, "username")}
						label="Номер"
						 className={`text-Gray ${errors.username ? "border-red-500" : ""}`}
					/>
				</div>
				<div className="w-full relative">
					<Input
						label="Пароль"
						value={code.password}
						onChange={(e) => changeValue(e.target.value, "password")}
						className={`text-Gray ${errors.password ? "border-red-500" : ""}`}
					/>
					{errors.password && (
						<span className="absolute text-red-500 text-xs left-20 mt-0.5  ">
							Пустое Поле
						</span>
					)}
				</div>
			</div>
			<Button
				onClick={handlePost}
				type="button"
				variant="user"
				className="w-full"
				isLoading={isLoading}>
				Отправить
			</Button>
		</div>
	);
};
