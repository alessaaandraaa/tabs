import Image from "next/image";
import AddSubForm from "@/components/add-sub-form";
import SubsView from "@/components/subs-view";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="min-w-5xl">
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          <div className="bg-zinc-50 border border-zinc-400 p-10 rounded-sm shadow-xl content-center">
            <AddSubForm />
          </div>
          <div className="col-span-2 bg-zinc-50 border border-zinc-400 p-10 rounded-sm shadow-xl">
            <SubsView />
          </div>
        </div>
      </div>
    </div>
  );
}
