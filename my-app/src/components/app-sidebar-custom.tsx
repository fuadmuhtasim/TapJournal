import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
// import {getUser} from "./testdb";
import { useState, useEffect } from 'react';

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
import { boolean } from "zod";

// This is sample data.
//This is the type of JSON data we will need to grab from a Database
const data = {
  User1: [
    {
      title: "Journal Entries",
      url: "journalentries",
      items: [
        {
          title: "One",
          url: "#",
        },
        {
          title: "Two",
          url: "#",
        },
      ],
    },
    {
      title: "Reflections",
      url: "reflections",
      items: [
        {
          title: "One",
          url: "#",
          isActive: true,
        },
        {
          title: "Two",
          url: "#",
        },
        {
          title: "Three",
          url: "#",
        },
        {
          title: "Four",
          url: "#",
        },
      ],
    }
  ],
}
//Interfaces
interface ButtonPanelProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<null | string>>;
  setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
}
interface Items {
  id: string;
  title: string;
  url: string;
  isActive?: boolean;
}
interface UserDetails {
  id: string;
  title: string;
  url: string;
  items: Items [];
}
//I am getting an array of UserDetails from here. Not UserDetails itself.
const getUser = async() : Promise<UserDetails[]> =>{
  try{
      const response = await fetch("http://localhost:4000/User1");
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

export function AppSidebar({ setActiveComponent, setIsTransitioning, trigger}: ButtonPanelProps) {

  const [data2, setData2] = useState<UserDetails[]>([]);
  const [loading, setloading] = useState(true);

  useEffect (() => {
    const fetchData = async () => {
        try {
            const fetchedData = await getUser();
            console.log(fetchedData);
            setData2(fetchedData);
            setloading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, [trigger]);

  const handleClick = (componentName: string) => {
    setIsTransitioning(true); // Triggers the transition
    setTimeout(() => {
      setActiveComponent(componentName); // Sets the active component after transition
      setIsTransitioning(false);
    }, 180); // Match with animation duration
  };
  
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>


          {!loading && (
            <>
            {data2.map((item) => (
              <SidebarMenuItem key={item.id}>
                {/* Here for some reason, the Sidebar Menu button: Journal Entries is given in the form of a button with a href to a url */}
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items.length > 0 && (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton asChild isActive={item.isActive} >
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


            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                  <button className="font-medium" onClick={() => handleClick('EntryCard')}>
                  +📜 Add Journal Entry 
                  </button>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                  <button className="font-medium" onClick={() => handleClick('JournalCard')}>
                  +🙋‍♀️ Generate Therapy Questions 
                  </button>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                  <button className="font-medium" onClick={() => handleClick('WelcomeCard')}>
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
