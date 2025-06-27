import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-5 flex h-[10vh] w-full flex-col items-center justify-center bg-black">
      <Link href="https://github.com/qhgill/chaosify" target="_blank">
        <FaGithub className="text-4xl text-white" />
      </Link>
    </div>
  );
};

export default Footer;
