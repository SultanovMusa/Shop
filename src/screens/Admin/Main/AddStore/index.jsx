import Input from "@/components/UI/CutomInput";
import Select from "@/components/UI/CustomSelect";
import { LANGUAGE, MARKETS } from "@/utils/consts";
import InputMaskPhoneNumber from "@/components/UI/PhoneInput";
import { usePostStoreMutation } from "@/services/store.service";
import Button from "@/components/UI/CustomButton";

export const AddStore = ({ store, setStore }) => {
  const [postStore] = usePostStoreMutation();

  const changeValue = (value, name) => {
    setStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const handlePost = async () => {
    const response = await postStore({ body: store });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center gap-2">
        <Input
          label="Название"
          value={store.name}
          onChange={(e) => changeValue(e.target.value, "name")}
          className="text-Gray"
        />
        <Input
          label="Домейн"
          value={store.domain}
          onChange={(e) => changeValue(e.target.value, "domain")}
          className="text-Gray"
        />
      </div>
      <div className="w-full flex items-center gap-2">
        <Select
          placeholder="выберите язык"
          label="Маркет"
          value={store.market}
          onChange={(e) => changeValue(e.target.value, "market")}
          className="text-Gray"
          options={MARKETS}
        />
        <Input
          label="Контейнер"
          value={store.container}
          onChange={(e) => changeValue(e.target.value, "container")}
          className="text-Gray"
        />
      </div>
      <div className="w-full flex items-center gap-2">
        <Input
          label="Ряд"
          value={store.row}
          onChange={(e) => changeValue(e.target.value, "row")}
          className="text-Gray max-w-32"
        />
        <Select
          placeholder="выберите язык"
          label="Язык"
          value={store.language}
          onChange={(e) => changeValue(e.target.value, "language")}
          className="text-Gray max-w-36"
          options={LANGUAGE}
        />
        <InputMaskPhoneNumber
          value={store.phoneNumber}
          numberChange={(e) => changeValue(e, "phoneNumber")}
          label="Номер"
        />
      </div>
      <div className="border-b-[1px] border-dashed border-gray-400 text-Gray text-lg font-medium">
        Владелец
      </div>
      <div className="w-full flex items-center gap-2">
        <InputMaskPhoneNumber
          label="логин"
          value={store.userRequest.username}
          numberChange={(e) =>
            setStore({
              ...store,
              userRequest: { ...store.userRequest, username: e },
            })
          }
          className="text-Gray"
        />
        <Input
          label="Пароль"
          value={store.userRequest.password}
          onChange={(e) =>
            setStore({
              ...store,
              userRequest: { ...store.userRequest, password: e.target.value },
            })
          }
          className="text-Gray"
        />
      </div>
      <div className="w-full flex items-center gap-2">
        <Input
          label="Имя"
          value={store.userRequest.firstname}
          onChange={(e) =>
            setStore({
              ...store,
              userRequest: { ...store.userRequest, firstname: e.target.value },
            })
          }
          className="text-Gray"
        />
        <Input
          label="Фамилия"
          value={store.userRequest.lastname}
          onChange={(e) =>
            setStore({
              ...store,
              userRequest: { ...store.userRequest, lastname: e.target.value },
            })
          }
          className="text-Gray"
        />
      </div>
      <div className="w-full flex justify-end">
        <Button onClick={handlePost} type="button" className="w-fit">
          Отправить
        </Button>
      </div>
    </div>
  );
};
