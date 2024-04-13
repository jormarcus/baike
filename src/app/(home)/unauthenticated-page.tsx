export default function UnauthenticatedPage() {
  return (
    <div className="mt-[1px]">
      <div>Unauth page</div>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque fugit
            optio, architecto consequatur voluptatum iure inventore culpa.
            Excepturi praesentium alias quisquam ipsa nesciunt necessitatibus
            nulla rem saepe, suscipit laudantium nisi.
          </p>
        ))}
    </div>
  );
}
