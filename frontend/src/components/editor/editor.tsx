import { useMediaQuery } from "@/hooks/useMediaQuery";
import Preview from "./preview";
import EditorForm from "./editorForm";

const Editor = () => {
  // Detects if screen width is less than 1023px
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");

  return (
    <section className="w-full h-full md:flex">
      <EditorForm />
      {!isSmallerDevice && <Preview />}
    </section>
  );
};

export default Editor;
