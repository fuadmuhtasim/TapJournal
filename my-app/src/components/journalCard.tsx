import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

interface Details {
    title: string;
    description: string;
}

interface JournalCardProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<null | string>>;
    setDetails: React.Dispatch<React.SetStateAction<Details | null>>
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JournalCard({setActiveComponent, setDetails, setIsTransitioning}: JournalCardProps){
    console.log(setIsTransitioning);
    const handleClick = () => {
        setIsTransitioning(true); // Triggers the transition
        setTimeout(() => {
            setDetails({title: "Title", description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Eros himenaeos felis molestie platea, curae ultricies dis. Mus proin gravida dis cubilia condimentum blandit. Vestibulum rutrum nisi fusce mattis convallis neque sagittis torquent. Velit vitae netus pulvinar arcu lectus hendrerit. Ad lectus magnis diam netus fermentum rutrum. Velit pellentesque a cursus, elementum purus vitae. Hendrerit convallis vehicula blandit rhoncus dui ut varius senectus viverra. Senectus vestibulum fringilla phasellus porttitor sodales mattis egestas. Neque platea litora nascetur est eros a velit in odio. Et vestibulum eros habitasse pellentesque morbi sapien. Lacinia arcu potenti sociosqu per rutrum adipiscing nec sed aenean. Mauris semper maximus enim sociosqu euismod eget, turpis posuere. Magnis sem orci amet quisque tincidunt dis elementum. Diam ut fusce nisl facilisi feugiat torquent accumsan orci auctor. Molestie aliquam diam at nam in quam sodales adipiscing. Velit justo curae vehicula taciti maecenas fringilla hendrerit vulputate nam. Semper facilisis eget, mauris a torquent pellentesque. Feugiat curabitur tincidunt turpis gravida ex consequat vulputate. Ac vitae ex facilisis aenean; maximus tortor parturient."});
            setActiveComponent("EntryFilledCard"); // Sets the active component after transition
            setIsTransitioning(false);
        }, 220); // Match with animation duration
      };
    return (
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex-row gap-4 items-center">
                            <div>
                                <CardTitle>🌤️ Title</CardTitle>
                                <CardDescription><p>❄️ Created on:</p></CardDescription>
                                <CardDescription><p>🍎 Last Modified:</p></CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Eros himenaeos felis molestie platea, curae ultricies dis. Mus proin gravida dis cubilia condimentum blandit. Vestibulum rutrum nisi fusce mattis convallis neque sagittis torquent. Velit vitae netus pulvinar arcu lectus hendrerit. Ad lectus magnis diam netus fermentum rutrum. Velit pellentesque a cursus, elementum purus vitae. Hendrerit convallis vehicula blandit rhoncus dui ut varius senectus viverra. Senectus vestibulum fringilla phasellus porttitor sodales mattis egestas. Neque platea litora nascetur est eros a velit in odio. Et vestibulum eros habitasse pellentesque morbi sapien. Lacinia arcu potenti sociosqu per rutrum adipiscing nec sed aenean. Mauris semper maximus enim sociosqu euismod eget, turpis posuere. Magnis sem orci amet quisque tincidunt dis elementum. Diam ut fusce nisl facilisi feugiat torquent accumsan orci auctor. Molestie aliquam diam at nam in quam sodales adipiscing. Velit justo curae vehicula taciti maecenas fringilla hendrerit vulputate nam. Semper facilisis eget, mauris a torquent pellentesque. Feugiat curabitur tincidunt turpis gravida ex consequat vulputate. Ac vitae ex facilisis aenean; maximus tortor parturient.</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <button onClick={() => handleClick()} > ♻️ Edit Entry </button>
                            <button> 🗑️ Delete Entry </button>
                        </CardFooter>
                    </Card>
    )
}