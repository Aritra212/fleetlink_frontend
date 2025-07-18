// import { redirectIfSession } from "@/utils/data-access/auth";

import Logo from "@/components/logo";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  //   await redirectIfSession();

  return (
    <main className="flex flex-col justify-center items-center py-20 w-full h-dvh overflow-y-auto no-scrollbar">
      <div className="flex text-5xl font-bold gap-3 items-center w-fit mx-auto">
        <Logo /> Fleetlink
      </div>
      {children}
    </main>
  );
}
