import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SummaryCard({
  title,
  data,
  icon: Icon,
  tooltip = "",
  info: Info,
}) {
  const IconWithTooltip = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icon className="absolute right-3 top-1 h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent className="normal-case" side="bottom">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card className="relative">
      <CardHeader className="pb-0 dark:bg-[#09090a]">
        <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
          {title}
          {Info ? <Info /> : null}
        </CardTitle>
        {Icon && tooltip ? (
          <IconWithTooltip />
        ) : Icon ? (
          <Icon className="absolute right-3 top-1 h-4 w-4" />
        ) : null}
      </CardHeader>
      <CardContent className="dark:bg-[#09090a]">
        <p
          title={data}
          className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-extrabold tabular-nums text-foreground"
        >
          {data}
        </p>
      </CardContent>
    </Card>
  );
}
