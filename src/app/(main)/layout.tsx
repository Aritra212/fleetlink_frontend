// import { redirectIfSession } from "@/utils/data-access/auth";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  //   await redirectIfSession();

  return (
    <main className="w-full h-dvh overflow-y-auto no-scrollbar">
      {children}
    </main>
  );
}
