"use client";

import { useGetCategoriesQuery } from "@/services/categories.service";
import Modal from "@/components/UI/Modal";
import { useState } from "react";
import { AddCategories } from "./AddCategories";
import Button from "@/components/UI/CustomButton";
import { FaPlus } from "react-icons/fa6";
import { CategoriesAccardion } from "@/components/CategoriesAccardion";
import { CATEGORY_DATA } from "@/utils/consts";

export const Categories = () => {
	const { data } = useGetCategoriesQuery();
	const [isVisible, setIsVisible] = useState(false);
	const [Id, setId] = useState("");
	const [type, setType] = useState();

	const onClose = () => {
		setIsVisible(false);
	};

	const handleOpen = () => {
		setType("post");
		setId("");
		setIsVisible(true);
	};

	return (
		<section className="w-full h-[calc(100vh-60px)] overflow-y-scroll p-3">
			<div className="w-full flex justify-end">
				<Button
					onClick={handleOpen}
					variant="admin"
					size="small"
					className="flex items-center gap-2">
					<p className="font-light text-[13px]">Добавить</p>

					<FaPlus className="text-white w-4 h-4 hover:animate-spin" />
				</Button>
			</div>
			<CategoriesAccardion
				data={data}
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				Id={Id}
				setId={setId}
				setType={setType}
			/>
			<Modal
				isVisible={isVisible}
				onClose={onClose}
				title="Категории"
				className="min-w-[300px]">
				<AddCategories
					categoryId={Id}
					setIsVisible={setIsVisible}
					type={type}
				/>
			</Modal>
		</section>
	);
};
