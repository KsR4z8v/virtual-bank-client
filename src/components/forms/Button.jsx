export default function Button({ onAction, tittle }) {
  return (
    <div
      onClick={() => {
        onAction();
      }}
      className="submit"
    >
      {tittle}
    </div>
  );
}
