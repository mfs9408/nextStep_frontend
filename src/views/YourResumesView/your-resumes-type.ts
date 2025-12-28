import { Sort } from "@/enums/sort";

export interface CommonSortingInterface {
  value: Sort;
  label: string;
}

export interface ResumeToDelete {
  id: string;
  name: string;
}
