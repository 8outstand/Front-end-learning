function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && " "}
      {importance > 0 && <i>（重要性: {importance}）</i>}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item importance={9} name="宇航服" />
        <Item importance={0} name="带金箔的头盔" />
        <Item importance={6} name="Tam 的照片" />
      </ul>
    </section>
  );
}
