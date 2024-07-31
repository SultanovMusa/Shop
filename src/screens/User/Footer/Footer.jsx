"use client";
import { useGetOneStoreQuery } from "@/services/store.service";
import Image from "next/image";
import { AiFillTikTok } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { SlSocialVkontakte } from "react-icons/sl";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlinePlace } from "react-icons/md";

export const Footer = () => {
	const { data, isLoading } = useGetOneStoreQuery({});
	console.log(data);

	return (
		<footer className="w-full ">
			{isLoading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<div className="flex bg-black text-white flex-col gap-5 ">
					<div className="flex  pt-5 justify-around ">
						<div className="flex flex-col gap-4">
							<div className="flex gap-2 text-white">
								<a href="https://www.instagram.com/">
									<GrInstagram className="text-xl " />
								</a>
								<p>{data?.instagram}</p>
							</div>
							<div className="flex gap-2 text-white">
								<a href="https://vk.com/">
									
									<SlSocialVkontakte className="text-xl" />
								</a>
								<p>{data?.vkontact}</p>
							</div>
							<div className="flex gap-2 text-white">
								<a href="https://www.tiktok.com/"> <AiFillTikTok className="text-xl " /></a>
								<p>{data?.tikTok}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h1>Контакты</h1>
							<div className="flex gap-2">
								<BiPhoneCall className="text-xl text-zinc-500" />
								<p className="text-zinc-500"> {data?.phoneNumber}</p>
							</div>
							<div className="flex gap-2">
								<MdOutlinePlace className="text-xl text-zinc-500" />
								<p className="text-zinc-500">
									{data?.container}: проход, {data?.row}: контейнер
								</p>
							</div>
							<p></p>
						</div>
					</div>
					<hr />
					<div className="items-center  flex flex-col justify-center text-sm  text-zinc-500 p-2 ">
						<div className="flex  gap-2 ">
							<p> {data?.dateOfCreate}</p>
							<p>{data?.name}</p>
						</div>
						<div>
							<p> Интернет магазин Все права защищены.</p>
						</div>
					</div>
				</div>
			)}
		</footer>
	);
};
