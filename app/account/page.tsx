import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";

const Account = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-[var(--primary-background-color-var)]">
      <Header className="from-bg-[var(--primary-background-color-var)]">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold text-white">Account Settings</h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;
