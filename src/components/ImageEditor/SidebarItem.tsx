type SidebarItemProps = {
  name: string;
  active: boolean;
  handleClick: () => void;
  value: [string, string];
};

export default function SidebarItem({
  name,
  active,
  handleClick,
  value,
}: SidebarItemProps) {
  return (
    <button
      className={`cursor-pointer outline-none flex gap-2 justify-center items-center border-none py-4 relative transition rounded duration-150  ${
        active
          ? "bg-blue-400 hover:bg-blue-400"
          : "hover:bg-blue-300 after:content-[''] after:absolute after:w-4/5 after:left-1/10 after:bottom-0 after:h-px after:bg-blue-200"
      }`}
      onClick={handleClick}
      title={name}
    >
      {name}
      <span>
        ({value[0]} {value[1]})
      </span>
    </button>
  );
}
