import SeatManagement from "@/components/seat/SeatManagement";
import UserAuthContextApi from "@/hoc/contextapi/Userauth";

// type Props = {};

export default function Index() {
  return (
    <UserAuthContextApi>
      <main className="min-h-screen bg-gray-200 flex items-center justify-center">
        <SeatManagement />
      </main>
    </UserAuthContextApi>
  );
}
