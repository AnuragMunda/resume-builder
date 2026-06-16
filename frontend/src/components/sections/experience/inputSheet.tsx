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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/hooks/store";
import { debounce } from "@/utils/helper";
import { WorkExperience } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const InputSheet = () => {
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");

  const {
    workExperience,
    setWorkExperience,
    openSheet,
    setOpenSheet,
    selectedExp,
    setSelectedExp,
  } = useResumeStore();

  const [localExperience, setLocalExperience] = useState<WorkExperience>({
    id: "",
    jobTitle: "",
    employer: "",
    startDate: null,
    endDate: null,
    isWorking: false,
    location: "",
    description: "",
  });

  const stateRef = useRef({ selectedExp, workExperience, setWorkExperience });

  const debouncedSetDetails = useCallback(
    debounce((work: WorkExperience) => {
      const { selectedExp, workExperience, setWorkExperience } =
        stateRef.current;

      if (selectedExp || localExperience.id !== "") {
        const updated = workExperience.map((exp) => {
          if (exp.id === localExperience.id) return work;
          else return exp;
        });
        setWorkExperience(updated);
      } else {
        setWorkExperience([...workExperience, work]);
      }
    }, 600),
    [localExperience],
  );

  const handleChange = (key: string, value: any) => {
    let updated: WorkExperience;

    if (!selectedExp && localExperience.id === "") {
      updated = {
        ...localExperience,
        id: uuidv4(),
        [key]: value,
      };
    } else {
      updated = {
        ...localExperience,
        [key]: value,
      };
    }

    setLocalExperience(updated);
    debouncedSetDetails(updated);
  };

  useEffect(() => {
    stateRef.current = { selectedExp, workExperience, setWorkExperience };
  }, [selectedExp, workExperience, setWorkExperience]);

  useEffect(() => {
    if (selectedExp) {
      setLocalExperience(selectedExp);
    }
  }, [selectedExp]);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="border-black md:cursor-pointer md:py-5"
          onClick={() => {
            setSelectedExp(null);
            setLocalExperience({
              id: "",
              jobTitle: "",
              employer: "",
              startDate: null,
              endDate: null,
              isWorking: false,
              location: "",
              description: "",
            });
          }}
        >
          + Add employment
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isSmallerDevice ? "right" : "left"}
        className="min-w-screen md:min-w-[50%] overflow-scroll"
      >
        <SheetHeader>
          <SheetTitle className="text-center md:text-xl">
            Professional Experience
          </SheetTitle>
        </SheetHeader>

        <div className="grid md:grid-cols-2 flex-1 auto-rows-min gap-6 md:gap-8 px-4">
          <div className="grid gap-3">
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              value={localExperience.jobTitle}
              className="md:text-base"
              onChange={(e) => {
                handleChange("jobTitle", e.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="employer">Employer</Label>
            <Input
              id="employer"
              value={localExperience.employer}
              className="md:text-base"
              onChange={(e) => {
                handleChange("employer", e.target.value);
              }}
              required
            />
          </div>

          {/*************** Date Pickers ***************/}
          <DatePicker
            type="start"
            handleChange={handleChange}
            selectedDate={localExperience.startDate}
          />
          <div className="flex flex-col gap-3">
            <DatePicker
              type="end"
              handleChange={handleChange}
              selectedDate={localExperience.endDate}
              disabled={localExperience.isWorking}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="is-working"
                checked={localExperience.isWorking}
                onCheckedChange={(checked) => {
                  const isChecked = checked === true;

                  handleChange("isWorking", isChecked);
                }}
              />
              <Label htmlFor="is-working">Currently work here</Label>
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={localExperience.location}
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
              value={localExperience.description}
              placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
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

export default InputSheet;
