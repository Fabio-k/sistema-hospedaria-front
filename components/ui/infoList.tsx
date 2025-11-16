export function InfoList({ data }: Record<string, any>) {
  const renderValue = (val: any) => {
    if (val === null || val === undefined) return "-";

    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      return val.toString();
    }

    if (Array.isArray(val)) return val.join(", ");

    if (val instanceof Date) return val.toLocaleDateString();

    return JSON.stringify(val);
  };
  return (
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => {
        return (
          <p key={key} className="flex gap-2">
            <span className="font-semibold">{key}:</span>
            {renderValue(value)}
          </p>
        );
      })}
    </div>
  );
}
