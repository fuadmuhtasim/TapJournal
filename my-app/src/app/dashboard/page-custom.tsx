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
  id: string,
  title: string;
  description: string;
}

export default function Page() {
  //state management
  const [activeComponent, setActiveComponent] = useState<null | string>("WelcomeCard");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [detailsforForm, setDetailsforForm] = useState<Details | null>({ id: "500", title: "Hello", description: "OldDescription"});
  const [detailsforJournal, setDetailsforJournal] = useState<Details | null>({  id: "500", title: "Hello", description: "OldDescription"});
  const [trigger, setTrigger] = useState(false);

  const refreshComponent = () => {
    setTrigger((prev) => !prev);
  };
  
  return (
    <SidebarProvider>
      {/* App Sidebar sets activeComponent for page and sets the Transitioning property too */}
      <AppSidebar setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} trigger = {trigger} setDetailsforJournal = {setDetailsforJournal}/>
      <SidebarInset className ="bg-gradient-to-t from-stone-100 to-stone-0 border-none">
        <header className="border-none bg-[hsl(26,41,97)] flex h-16 shrink-0 items-center gap-2 border-b">
          
          <div className="pt-3 flex items-center gap-2 px-3 w-full">
          <div className="flex-1">
            <SidebarTrigger className="border-4"> Button </SidebarTrigger>
          </div>
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-[montserrat] font-bold">Tap Journal</h1>
          </div>
            <div className="flex-1"></div>
          </div>

        </header>

        <div className={`p-4 transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            {activeComponent === "WelcomeCard" && <WelcomeCard />}
            {activeComponent === "EntryCard" && <TextareaForm setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} refreshComponent={refreshComponent}/>}
            {activeComponent === "EntryFilledCard" && <TextareaFormFilled details = {detailsforForm} setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} refreshComponent={refreshComponent}/>}
            {activeComponent === "JournalCard" && detailsforJournal && (<JournalCard key={detailsforJournal.id || 'fallback-key'}  setDetailsforForm = {setDetailsforForm} setActiveComponent={setActiveComponent} setIsTransitioning = {setIsTransitioning} detailsforJournal = {detailsforJournal} refreshComponent={refreshComponent}/>)}
        </div>
        <div>
          <Toaster/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
