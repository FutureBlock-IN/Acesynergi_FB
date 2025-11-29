import { useState } from "react";
import ContactModal from "../ContactModal";
import { Button } from "@/components/ui/button";

export default function ContactModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Contact Modal</Button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
