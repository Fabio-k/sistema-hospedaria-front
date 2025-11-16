import { Button } from "./button";

export default function ReturnButton() {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <>
      <Button onClick={handleClick}>Voltar</Button>
      <br />
    </>
  );
}
