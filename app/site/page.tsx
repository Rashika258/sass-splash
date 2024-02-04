import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-full w-full pt-26 flex items-center justify-center flex-col bg-neutral-900">
      <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
      <p className="text-center"> Run your agency, in one place</p>

      <div className="bg-gradient-to-r from-slate-950 to-secondary-foreground text-transparent bg-clip-text relative">
        <h1 className="text-9xl font-bold text-center md:text-[300px]">
          Splash
        </h1>
      </div>

      <div className="flex justify-center items-center relative md:mt-[-70px]">
        <Image
          src={"/assets/preview.png"}
          alt="banner-image"
          width={1200}
          height={1200}
          className="rounded-tl-2xl border-2 border-muted"
        />
        <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
      </div>
    </div>
  );
}
