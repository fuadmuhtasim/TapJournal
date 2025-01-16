import { useToast } from "@/hooks/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

interface Details {
    id: string;
    title: string;
    description: string;
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

interface JournalCardProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<null | string>>;
    setDetailsforForm: React.Dispatch<React.SetStateAction<Details | null>>
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
    detailsforJournal: Details | null;
    refreshComponent: () => void;
}

const deleteItemJournalEntries = async (id: string): Promise<void> => {
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
        // Step 3: Filter out the item with the specified ID
        const updatedItems = journalEntries.items.filter(item => item.id !== id);

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
        console.log(`Item with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

export default function JournalCard({setActiveComponent, setDetailsforForm, setIsTransitioning, detailsforJournal, refreshComponent}: JournalCardProps){
    const { toast } = useToast();

    //What it does on clicking edit
    const handleClick = () => {
        setIsTransitioning(true); // Triggers the transition
        setTimeout(() => {
            setActiveComponent("WelcomeCard"); // Sets the active component after transition
            setIsTransitioning(false);
        }, 220); // Match with animation duration
      };

    const handleEdit2 = (details: Details) => {
    setIsTransitioning(true); // Triggers the transition
    setTimeout(() => {
        setDetailsforForm({id: details.id, title: details.title, description: details.description});
        setActiveComponent("EntryFilledCard"); // Sets the active component after transition
        setIsTransitioning(false);
    }, 220); // Match with animation duration
    };

    const handleDelete = async (details: Details) => {
        try {
            await deleteItemJournalEntries(details.id);
          }
          catch (error){
            console.error('Error deleting item: ', error);
            toast({
                variant: "destructive",
                title: "Oops something went wrong entry!",
                description: "There was a problem with your delete request."
            })
        }
        handleClick();
        refreshComponent();
        toast({
        title: "Delete Successful ✅",
        description: "Your journal entry has been deleted"
        })
    };

    return (
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex-row gap-4 items-center">
                            <div>
                                <CardTitle>🌤️ {detailsforJournal?.title}</CardTitle>
                                <CardDescription className="mt-3"><p>❄️ Created on:    01/16/2025</p></CardDescription>
                                <CardDescription><p>🍎 Last Modified:    01/16/2025</p></CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                           <p> {detailsforJournal?.description} </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <button onClick={() => detailsforJournal ? handleEdit2(detailsforJournal) : handleClick()} > ♻️ Edit Entry </button>
                            <button onClick={() => detailsforJournal ? handleDelete(detailsforJournal) : handleClick()}> 🗑️ Delete Entry </button>
                        </CardFooter>
                    </Card>
    )
}