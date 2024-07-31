import clsx from "clsx"

export const Button = ({ text, Icon, isLoading, disabled, color = 'bg-[#CB11AB]', borderRadius = 'rounded-[4px]', width = 'w-full', height = 'h-10' }) => {
    return (
        <div className={clsx("flex justify-center items-center gap-2 py-1 px-2", { 'pointer-events-none': disabled || isLoading }, color, borderRadius, height, width)}>
            {Icon && <Icon />}
            <p className="text-white text-md font-[500]">{text}</p>
        </div>
    )
}