import { createFileRoute } from '@tanstack/react-router';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getIconifyComponent } from "@/lib/icons";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, CircleQuestionMark } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import { staticTitle } from '../__root';
import { useEffect } from 'react';

export const Route = createFileRoute('/stacks/$companySlug')({
  loader: async ({ context: { queryClient }, params: { companySlug } }) => {
    await queryClient.prefetchQuery(
      convexQuery(api.queries.getCompanyPageBySlug, { slug: companySlug })
    );
    return null;
  },
  component: StackDetails,
});

function StackDetails() {
  const { companySlug } = Route.useParams();
  
  const { data: pageData, isPending, isError, error } = useQuery(
    convexQuery(api.queries.getCompanyPageBySlug, { slug: companySlug })
  );

  function isLongContext(context?: string) {
    return context && context.length > 80;
  }

  useEffect(() => {
    const title =
      isPending || !pageData
        ? `Loading...${staticTitle}`
        : isError
        ? `Error loading company${staticTitle}`
        : pageData.company === null
        ? `Company Not Found${staticTitle}`
        : `${pageData.company.name} Company Stack${staticTitle}`;
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySlug, isPending, isError, pageData]);

  if (isPending || !pageData) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          <p className="text-muted-foreground">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Error loading company</h1>
          <p className="text-muted-foreground">{(error as Error)?.message ?? "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (pageData.company === null) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Company not found</h1>
          <p className="text-muted-foreground">The company you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <img src={`/logos/${pageData.company.logo}`} alt={pageData.company.name} className="w-60 rounded-xl p-2" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{pageData.company.name}</h1>
          <p className="text-muted-foreground">{pageData.company.description}</p>
          <div className="flex gap-8 flex-wrap mt-4 items-center">
            <div>
                <div className="text-xs text-muted-foreground">Company Size</div>
                <div className="font-medium">{pageData.company.companyInfo.size}</div>
            </div>
            <div>
                <div className="text-xs text-muted-foreground">Website</div>
                <a href={pageData.company.companyInfo.website} className="font-medium underline text-primary" target="_blank" rel="noopener noreferrer">{pageData.company.companyInfo.website}</a>
            </div>
            <div>
                <div className="text-xs text-muted-foreground">Headquarters</div>
                <div className="font-medium">{pageData.company.companyInfo.hq}</div>
            </div>
            <div>
                <div className="text-xs text-muted-foreground">Industry</div>
                <Badge variant="secondary">{pageData.company.industry.name}</Badge>
            </div>
        </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {pageData.techStack.map((categoryData) => {
            const { category, reason, description, technologies } = categoryData;
            const hasUpdates = pageData.techUpdates?.some(updateData => 
              updateData.category._id === category._id && updateData.updates.length > 0
            );
            
            return (
              <Card key={category._id} className="flex flex-col text-left transition-colors relative">
                <CardHeader>
                    <div className="flex justify-end mb-2">
                        <Badge variant="secondary">{reason.name}</Badge>
                    </div>
                  <CardTitle className="text-xl font-extrabold tracking-tight">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 relative pt-2">
                  <div className="flex flex-wrap items-center justify-center mb-2 gap-6">
                    {technologies.map((tech, idx) => (
                      <div key={tech._id + idx} className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-4xl min-h-10">
                          {getIconifyComponent(tech.name, "size-10") || <CircleQuestionMark />}
                        </div>
                        <span className="text-xs text-muted-foreground text-center mt-1">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {description ? (
                      isLongContext(description) ? (
                        <Sheet>
                          <SheetTrigger asChild>
                            <div className='text-sm text-muted-foreground text-left'>
                                {description.slice(0, 250)}
                                <button className="text-primary text-sm ml-2 hover:underline cursor-pointer">
                                ... more
                                </button>
                            </div>
                          </SheetTrigger>
                          <SheetContent side="right" className="min-w-[500px]">
                            <SheetHeader>
                              <SheetTitle>Full context</SheetTitle>
                            </SheetHeader>
                            <div className="px-4 text-sm">{description}</div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant="secondary">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      ) : (
                        <span className="text-sm text-muted-foreground">{description}</span>
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No further context available.</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                {hasUpdates && (
                    <div className="pt-4 mt-2 border-t border-border basis-full">
                      <Sheet>
                        <SheetTrigger asChild>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {pageData.techUpdates?.find(updateData => updateData.category._id === category._id)?.updates.length || 0} past change{(pageData.techUpdates?.find(updateData => updateData.category._id === category._id)?.updates.length || 0) !== 1 ? 's' : ''}
                                </span>
                                <Button size="icon" className="size-8">
                                    <ChevronRightIcon />
                                </Button>
                            </div>
                        </SheetTrigger>
                        <SheetContent side="right" className="min-w-[500px]">
                          <SheetHeader>
                            <SheetTitle>Past changes</SheetTitle>
                          </SheetHeader>
                          <div className="relative flex flex-col gap-0 px-4 py-4">
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
                            {pageData.techUpdates?.find(updateData => updateData.category._id === category._id)?.updates.map((update, idx) => (
                              <div key={update._id} className="flex flex-row items-start relative">
                                <div className="relative w-12 flex flex-col items-center">
                                  <span className="absolute left-[0.05rem] w-4 h-4 rounded-full bg-primary border-2 border-background z-10" />
                                </div>
                                <div className="flex-1 pb-6">
                                  {update.date && (
                                    <div className="text-xs text-muted-foreground mb-2">
                                      {(() => {
                                        const d = new Date(update.date);
                                        const mm = String(d.getMonth() + 1).padStart(2, '0');
                                        const yyyy = d.getFullYear();
                                        return `${mm}/${yyyy}`;
                                      })()}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 mb-4">
                                    {update.oldTechnology && (
                                      <span className="flex items-center text-2xl">
                                        {getIconifyComponent(update.oldTechnology.name, "size-6") || <span className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center" />}
                                      </span>
                                    )}
                                    <Badge variant="secondary">{update.reason.name}</Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground leading-snug">
                                    {update.description}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant="secondary">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 