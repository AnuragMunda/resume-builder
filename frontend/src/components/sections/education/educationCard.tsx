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
import { EducationCardProp } from "@/utils/types";
import { Edit, Trash } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EducationCard = ({ edu, openSheet, setOpenSheet }: EducationCardProp) => {
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");
  const { educationHistory, setSelectedEdu, setEducationHistory } =
    useResumeStore();

  return (
    <Card size={isSmallerDevice ? "sm" : "default"} className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="md:group-data-[size=sm]/card:text-base">{`${edu?.degree} ${edu.school && `at ${edu.school}`}`}</CardTitle>
        <CardDescription>
          {edu.startDate !== null &&
            edu.endDate !== null &&
            `${format(edu.startDate, "MMM yyyy")} - ${format(edu.endDate!, "MMM yyyy")}`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          size="lg"
          className="flex-1 py-4 md:py-5 cursor-pointer"
          onClick={() => {
            setOpenSheet(!openSheet);
            setSelectedEdu(edu!);
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
            setEducationHistory(
              educationHistory.filter((ed) => ed.id !== edu.id),
            );
          }}
        >
          <Trash /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EducationCard;
