import { AppSidebar } from "@/components/app-sidebar-custom";
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {Toaster} from "@/components/ui/toaster";

//Components imported:
import JournalCard from "@/components/journalCard";
import {TextareaForm} from "@/components/entryCardForm";
import {TextareaFormFilled} from "@/components/entryCardFormFilled";
import WelcomeCard from "@/components/welcomeCard";

//interfaces used
interface Details {
  title: string;
  description: string;
}


export default function Page() {
  //state management
  const [activeComponent, setActiveComponent] = useState<null | string>("WelcomeCard");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [details, setDetails] = useState<Details | null>({ title: "Hello", description: "OldDescription"});
  const [trigger, setTrigger] = useState(false);

  const refreshComponent = () => {
    setTrigger((prev) => !prev);
  };
  
  //console logging
  console.log("Current activeComponent:", activeComponent);
  console.log("Current details:", details);

  return (
    <SidebarProvider>
      <AppSidebar setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} trigger = {trigger}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    Open / Collapse Sidebar
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className={`p-4 transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            {activeComponent === "WelcomeCard" && <WelcomeCard />}
            {activeComponent === "EntryCard" && <TextareaForm setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} refreshComponent={refreshComponent}/>}
            {activeComponent === "EntryFilledCard" && <TextareaFormFilled details = {details} setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} refreshComponent={refreshComponent}/>}
            {activeComponent === "JournalCard" && <JournalCard setDetails = {setDetails} setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} />}
        </div>
        <div>
          <Toaster/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
