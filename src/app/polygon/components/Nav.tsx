import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>Главная</Link>
        </li>
      </ul>
    </nav>
  );
}
