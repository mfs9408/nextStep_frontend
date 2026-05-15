import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  SensorDescriptor,
  SensorOptions,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  FieldArrayWithId,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";
import { ResumeActions, ResumeFormInterface } from "@/types/ResumeTypes";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { toast } from "sonner";

interface SummarySectionHookProps {
  formMethods: UseFormReturn<ResumeFormInterface>;
  resumeActions: ResumeActions;
}
interface SummarySectionHookReturn {
  sensors: SensorDescriptor<SensorOptions>[];
  addField: () => void;
  removeField: (index: number, id: string | undefined) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  fields: FieldArrayWithId<ResumeFormInterface, "summaryBullets", "key">[];
}

export const useSummarySectionHook = ({
  formMethods,
  resumeActions,
}: SummarySectionHookProps): SummarySectionHookReturn => {
  const { control, getValues } = formMethods;
  const { fields, append, remove, move, insert } = useFieldArray({
    control,
    name: "summaryBullets",
    keyName: "key",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addField = async () => {
    const summaryId = getValues("summary.id");

    if (!summaryId) {
      toast.error("Summary is not saved yet");
      return;
    }

    const order = fields.length + 1;
    const defaultContent = "Summary bullet point #" + order + "";

    await resumeActions.summaryBullet
      .createSummaryBullet({
        summaryId,
        order,
        content: defaultContent,
      })
      .then((item) => {
        append(item);
      })
      .catch(() => {
        toast.error("Failed to create summary bullet point");
        remove(order);
      });
  };

  const removeField = async (index: number, id: string | undefined) => {
    if (!id) {
      toast.error("Failed to delete summary bullet point");
      return;
    }
    const hashedData = fields[index];

    remove(index);
    await resumeActions.summaryBullet.deleteSummaryBullet(id).catch(() => {
      insert(hashedData.order, hashedData);
      toast.error("Failed to delete summary bullet point");
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index;
      const overIndex = over.data.current?.sortable?.index;
      if (activeIndex !== undefined && overIndex !== undefined) {
        move(activeIndex, overIndex);
      }
    }

    const ids = getValues("summaryBullets").map((item) => item.id);
    const summaryId = formMethods.getValues("summary.id");

    if (!summaryId) {
      toast.error("Summary is not saved yet");
      return;
    }

    resumeActions.summaryBullet.reorderSummaryBullets({
      idsInOrder: ids,
      summaryId,
    });
  };

  return { sensors, addField, removeField, handleDragEnd, fields };
};
