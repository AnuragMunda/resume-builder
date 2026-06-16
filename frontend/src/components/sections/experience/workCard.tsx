import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useResumeStore } from "@/hooks/store";
import { WorkCardProp } from "@/utils/types";
import { Edit, Trash } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const WorkCard = ({ work, openSheet, setOpenSheet }: WorkCardProp) => {
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");
  const { workExperience, setSelectedExp, setWorkExperience } =
    useResumeStore();

  return (
    <Card size={isSmallerDevice ? "sm" : "default"} className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="md:group-data-[size=sm]/card:text-base">{`${work?.jobTitle} ${work.employer && `at ${work.employer}`}`}</CardTitle>
        <CardDescription>
          {work.startDate !== null &&
            (work.endDate !== null || work.isWorking) &&
            `${format(work.startDate, "MMM yyyy")} - ${work.isWorking ? "Present" : format(work.endDate!, "MMM yyyy")}`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          size="lg"
          className="flex-1 py-4 md:py-5 cursor-pointer"
          onClick={() => {
            setOpenSheet(!openSheet);
            setSelectedExp(work!);
          }}
        >
          <Edit />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="lg"
          className="flex-1 py-4 md:py-5 cursor-pointer"
          onClick={() => {
            setWorkExperience(
              workExperience.filter((exp) => exp.id !== work.id),
            );
          }}
        >
          <Trash /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkCard;
