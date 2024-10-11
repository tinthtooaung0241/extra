import { Account } from "@/app/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AccountFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
});

type AccountFormType = z.infer<typeof AccountFormSchema>;

interface AccountFormProps {
  onAccountAdd: (accountData: Omit<Account, "id">) => void;
  onClose: () => void;
}

const AccountForm = ({ onAccountAdd, onClose }: AccountFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormType>({ resolver: zodResolver(AccountFormSchema) });

  const onSubmit = (data: AccountFormType) => {
    onAccountAdd(data);
    onClose();
    console.log(data);
    toast.success("Account successfully added.");
  };

  return (
    <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p className="text-gray-500">Create your new account.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-0 flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name">Name</label>
              <input
                className="h-10 w-full rounded-md border border-gray-300 px-4 py-2"
                id="name"
                type="text"
                placeholder="Name of expense"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-700 px-4 py-2 text-base font-medium text-white hover:bg-red-800 focus:outline-none"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
