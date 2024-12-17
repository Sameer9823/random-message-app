import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Mystry message | Verification email",
            react: VerificationEmail({ username, otp: verifyCode}),
        });
            return { success: true, message: "Verification email send successfully" };
        
    } catch (error) {
        console.log("Error sending verification email",error);
        return { success: false, message: "Internal Server Error" };
        
    }
}