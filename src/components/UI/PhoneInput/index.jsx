import clsx from "clsx";
import { forwardRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const InputMaskPhoneNumber = forwardRef(({ label, numberChange, value }) => {
	return (
		<div className="w-full flex flex-col items-start mb-1">
			{label && (
				<label
					htmlFor="yeezi"
					className={clsx("block text-sm leading-6 text-Gray")}>
					{label}
				</label>
			)}
			<div className="p-[2px] border border-gray-400 rounded-md w-full">
				<PhoneInput
					country={"kg"}	
					onlyCountries={["kg"]}
					onChange={(e) => numberChange(e)}
					value={value}
					// enableLongNumbers={false}
					countryCodeEditable={false}
					masks={{
						kg: "(...) ...-...",
					}}
					inputStyle={{
						border: "none",
						width: "100%",
						position: "relative",
						fontSize: "13px",
						color: "#676767",
						minWidth: "200px",
						maxHeight: "30px",
					}}
					dropdownStyle={{
						zIndex: "999",
						textAlign: "start",
					}}
					buttonStyle={{
						border: "none",
						backgroundColor: "#fff",
						cursor: "pointer",
					}}
					containerStyle={{
						width: "100%",
					}}
					searchStyle={{
						width: "100%",
					}}
				/>
			</div>
		</div>
	);
});

export default InputMaskPhoneNumber;
