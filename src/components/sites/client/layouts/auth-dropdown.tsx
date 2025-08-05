// import * as React from "react";
// import Link from "next/link";
//
// import {DashboardIcon, ExitIcon, GearIcon} from "@radix-ui/react-icons";
//
// import {cn} from "@/lib/utils";
// import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
// import {Button, type ButtonProps} from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {Skeleton} from "@/components/ui/skeleton";
// import {Icons} from "@/components/ui/icons";
//
// interface AuthDropdownProps
//     extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
//         ButtonProps {
//     user: User | null;
// }
//
// export async function AuthDropdown({
//                                        user,
//                                        className,
//                                        ...props
//                                    }: AuthDropdownProps) {
//     if (!user) {
//         return (
//             <Button size="sm" className={cn(className)} {...props} asChild>
//                 <Link href="/signin">
//                     Sign In
//                     <span className="sr-only">Sign In</span>
//                 </Link>
//             </Button>
//         );
//     }
//
//     const initials = `${user.firstName?.charAt(0) ?? ""} ${
//         user.lastName?.charAt(0) ?? ""
//     }`;
//     const email = getUserEmail(user);
//
//     const storePromise = getStoreByUserId({userId: user.id});
//
//     // Fetch `userRecord` from the database to access `currentStoreId`
//     const userRecord = await db
//         .select()
//         .from(usersTable)
//         .where(eq(usersTable.id, user.id))
//         .limit(1)
//         .then((records) => records[0]);
//
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button
//                     variant="secondary"
//                     className={cn("size-8 rounded-full", className)}
//                     {...props}
//                 >
//                     <Avatar className="size-8">
//                         <AvatarImage src={user.imageUrl} alt={user.username ?? ""}/>
//                         <AvatarFallback>{initials}</AvatarFallback>
//                     </Avatar>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                         <p className="text-sm font-medium leading-none">
//                             {user.firstName} {user.lastName}
//                         </p>
//                         <p className="text-xs leading-none text-muted-foreground">
//                             {email}
//                         </p>
//                     </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator/>
//                 <React.Suspense
//                     fallback={
//                         <div className="flex flex-col space-y-1.5 p-1">
//                             {Array.from({length: 3}).map((_, i) => (
//                                 <Skeleton key={i} className="h-6 w-full rounded-sm"/>
//                             ))}
//                         </div>
//                     }
//                 >
//                     <AuthDropdownGroup
//                         storePromise={storePromise}
//                         currentStoreId={userRecord?.currentStoreId}
//                     />
//                 </React.Suspense>
//                 <DropdownMenuSeparator/>
//                 <DropdownMenuItem asChild>
//                     <Link href="/signout">
//                         <ExitIcon className="mr-2 size-4" aria-hidden="true"/>
//                         Log out
//                         <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                     </Link>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }
//
// interface AuthDropdownGroupProps {
//     storePromise: ReturnType<typeof getStoreByUserId>;
//     currentStoreId?: string;
// }
//
// async function AuthDropdownGroup({
//                                      storePromise,
//                                      currentStoreId,
//                                  }: AuthDropdownGroupProps) {
//     const store = await storePromise;
//     const storeLink =
//         currentStoreId || store?.id
//             ? `/dashboard/stores/${currentStoreId || store?.id}`
//             : "/onboarding";
//
//     return (
//         <DropdownMenuGroup>
//             <DropdownMenuItem asChild>
//                 <Link href={storeLink}>
//                     <DashboardIcon className="mr-2 size-4" aria-hidden="true"/>
//                     Dashboard
//                     <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
//                 </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//                 <Link href="/dashboard/billing">
//                     <Icons.credit className="mr-2 size-4" aria-hidden="true"/>
//                     Billing
//                     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                 </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//                 <Link href="/dashboard/settings">
//                     <GearIcon className="mr-2 size-4" aria-hidden="true"/>
//                     Settings
//                     <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                 </Link>
//             </DropdownMenuItem>
//         </DropdownMenuGroup>
//     );
// }
