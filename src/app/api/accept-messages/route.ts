import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import  {getServerSession, User}  from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

   const session = await getServerSession(authOptions);
   const user: User = session?.user as User;

   if(!session || !session.user){
    return Response.json({success: false, message: "Not authenticated"}, {status: 401});
   }

   const userId = user._id;
   const {acceptMessages} = await request.json();

   try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, {isAcceptingMessage: acceptMessages}, {new: true});

    if(!updatedUser){
        return Response.json({success: false, message: "User not found"}, {status:401});
    }
    return Response.json({success: true, message: "User updated successfully", user: updatedUser}, {status: 200});
    
   } catch (error) {
    console.log("Error updating user",error);
    
    return Response.json({success: false, message: "Error updating user"}, {status: 500});
    
   }

}

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({success: false, message: "Not authenticated"}, {status: 401}
        );
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId)
    
        if(!foundUser){
            return Response.json({success: false, message: "User not found"}, {status: 401});
        }
         return Response.json({success: true, isAcceptingMessage: foundUser.isAcceptingMessage}, {status: 200});
    } catch (error) {
        console.log("Error getting user",error);    
        return Response.json({success: false, message: "Error getting user"}, {status: 500});
        
        
    }
}
