import { motion } from "framer-motion";
import { useContext } from "react";
import { NavBarContext } from "../menuItems/MenuItems";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);

export const ButtonBars = () => {
  const { isOpen, setIsOpen } = useContext(NavBarContext);
  const colorIconBars = "white";
  return (
    <motion.button
      initial={false}
      animate={isOpen ? "open" : "closed"}
      type="button"
      className="w-8 h-8 mt-[10px] bg-transparent border-0 flex justify-center items-center z-50 lg:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5", stroke: colorIconBars },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          stroke={colorIconBars}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: colorIconBars },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </motion.button>
  );
};
