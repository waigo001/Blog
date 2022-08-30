import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  to: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PageLink: React.FC<Props> = ({ children, icon, to, onClick }) => {
  const router = useRouter();

  return (
    <Link href={to} passHref>
      {children}
    </Link>
  );
};

export default PageLink;
