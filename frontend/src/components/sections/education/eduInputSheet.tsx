import { DatePicker } from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/hooks/store";
import { debounce } from "@/utils/helper";
import { EducationHistory } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EduInputSheet = () => {
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");
  const {
    educationHistory,
    setEducationHistory,
    openSheet,
    setOpenSheet,
    selectedEdu,
    setSelectedEdu,
  } = useResumeStore();

  const [localEd, setLocalEd] = useState<EducationHistory>({
    id: "",
    degree: "",
    school: "",
    startDate: null,
    endDate: null,
    location: "",
    description: "",
  });

  const stateRef = useRef({
    selectedEdu,
    educationHistory,
    setEducationHistory,
  });

  const debouncedSetDetails = useCallback(
    debounce((education: EducationHistory) => {
      const { selectedEdu, educationHistory, setEducationHistory } =
        stateRef.current;

      if (selectedEdu || localEd.id !== "") {
        const updated = educationHistory.map((ed) => {
          if (ed.id === localEd.id) return education;
          else return ed;
        });
        setEducationHistory(updated);
      } else {
        setEducationHistory([...educationHistory, education]);
      }
    }, 600),
    [localEd],
  );

  const handleChange = (key: string, value: any) => {
    let updated: EducationHistory;

    if (!selectedEdu && localEd.id === "") {
      updated = {
        ...localEd,
        id: uuidv4(),
        [key]: value,
      };
    } else {
      updated = {
        ...localEd,
        [key]: value,
      };
    }

    setLocalEd(updated);
    debouncedSetDetails(updated);
  };

  useEffect(() => {
    stateRef.current = { selectedEdu, educationHistory, setEducationHistory };
  }, [selectedEdu, educationHistory, setEducationHistory]);

  useEffect(() => {
    if (selectedEdu) {
      setLocalEd(selectedEdu);
    }
  }, [selectedEdu]);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="border-black md:cursor-pointer md:py-5"
          onClick={() => {
            setSelectedEdu(null);
            setLocalEd({
              id: "",
              degree: "",
              school: "",
              startDate: null,
              endDate: null,
              location: "",
              description: "",
            });
          }}
        >
          + Add education
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isSmallerDevice ? "right" : "left"}
        className="min-w-screen md:min-w-[50%]  overflow-scroll"
      >
        <SheetHeader>
          <SheetTitle className="text-center md:text-xl">
            Educational Qualification
          </SheetTitle>
        </SheetHeader>

        <div className="grid md:grid-cols-2 flex-1 auto-rows-min gap-6 md:gap-8 px-4">
          <div className="grid gap-3">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              value={localEd.school}
              className="md:text-base"
              onChange={(e) => {
                handleChange("school", e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={localEd.degree}
              className="md:text-base"
              onChange={(e) => {
                handleChange("degree", e.target.value);
              }}
              required
            />
          </div>

          {/*************** Date Pickers ***************/}
          <DatePicker
            type="start"
            handleChange={handleChange}
            selectedDate={localEd.startDate}
          />
          <DatePicker
            type="end"
            handleChange={handleChange}
            selectedDate={localEd.endDate}
          />

          <div className="grid gap-3">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={localEd.location}
              className="md:text-base"
              onChange={(e) => {
                handleChange("location", e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-3 md:col-span-2">
            <Label htmlFor="textarea-message">Description</Label>
            <Textarea
              className="min-h-40 md:text-base"
              id="description"
              value={localEd.description}
              placeholder="e.g. Graduated with High Honors."
              onChange={(e) => {
                handleChange("description", e.target.value);
              }}
            />
          </div>
        </div>

        <SheetFooter>
          <SheetClose className="w-full" asChild>
            <Button
              size="lg"
              variant="default"
              className="py-5 md:text-base md:px-4 md:py-6 md:max-w-[50%] md:self-center md;cursor-pointer"
            >
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EduInputSheet;
