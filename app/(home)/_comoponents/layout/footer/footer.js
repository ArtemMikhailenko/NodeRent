import { Link } from "../../../../_components/link/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 mt-auto pt-4 sm:flex-row">
      <Link href="/whitepaper">Whitepaper</Link>
      <Link href="/terms-of-service">Terms of Service</Link>
      <Link href="/collecting-rewards">Collecting rewards</Link>
      <Link href="/payment-process">Payment process</Link>
    </footer>
  );
};
