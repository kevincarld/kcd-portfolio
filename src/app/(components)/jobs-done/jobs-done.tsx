"use client"
import { Tabs, TabsList, TabsTrigger  } from "@/app/(components)/ui/tabs";
import { BsCheck2Circle } from "react-icons/bs";
import { useAtomValue, useSetAtom } from "jotai";
import { viewAsAtom, updateViewAsAtom } from "@/lib/atoms";
import { useEffect } from "react";

type Props = {
  jobsDone: {tasks: string[]};
  laymanJobsDone: {tasks: string[]};
}

export default function JobsDone({jobsDone, laymanJobsDone}: Props){
  const viewAs = useAtomValue(viewAsAtom);
  const setViewAs = useSetAtom(updateViewAsAtom);

  useEffect(() => {
    if (window !== undefined) {
      const localViewAs = localStorage.getItem("kcd-viewas");
      if (localViewAs === "techy") {
        setViewAs("techy");
      } else {
        setViewAs("layman");
      }
    }
  }, []);

  if(jobsDone.tasks.length < 1 && laymanJobsDone.tasks.length < 1) return null;
  
  return (
    <>
      <div>
        <ul role="list" className="space-y-2 sm:space-y-4">
            {(viewAs === "techy" ? jobsDone : laymanJobsDone )?.tasks?.map(
              (string: string, index: number) => (
                <li key={index} className="flex space-x-3">
                  <span className="flex mt-1 text-sm ">
                    <BsCheck2Circle />
                  </span>

                  <span className="text-sm sm:text-base">{string}</span>
                </li>
              )
            )}
          </ul>
        </div>

      <Tabs value={viewAs} className="pt-4" onValueChange={value => setViewAs(value as "techy" | "layman")}>
        <TabsList>
          <TabsTrigger value="techy">View as Techy</TabsTrigger>
          <TabsTrigger value="layman">View as Layman</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
}
