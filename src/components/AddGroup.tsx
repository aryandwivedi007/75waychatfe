
// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useAppSelector } from "@/store/store";
// import { useAllUsersQuery, useCreateRoomMutation, useMeQuery } from "@/service/api";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "react-toastify";

// // const validation = yup.object({
// //   name: yup.string().required("Name is required"),
// //   isPrivate: yup.boolean().required("Privacy status is required"),
// //   createdById: yup.string().required("Creator ID is required"),
// //   members: yup
// //     .array()
// //     .of(yup.string().required("Each member must be a valid string"))
// //     .min(1, "At least one member is required"),
// // });

// // type FormData = typeof validation.__outputType;
// type FormData={
//   name:string;
//   isPrivate:boolean;
//   createdById:string;
//   members:[]
// }

// export function AddGroup({ closeModal }: { closeModal: () => void }) {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const [registerGroup, { isLoading, isError, error, data }] = useCreateRoomMutation({
//     skip: !isAuthenticated,
//   });

//   const { data: AllUserData } = useAllUsersQuery();
//   const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

//   const { data: meData } = useMeQuery(undefined, { skip: !isAuthenticated });
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormData>({
//     defaultValues: {
//       name: "",
//       isPrivate: false,
//       createdById: "",
//       members: [],
//     },
//     // resolver: yupResolver(validation),
//   });

//   const handleUserSelect = (userId: string) => {
//     setSelectedMembers((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
//     );
//   };

//   const onSubmit = async (data: FormData) => {
//     if (!meData || !meData.data._id) {
//       toast.error("Creator ID is missing");
//       return;
//     }

//     const payload = {
//       ...data,
//       members: selectedMembers,
//       createdById: meData.data._id, // Ensure createdById is set
//     };

//     console.log("Form Valid:", isValid);
//     console.log("Validation Errors:", errors);
//     console.log(payload);

//     try {
//       await registerGroup(payload).unwrap();
//       toast.success("Group created successfully");
//       closeModal();
//     } catch (error: any) {
//       console.log(error);
//       const validationError = error?.data?.data?.errors?.[0].msg;
//       toast.error(
//         validationError ?? error?.data?.message ?? "Something went wrong!"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle>Create Group</CardTitle>
//           <CardDescription>Deploy your new project in one-click.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full items-center gap-4">
//             {/* Group Name */}
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Name of your group"
//                 {...register("name")}
//                 error={Boolean(errors.name?.message)}
//                 helperText={errors.name?.message}
//               />
//             </div>

//             {/* Privacy Status */}
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="isPrivate">Is Private</Label>
//               <Select {...register("isPrivate")}>
//                 <SelectTrigger id="isPrivate">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="true">Yes</SelectItem>
//                   <SelectItem value="false">No</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Select Members (Usernames) */}
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="members">Select Members</Label>
//               <div className="space-y-2">
//                 {AllUserData?.data?.map((user) => (
//                   <div key={user._id} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       id={user._id}
//                       value={user._id}
//                       onChange={() => handleUserSelect(user._id)}
//                       checked={selectedMembers.includes(user._id)}
//                     />
//                     <Label htmlFor={user._id}>{user.userName}</Label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={closeModal}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={isLoading || !isValid}>
//             {isLoading ? "Creating..." : "Create"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// }
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/store/store";
import { useAllUsersQuery, useCreateRoomMutation, useMeQuery } from "@/service/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

// Import motion from framer-motion
import { motion } from "framer-motion";

// Define validation schema
type FormData = {
  name: string;
  isPrivate: boolean;
  createdById: string;
  members: string[];
};

export function AddGroup({ closeModal }: { closeModal: () => void }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [registerGroup, { isLoading, isError, error, data }] = useCreateRoomMutation({
    skip: !isAuthenticated,
  });

  const { data: AllUserData } = useAllUsersQuery();
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

  const { data: meData } = useMeQuery(undefined, { skip: !isAuthenticated });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      isPrivate: false,
      createdById: "",
      members: [],
    },
  });

  const handleUserSelect = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const onSubmit = async (data: FormData) => {
    if (!meData || !meData.data._id) {
      toast.error("Creator ID is missing");
      return;
    }

    const payload = {
      ...data,
      members: selectedMembers,
      createdById: meData.data._id, // Ensure createdById is set
    };

    try {
      await registerGroup(payload).unwrap();
      toast.success("Group created successfully");
      closeModal();
    } catch (error: any) {
      console.log(error);
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Motion wrapper for the modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Group</CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {/* Group Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your group"
                  {...register("name")}
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                />
              </div>

              {/* Privacy Status */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="isPrivate">Is Private</Label>
                <Select {...register("isPrivate")}>
                  <SelectTrigger id="isPrivate">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Select Members (Usernames) */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="members">Select Members</Label>
                <div
                  className="space-y-2 max-h-[150px] overflow-y-auto border p-2"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {AllUserData?.data?.map((user) => (
                    <div key={user._id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={user._id}
                        value={user._id}
                        onChange={() => handleUserSelect(user._id)}
                        checked={selectedMembers.includes(user._id)}
                      />
                      <Label htmlFor={user._id}>{user.userName}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !isValid}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </form>
  );
}
