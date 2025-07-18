import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-20 h-20">
      <Image src={"/logo.svg"} alt="Fleetlink logo" fill />
    </div>
  );
}
