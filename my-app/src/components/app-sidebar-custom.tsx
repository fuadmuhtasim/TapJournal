import * as React from "react"
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useSidebar } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar"
// import { boolean } from "zod";

//Interfaces
interface ButtonPanelProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<null | string>>;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
  setDetailsforJournal: React.Dispatch<React.SetStateAction<Details | null>>
}
interface Items {
  id: string;
  title: string;
  url: string;
  isActive?: boolean;
  description: string
}
interface UserDetails {
  id: string;
  title: string;
  url: string;
  items: Items [];
}
interface Details {
  id: string,
  title: string;
  description: string;
}
//Gets an array of UserDetails from database
const getUserDetails = async() : Promise<UserDetails[]> =>{
  try{
      const response = await fetch("https://tapdatabase.onrender.com/User1");
      if (!response.ok) { 
          throw new Error(`HTTP error! status: ${response.status}`); 
      }
      const data = await response.json();
      return data;
  }
  catch (error){ 
      console.error("Error fetching user:", error);
      throw error;
  }
}

export function AppSidebar({ setActiveComponent, setIsTransitioning, trigger, setDetailsforJournal}: ButtonPanelProps) {
  const { toggleSidebar } = useSidebar();
  const [userdata, setuserData] = useState<UserDetails[]>([]);
  const [loading, setloading] = useState(true);

  useEffect (() => {
    const fetchData = async () => {
        try {
            const fetchedData = await getUserDetails();
            setuserData(fetchedData);
            setloading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, [trigger]);

  const handleClick = (componentName: string) => {
    if (window.innerWidth <= 768) { // Check if the screen size is mobile
      toggleSidebar();  // Collapse the sidebar on mobile view
    }
    setIsTransitioning(true); // Triggers the transition
    setTimeout(() => {
       // Sets the active component after transition
      setIsTransitioning(false);
      setActiveComponent(componentName);
    }, 280); // Match with animation duration
  };
  const handleClick2 = (buttondetails: Details) => {
    if (window.innerWidth <= 768) { // Check if the screen size is mobile
      toggleSidebar();  // Collapse the sidebar on mobile view
    }
    setIsTransitioning(true); // Triggers the transition
    setTimeout(() => {
       // Sets the active component after transition
      setIsTransitioning(false);
      setDetailsforJournal(buttondetails);
      setActiveComponent('JournalCard');
    }, 280); // Match with animation duration
  };
  
  return (
    <Sidebar>
      <SidebarHeader className = " border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild onClick={() => handleClick('WelcomeCard')}>
              <a href="#">
                <div className=" flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar>
                    <AvatarImage src= "https://static.vecteezy.com/system/resources/previews/000/437/751/non_2x/sun-smiling-vector-icon.jpg"/>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Tap Journal</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className = "shadow-lg">
        <SidebarGroup>
          <SidebarMenu>

        <div className={`transition: opacity duration-300 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`} >
          {!loading && (
            <>
            {userdata.map((item) => (
              <SidebarMenuItem key={item.id}>
                {/* Here for some reason, the Sidebar Menu button: Journal Entries is given in the form of a button with a href to a url */}
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-opensans font-bold">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items.length > 0 && (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton asChild isActive={item.isActive} onClick = {() => handleClick2({title: item.title, description: item.description, id: item.id})} >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))} 
          </>
          )}
        </div>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                  <button className="font-bold" onClick={() => handleClick('EntryCard')}>
                  +📜 Add Journal Entry 
                  </button>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                  <button className="font-bold" onClick={() => handleClick('JournalCard')}>
                  +🙋‍♀️ Ask Therapy Questions 
                  </button>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                  <button className="font-bold" onClick={() => handleClick('WelcomeCard')}>
                  +🙂 Weekly Mood Analysis
                  </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

        </SidebarGroup>
      </SidebarContent>


      <SidebarRail />
    </Sidebar>
  )
}
