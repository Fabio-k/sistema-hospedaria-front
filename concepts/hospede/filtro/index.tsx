import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useFiltro } from "../context";
import { Switch } from "@/components/ui/switch";
import AuthorizationGuard from "@/app/authorizationGuard";

const FiltroHospede = () => {
  const [range, setRange] = useState<number[]>([18, 80]);
  const [checkedStatus, setCheckedStatus] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { idade, status, setIdade, setStatus, showRemoved, setShowRemoved } = useFiltro();
  const [toggleShowRemoved, setToggleShowRemoved] = useState(false);

  useEffect(() => {
    if (open) {
      setRange(idade ?? [18, 80]);
      setCheckedStatus(status ?? []);
      setToggleShowRemoved(showRemoved);
    }
  }, [open, idade, status, showRemoved]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtrar</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <p>Idade</p>
          <div className="text-sm text-muted-foreground py-4">
            {range[0]} {range[0] > 1 ? "anos" : "ano"} — {range[1]} anos
          </div>
          <Slider
            defaultValue={[18, 80]}
            max={120}
            min={1}
            step={1}
            value={range}
            onValueChange={setRange}
          ></Slider>
        </div>
        <div className="mt-4">
          <p>Status</p>
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <Input
                id="ativo"
                type="checkbox"
                checked={checkedStatus.includes("ATIVO")}
                onChange={(e) => {
                  setCheckedStatus((prev) =>
                    e.target.checked
                      ? prev.includes("ATIVO")
                        ? prev
                        : [...prev, "ATIVO"]
                      : prev.filter((status) => status !== "ATIVO")
                  );
                }}
              />
              <label htmlFor="ativo">Ativo</label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                id="inativo"
                type="checkbox"
                checked={checkedStatus.includes("INATIVO")}
                onChange={(e) => {
                  setCheckedStatus((prev) =>
                    e.target.checked
                      ? prev.includes("INATIVO")
                        ? prev
                        : [...prev, "INATIVO"]
                      : prev.filter((status) => status !== "INATIVO")
                  );
                }}
              />
              <label htmlFor="inativo">Inativo</label>
            </div>
          </div>
        </div>
        <AuthorizationGuard necessaryRoles={["hospede:view:deleted"]}>
          <div className="mt-4">
            <p>Exibir Hospedes Removidos</p>
            <Switch
              checked={toggleShowRemoved}
              onCheckedChange={(e: boolean) => {
                setToggleShowRemoved(e);
              }}
            />
          </div>
        </AuthorizationGuard>
        <div className="flex mt-4">
                <Button
                  onClick={() => {
                    setIdade(range);
                    setStatus(checkedStatus);
                    setShowRemoved(toggleShowRemoved);
                    setOpen(false);
                  }}
                >
                  Aplicar
                </Button>
            </div>
      </PopoverContent>
    </Popover>
  );
};

export default FiltroHospede;
