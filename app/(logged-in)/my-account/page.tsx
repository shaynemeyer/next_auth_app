import { auth } from "@/auth";
import TwoFactorAuthForm from "@/components/TwoFactorAuth/TwoFactorAuthForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/usersSchema";

async function MyAccountPage() {
  const session = await auth();

  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated,
    })
    .from(users)
    .where(eq(users.id, parseInt(session?.user?.id!)));
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email Address</Label>
        <div className="text-muted-foreground">{session?.user?.email}</div>
        <TwoFactorAuthForm
          twofactorActivated={user.twoFactorActivated ?? false}
        />
      </CardContent>
    </Card>
  );
}
export default MyAccountPage;
