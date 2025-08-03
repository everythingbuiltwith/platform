import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechStackCardProps {
  name: string;
  description: string;
  industry: string;
  icon: string;
  teaserIcons: {
    name: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}

export function TechStackCard({
  name,
  description,
  industry,
  icon,
  teaserIcons,
  className,
}: TechStackCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col text-left transition-colors relative",
        className
      )}
    >
     
      
      <CardHeader>
        <div className="flex justify-end">
            <Badge variant="secondary">
                {industry}
            </Badge>
        </div>
        <div className="flex justify-center">
            <img src={icon} alt={`${name} logo`} className="h-12 w-fit max-w-24" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex-1" />
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-semibold">
            HIGHLIGHTS
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TooltipProvider>
              {teaserIcons.map((tech) => (
                <Tooltip key={tech.name}>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1 text-lg">
                      {tech.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={"/stacks/" + name }>
            View Stack <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 