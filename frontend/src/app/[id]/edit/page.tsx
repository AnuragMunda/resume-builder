"use client";

import Editor from "@/components/editor/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Edit = () => {
  // Detects if screen width is less than 1023px
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");

  return (
    <section>
      <Tabs defaultValue="edit" className="p-5 flex items-center">
        <TabsList className="w-full min-h-10 md:max-w-[20%]">
          <TabsTrigger className="md:text-md cursor-pointer" value="edit">
            Edit
          </TabsTrigger>
          {isSmallerDevice ? (
            <TabsTrigger value="preview">Preview</TabsTrigger>
          ) : (
            <TabsTrigger
              className=" md:text-md cursor-pointer"
              value="customise"
            >
              Customise
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="edit" className="w-full">
          <Editor />
        </TabsContent>
        {isSmallerDevice ? (
          <TabsContent value="preview">Your resume preview.</TabsContent>
        ) : (
          <TabsContent value="customise">
            Customise resume templates
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
};

export default Edit;
