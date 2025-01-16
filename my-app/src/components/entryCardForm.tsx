"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//importing different components
import { useToast } from "@/hooks/use-toast"
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
import {
    Card
  } from "@/components/ui/card"

//Schema of the form: Title + Description
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
//Interface
interface TextareaFormFilledProps {
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
const addItemToJournalEntries = async (newItem: Items): Promise<void> => {
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
      // Step 3: Add the new item to the items array
      const lastItemId = journalEntries.items[journalEntries.items.length - 1].id;
      const newItemId = (parseInt(lastItemId) + 1).toString();
      newItem.id = newItemId;
      journalEntries.items.push(newItem);
      // Step 4: Send a PUT request to update the entire JournalEntries object
      const putResponse = await fetch(`https://tapdatabase.onrender.com/User1/${journalEntries.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(journalEntries),
      });
      // Failed to update data from database
      if (!putResponse.ok) {
          throw new Error(`Failed to update database. HTTP error: ${putResponse.status}`);
      }
      console.log("Item successfully added to JournalEntries.");
  } catch (error) {
      console.error("Error adding item to JournalEntries:", error);
      throw error;
  }
};
//Main Component Rendering
export function TextareaForm({setActiveComponent, setIsTransitioning, refreshComponent}: TextareaFormFilledProps) {
  //toast
  const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
      //Creating an Items object
      const newItem: Items = {
        id: "100",
        title: data.title,
        description: data.entry,
        url: "#",
      };
      try {
        await addItemToJournalEntries(newItem);
      }
      catch (error){
        console.error('Error submitting item: ', error);
      }
      handleClick();
      refreshComponent();
      toast({
        title: "Your journal entry has been added ✅",
        description: (<pre>
          Title: {JSON.stringify(data.title, null, 2)}
        </pre>),
      })
    }
    const handleClick = () => {
      setIsTransitioning(true); // Triggers the transition
      setTimeout(() => {
          setActiveComponent("WelcomeCard"); // Sets the active component after transition
          setIsTransitioning(false);
      }, 220); // Match with animation duration
    };

  return (
    <Card className="flex flex-col justify-between p-4">
      <div className = "pt-2 pl-5 pb-8">
        <div className = "pb-3" >
          <h1 className ="text-2xl font-semibold leading-none tracking-tight"> create new entry ✍🏼</h1>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title 📓</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type the title of your entry here!"
                    className="resize-none min-h-[40px]"
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
              <FormItem>
                <FormLabel>Description 🌳</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type the description of your entry here."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div  className = "grid grid-cols-2 gap-4"> 
            <Button variant="outline" type="submit">Submit</Button>
            <Button variant="outline_negative" type = "button" onClick ={handleClick}> Cancel </Button>
          </div>
          </form>
        </Form>
      </div>
    </Card>
    )
}
