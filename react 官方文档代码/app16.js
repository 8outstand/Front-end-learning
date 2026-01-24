import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

export default function List() {
  const chemists = people.filter((person) => person.profession === "化学家");
  const everyoneElse = people.filter(
    (person) => person.profession !== "化学家",
  );
  return (
    <article>
      <h1>科学家</h1>
      <h2>化学家</h2>
      <ul>
        {chemists.map((person) => (
          <li key={person.id}>
            <img src={getImageUrl(person)} alt={person.name} />
            <p>
              <b>{person.name}:</b>
              {" " + person.profession + " "}因{person.accomplishment}而闻名世界
            </p>
          </li>
        ))}
      </ul>
      <h2>其余的人</h2>
      <ul>
        {everyoneElse.map((person) => (
          <li key={person.id}>
            <img src={getImageUrl(person)} alt={person.name} />
            <p>
              <b>{person.name}:</b>
              {" " + person.profession + " "}因{person.accomplishment}而闻名世界
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
