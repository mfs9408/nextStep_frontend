import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }: { status?: string }) => {
  const s = (status ?? "").toUpperCase();

  const variant =
    s === "DRAFT" ? "secondary" : s === "PUBLISHED" ? "default" : "outline";

  return <Badge variant={variant}>{s || "UNKNOWN"}</Badge>;
};

export default StatusBadge;
