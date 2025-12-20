import dayjs from "dayjs";
import { navIcons, navLinks } from "../constants";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Sanjay's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        {navIcons.map(({ id, img }) => (
          <ul key={id}>
            <img src={img} className="icon-hover" alt={`icon-${id}`} />
          </ul>
        ))}
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
