import { useState } from "react";
import ModalDialog from "./ModalDialog";

const content: string =
  "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.";
const title: string = "Modal Dialog";
export default function CallModal() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <ModalDialog onClose={handleClose} title={title} isOpen={isOpen}>
        {content}
      </ModalDialog>
    </div>
  );
}
