import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import { Message } from "@/models/User.models";


export async function POST(request: Request) {
    
    await dbConnect();

    const {username, content} = await request.json();

    try {
        const user = await UserModel.findOne({username: username});
        if (!user) {
            return Response.json({success: false, message: "User not found"}, {status: 404});
        }

        //is user excepting the messages

        if(!user.isAcceptingMessage) {
            return Response.json({success: false, message: "User is not accepting messages"}, {status: 403});
        }

        const newMessage = {content, createdAt: new Date()};

        user.message.push(newMessage as Message);

        await user.save();
        return Response.json({success: true, message: "Message sent successfully"}, {status: 200});
        
    } catch (error) {
        console.log("Error sending message",error);
        return Response.json({success: false, message: "Error sending message"}, {status: 500});
        
    }
}
