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
                    // <Card className="flex flex-col justify-between">
                    <Card>
                        <CardHeader className="flex-row gap-4 items-center">
                            <div>
                                <CardTitle>Good Afternoon User! ☀️☁️ </CardTitle>
                                <p></p>
                                <CardDescription><p>Welcome to <b>Tap Journal!</b> </p></CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>Use Tap Journal as a <u>freewriting space</u> for your: </p>
                                <ol>
                                    <li>
                                        <i>+ Thoughts</i> 
                                    </li>
                                    <li>
                                        <i>+ Feelings</i>
                                    </li>
                                    <li>
                                        <i>+ Ideas</i>
                                    </li>
                                </ol>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        
                        <CardDescription><p>We analize entries and save you time so you can <b>ask your therapist the right questions</b> ✅</p></CardDescription>
                        </CardFooter>
                    </Card>
    )
}