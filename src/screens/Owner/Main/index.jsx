"use client";

//hooks
import { useState } from "react";

//fetchs
import {
	useGetStoreProductsQuery,
	useDeleteProductMutation,
} from "@/services/product.service";
import { useGetCategoriesQuery } from "@/services/categories.service";

// UI
import { Table } from "@/components/UI/Table";
import Button from "@/components/UI/CustomButton";
import Modal from "@/components/UI/Modal";
import { FaPlus } from "react-icons/fa6";
import { Delete, Edit, View } from "@/assets/icons/Icons";
import Image from "next/image";
import { customToast } from "@/components/Natification";

//Components
import { AddProduct } from "./AddProduct";
import { useGetOneStoreQuery } from "@/services/store.service";
import { useDeleteImageMutation } from "@/services/files.service";

export const OwnerMain = () => {
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [search, setSearch] = useState("");

	const { data: AdminStore } = useGetOneStoreQuery({ language: "RUSSIAN" });

	const { data, isLoading } = useGetStoreProductsQuery(
		{
			storeId: AdminStore?.id,
			page,
			size,
			search,
		},
		{ skip: !AdminStore }
	);

	const { data: categoryData } = useGetCategoriesQuery();

	const [deleteProduct] = useDeleteProductMutation();
	const [deleteImage] = useDeleteImageMutation();

	const [productState, setProductState] = useState({
		name: "",
		image: "",
		price: 0,
		categoryId: 0,
		storeId: "",
		description: "",
		images: [],
	});

	const [isVisible, setIsVisible] = useState(false);
	const [productId, setProductId] = useState(null);
	const [type, setType] = useState("post");

	// ! Delete modal
	const [open, setIsOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const openModal = (item) => {
		setItemToDelete(item);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setItemToDelete(null);
	};

	const onClose = () => {
		setIsVisible(false);
		setProductState({
			name: "",
			image: "",
			price: 0,
			categoryId: 0,
			storeId: "",
			description: "",
			images: [],
		});
	};

	const handlePut = (item) => {
		setType("put");
		setProductId(item.id);
		setProductState({
			name: item.name,
			image: item.image,
			price: item.price,
			categoryId: item.categoryId,
			storeId: item.storeId,
			description: item.description,
			images: item.images,
		});
		setIsVisible(true);
	};

	const handleDelete = async () => {
		if (itemToDelete) {
			const response = await deleteProduct({ productId: itemToDelete.id });
			if (response.data) {
				customToast("success", response.data.message);
			} else {
				customToast("error", response.error.data.message);
			}
			closeModal();
		}
	};

	const PRODUCT_COLUMNS = [
		{
			label: "Картинка",
			action: (item) => {
				return (
					<Image
						width={100}
						height={100}
						alt={`${item.name} ${item.description}`}
						src={item.mainImage}
						className="object-cover h-10 w-auto"
					/>
				);
			},
		},
		{
			label: "Название",
      accessKey: "name",
		},
		{
			label: "Описание",
			accessKey: "description",
		},
		{
			label: "Цена",
			accessKey: "price",
		},
		{
			label: "Действия",
			action: (item) => {
				return (
					<div className="flex items-center gap-3 cursor-pointer">
						<span onClick={() => handlePut(item)}>
							<Edit />
						</span>
						<span onClick={() => openModal(item)}>
							<Delete />
						</span>
					</div>
				);
			},
		},
	];

	return (
		<div className="w-full h-[100vh-60px] overflow-y-scroll p-3">
			<div className="w-full flex justify-end">
				<Button
					onClick={() => {
						setType("post");
						setIsVisible(true);
					}}
					variant="admin"
					size="small"
					className="flex items-center gap-2">
					<p className="font-light text-[13px]">Добавить</p>
					<FaPlus className="text-white w-4 h-4 hover:animate-spin" />
				</Button>
			</div>
			<div className="mt-4">
				<Table
					columns={PRODUCT_COLUMNS}
					data={data?.content}
					isLoading={isLoading}
				/>
			</div>
			<Modal
				className="w-fit"
				onClose={onClose}
				isVisible={isVisible}
				title="Продукт">
				<AddProduct
					onClose={onClose}
					productState={productState}
					setProductState={setProductState}
					categoryData={categoryData}
					storeId={AdminStore?.id}
					productId={productId}
					type={type}
				/>
			</Modal>
			<Modal
				className="w-fit text-black h-48 text-center "
				isVisible={open}
				onClose={closeModal}>
				<h1 className="py-6 p-6">Вы точно хотите удалить {itemToDelete?.name}?</h1>
				<div className="flex justify-around ">
					<Button className="text-white" onClick={closeModal}>
						Отмнена
					</Button>
					<Button
						className="text-white bg-red-600 hover:bg-red-700"
						onClick={handleDelete}>
						Удалить
					</Button>
				</div>
			</Modal>
		</div>
	);
};
