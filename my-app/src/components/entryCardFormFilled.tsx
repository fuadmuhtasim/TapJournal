"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"


import {
    Card
  } from "@/components/ui/card"

  interface Details {
    id: string,
    title: string;
    description: string;
  }

  interface TextareaFormFilledProps {
    details: Details | null; 
    setActiveComponent: React.Dispatch<React.SetStateAction<null | string>>;
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
    refreshComponent: () => void;
  }
  interface Items {
    id: string,
    title: string,
    url: string,
    isActive?: boolean
    description: string
  }
  interface UserDetails {
    id: string,
    title: string,
    url: string,
    items: Items []
  }
  //AsyncFunction: 
  const modifyJournalEntry = async (data: z.infer<typeof FormSchema>, id: string): Promise<void> => {
    try {
        // Step 1: Fetch the current data
        const response = await fetch("https://tapdatabase.onrender.com/User1");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userDetails: UserDetails[] = await response.json();

        // Step 2: Find the JournalEntries object
        const journalEntries = userDetails.find(user => user.id === "JournalEntries");
        if (!journalEntries) {
            throw new Error("JournalEntries not found in the database.");
        }
        // Step 3: Find the item by ID and modify its description and title
        const updatedItems = journalEntries.items.map(item =>
            item.id === id
                ? {
                    ...item,
                    description: data.entry,
                    title: data.title
                }
                : item
        );

        // Step 4: Update the journalEntries object
        const updatedJournalEntries = { ...journalEntries, items: updatedItems };

        console.log(updatedJournalEntries);

        // Step 5: Send the updated data back to the server using the correct PUT URL
        const updateResponse = await fetch(`https://tapdatabase.onrender.com/User1/JournalEntries`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedJournalEntries),
        });

        if (!updateResponse.ok) {
            throw new Error(`Failed to update data! status: ${updateResponse.status}`);
        }
        console.log(`Item with ID ${id} updated successfully.`);
    } catch (error) {
        console.error("Error updating item:", error);
    }
};

const FormSchema = z.object({
  entry: z
    .string()
    .min(100, {
      message: "Journal entry must be at least 100 characters.",
    })
    .max(1200, {
      message: "Journal entry must not be longer than 1200 characters.",
    }),
    title: z
    .string()
    .min(1, {message: "Title should be atleast one character."})
    .max(30, {message: "JTitle must not be longer than 1200 characters."})
  });

export function TextareaFormFilled( {details, setActiveComponent, setIsTransitioning, refreshComponent}: TextareaFormFilledProps) {
    //toast
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        title: details?.title || 'Could not load title',
        entry: details?.description || 'Could not load description'
      }
    });

    const handleClick = () => {
      setIsTransitioning(true); // Triggers the transition
      setTimeout(() => {
          setActiveComponent("WelcomeCard"); // Sets the active component after transition
          setIsTransitioning(false);
      }, 220); // Match with animation duration
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
      if (details !== null) {
        try {
          await modifyJournalEntry(data, details.id);
        }
        catch(error) {
          console.log (error);
        }
      }
      else {
        console.error("details.id is null, cannot modify journal entry");
      }
      refreshComponent();
      handleClick();
      toast({
        title: "Editing Successful ✅",
        description: "Your journal has been edited"
      })
    }

  return (
  <Card className="motion-preset-slide-down border-8 border-[hsl(197,13%,57%)] flex flex-col justify-between p-4">
    <div className = "motion-preset-slide-up pt-2 pl-5 pb-8">
      <div className = "pb-3" >
        <h1 className ="pl-5 pb-3 pt-6 text-2xl font-semibold leading-none tracking-tight"> edit mode ✍🏼</h1>
      </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="pl-2">
              <FormLabel className="pl-4">Title </FormLabel>
              <FormControl className="pb-0">
                <Textarea
                  placeholder="Put the title of your journal here."
                  className="border-[hsl(353,96%,96%)] resize-none min-h-[40px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem className="pl-2">
              <FormLabel className="pl-4">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your thoughts here!"
                  className = "resize-none overflow-auto w-full h-full"
                  onInput={(e) => {
                    const textarea = e.target as HTMLTextAreaElement;
                    textarea.style.height = 'auto';
                    textarea.style.height = `${textarea.scrollHeight}px`;
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div  className = "pl-2 pt-3 pb-4 grid grid-cols-2 gap-4"> 
          <Button variant="outline" type="submit">Submit</Button>
          <Button variant="outline_negative" type="button" onClick={handleClick}>Cancel</Button>
        </div>
        </form>
      </Form>
     </div>
   </Card>
  )
}
