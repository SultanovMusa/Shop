import clsx from "clsx";

export const CustomInput = ({value, onChange, placeholder, Icon, isLoading, disabled, color = 'bg-white', borderRadius = 'rounded-md', width = 'w-full', height = 'h-10' }) => {
    return (
        <div className={clsx("flex items-center gap-1 px-2", { 'pointer-events-none': disabled || isLoading }, borderRadius, width, height, 'border', 'border-gray-300', color)}>
            <input
                type="text"
                placeholder={placeholder}
                disabled={disabled || isLoading}
                value={value}
                onChange={onChange}
                className={clsx("flex-grow outline-none px-2 text-white text-sm", { 'bg-gray-200': disabled || isLoading }, color)}
            />
            {Icon && <Icon />}
        </div>
    );
};