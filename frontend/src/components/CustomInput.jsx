export function CustomInput({
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
}) {
  return (
    <div className="w-full">
      <div className="w-full flex bg-emerald-500">
        <div className="flex justify-center items-center px-4 py-2 pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={label}
          name={label}
          value={value}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
