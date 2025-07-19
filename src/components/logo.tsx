import Image from "next/image";

type Props = {
  withText?: boolean;
};
export default function Logo({ withText }: Props) {
  if (withText)
    return (
      <div className="flex text-5xl font-bold gap-3 items-center w-fit mx-auto">
        <div className="relative w-20 h-20">
          <Image src={"/logo.svg"} alt="Fleetlink logo" fill />
        </div>{" "}
        Fleetlink
      </div>
    );
  return (
    <div className="relative w-20 h-20">
      <Image src={"/logo.svg"} alt="Fleetlink logo" fill />
    </div>
  );
}
