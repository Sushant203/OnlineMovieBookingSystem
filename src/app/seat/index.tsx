import SeatManagement from "@/components/seat/SeatManagement";

type Props = {};

export default function Index({}: Props) {
  return (
    <main className="min-h-screen bg-gray-200 flex items-center justify-center">
      <SeatManagement />
    </main>
  );
}
