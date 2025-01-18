import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function WelcomeCard(){
    return (    
                        <Card className= " animate-fade-in rounded-3xl shadow-lg border-0 flex flex-col justify-between">
                            <CardHeader className="flex-row gap-4 items-center">
                                <div>
                                    <Card className = "rounded-full bg-[hsl(353,96%,96%)] border-0 p-5 animate-fade-in"><CardTitle className="text-2xl text-[hsl(165.7,91.3%,9%)]"> Good Afternoon User! ☀️☁️ </CardTitle></Card>
                                </div> 
                                </CardHeader>
                                <div><CardDescription className = "pl-10  text-[hsl(226,38%,15%)]" ><p>Welcome to   <b className="text-xl">Tap Journal</b> </p></CardDescription>
                                </div>
                        <div className = "mt-4 pl-4 pb-5">
                        <CardContent>
                            <p>Use Tap Journal as a <u>freewriting space</u> for your: </p>
                                <ol>
                                    <li className="mt-5">
                                        <i className="bg-[hsl(37,82%,96%)] pr-6 border-0">+ Thoughts</i> 
                                    </li>
                                    <li className="mt-1">
                                        <i className="bg-[hsl(37,82%,96%)] pr-6 border-0">+ Feelings</i>
                                    </li>
                                    <li className="mt-1">
                                        <i className="bg-[hsl(37,82%,96%)] pr-6">+ Ideas</i>
                                    </li>
                                </ol>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        
                        <CardDescription className="mt-3" ><p>We analize entries and save you time so you can <b>ask your therapist the right questions</b> ✅</p></CardDescription>
                        </CardFooter>
                        </div>
                        </Card>
                        
                    
                    );
    
}